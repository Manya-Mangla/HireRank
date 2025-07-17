import os
import fitz  # PyMuPDF
import docx

# === PDF extraction ===
def extract_text_from_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    except Exception as e:
        print(f"Error reading PDF: {file_path} - {e}")
        return ""

# === DOCX extraction ===
def extract_text_from_docx(file_path):
    try:
        doc = docx.Document(file_path)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text.strip()
    except Exception as e:
        print(f"Error reading DOCX: {file_path} - {e}")
        return ""

# === Parse all resumes ===
def get_resume_texts(folder_path):
    resumes = []
    for filename in os.listdir(folder_path):
        full_path = os.path.join(folder_path, filename)
        if filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(full_path)
        elif filename.lower().endswith('.docx'):
            text = extract_text_from_docx(full_path)
        else:
            continue

        if text:
            resumes.append({'filename': filename, 'text': text})
        else:
            print(f"⚠️ Skipped empty or unreadable file: {filename}")
    print("✅ Parsed resumes:", [r['filename'] for r in resumes])
    return resumes
