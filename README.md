# 🚀 HireRank AI – AI-Powered Resume Screening Tool

HireRank is a smart, full-stack web application designed to automate and optimize the resume screening process using advanced Natural Language Processing (NLP) techniques. It ranks candidate resumes based on semantic similarity to job descriptions, enabling faster, data-driven hiring decisions.

---

## 🧠 Key Features

- 🔍 **AI-Powered Resume Matching**  
  Uses NLP embeddings from `sentence-transformers` (`all-mpnet-base-v2`) and cosine similarity to match resumes with job descriptions contextually.

- 📄 **Automated Resume Parsing**  
  Parses PDF resumes using `PyMuPDF` for text extraction and keyword analysis with `KeyBERT`.

- 📊 **Scoring & Ranking**  
  Computes match confidence using `NumPy` and `scikit-learn`, displaying sorted candidates based on relevance.

- 🌐 **Full-Stack Architecture**  
  - **Frontend**: React (Vite), Tailwind CSS, Axios  
  - **Backend**: Flask, RESTful APIs, Python NLP stack  
  - Real-time uploads and result rendering.

- 🚧 **Frontend In Progress**  
  The backend is fully implemented. Frontend features like UI, file upload, and result display are currently being built and soon to be deployed.

---

## 🛠️ Technologies Used

| Area       | Tech Stack                             |
|------------|-----------------------------------------|
| Frontend   | React (Vite), Tailwind CSS, Axios       |
| Backend    | Flask, REST APIs, Python                |
| NLP        | sentence-transformers, KeyBERT          |
| Parsing    | PyMuPDF                                 |
| Scoring    | NumPy, scikit-learn, Cosine Similarity  |

---

## 📸 Preview (Coming Soon)

<!-- Add screenshots or a demo GIF/video once frontend is done -->

---

## 🧪 Installation & Run (For Developers)

### Backend (Flask)
```bash
cd server
pip install -r requirements.txt
python app.py
