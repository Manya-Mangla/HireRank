from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import shutil
import zipfile
from werkzeug.utils import secure_filename
from io import BytesIO
from pdfminer.high_level import extract_text

from resume_parser.parser import get_resume_texts
from resume_parser.ranker import rank_resumes
from resume_parser.embedder import get_embeddings, get_resume_embeddings_wrapped


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'zip'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ✅ Check valid ZIP file
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return "HireRank AI API is running 🎯"

@app.route('/upload', methods=['POST'])
def upload_resumes():
    if 'resumes' not in request.files:
        return jsonify({'error': 'No resume ZIP file provided'}), 400

    resumes_file = request.files['resumes']

    if resumes_file and allowed_file(resumes_file.filename):
        # 🧹 Clean and recreate upload folder
        if os.path.exists(UPLOAD_FOLDER):
            shutil.rmtree(UPLOAD_FOLDER)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # 💾 Save ZIP and extract
        filename = secure_filename(resumes_file.filename)
        zip_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        resumes_file.save(zip_path)

        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(app.config['UPLOAD_FOLDER'])

        # 📄 Extracted PDF paths
        resume_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith('.pdf')]
        resume_paths = [os.path.join(UPLOAD_FOLDER, f) for f in resume_files]
        print("✅ Resumes to parse:", resume_paths)

        # 🧠 Extract resume texts
        resume_texts = get_resume_texts(app.config['UPLOAD_FOLDER'])
        if not resume_texts:
            return jsonify({'error': 'No resumes found or extracted.'}), 400

        # 📥 Get JD — either file or text
        jd_text = ""

        if 'job_description' in request.files and request.files['job_description'].filename != "":
            try:
                jd_file = request.files['job_description']
                jd_text = extract_text(BytesIO(jd_file.read()))
            except Exception as e:
                return jsonify({'error': f'Failed to read JD PDF: {str(e)}'}), 400

        elif 'job_description_text' in request.form:
            jd_text = request.form['job_description_text'].strip()

        else:
            return jsonify({'error': 'No job description provided (PDF or text).'}), 400

        if not jd_text.strip():
            return jsonify({'error': 'Job description is empty after processing.'}), 400

       # 🔍 Embed + rank (with weighted resume sections)
        jd_embedding = get_embeddings([jd_text])[0]
        resume_embeddings = get_resume_embeddings_wrapped(resume_texts)
        ranked = rank_resumes(jd_embedding, resume_embeddings, resume_texts)

        return jsonify(ranked)

    return jsonify({'error': 'Invalid file format. Upload .zip only'}), 400

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
