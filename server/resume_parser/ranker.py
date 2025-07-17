import re
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT
import numpy as np

# === Initialize models ===
model = SentenceTransformer('all-mpnet-base-v2')
kw_model = KeyBERT(model)

# 🔍 Section-based weighting
def extract_weighted_text(resume_text):
    sections = {
        "projects": "",
        "experience": "",
        "skills": ""
    }

    text_lower = resume_text.lower()

    match = re.search(r'(projects|project experience)([\s\S]*?)(?=\n[A-Z][a-z]|$)', text_lower)
    if match:
        sections['projects'] = match.group(2)

    match = re.search(r'(experience|internship|work experience)([\s\S]*?)(?=\n[A-Z][a-z]|$)', text_lower)
    if match:
        sections['experience'] = match.group(2)

    match = re.search(r'(skills|technical skills)([\s\S]*?)(?=\n[A-Z][a-z]|$)', text_lower)
    if match:
        sections['skills'] = match.group(2)

    weighted_text = (
        (sections['projects'] + '\n') * 3 +
        (sections['experience'] + '\n') * 2 +
        (sections['skills'] + '\n') * 2 +
        resume_text
    )

    return weighted_text, sections

# ✅ Define allowed relevant skill/tech words (expandable list)
ALLOWED_KEYWORDS = {
    "python", "java", "c++", "javascript", "typescript",
    "html", "css", "react", "tailwind", "frontend", "responsive design",
    "node", "express", "flask", "django", "backend", "rest", "api", "jwt", "oauth", "authentication",
    "mongodb", "mysql", "postgresql", "firebase", "nosql", "relational database",
    "aws", "heroku", "render", "docker", "ci/cd", "deployment", "pipeline", "git", "github", "version control",
    "ml", "machine learning", "xgboost", "scikit", "data analysis", "pandas", "matplotlib", "model training",
    "vs code", "postman", "jira", "figma", "firebase console", "terminal",
    "project", "developer", "intern", "internship", "hackathon", "teamwork", "collaborated"
}

# 🔑 Filter and extract top keywords using KeyBERT + whitelist
def extract_top_keywords_keybert(text, top_n=5):
    try:
        raw_keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words='english',
            use_mmr=True,
            diversity=0.7,
            top_n=20
        )

        normalized_allowed = {kw.lower().strip() for kw in ALLOWED_KEYWORDS}
        filtered = []

        for kw, _ in raw_keywords:
            cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', kw.lower()).strip()

            for allowed_kw in normalized_allowed:
                if allowed_kw in cleaned:
                    filtered.append(allowed_kw)
                    break

            if len(filtered) >= top_n:
                break

        return list(dict.fromkeys(filtered))  # remove duplicates, preserve order

    except Exception as e:
        print("Keyword extraction error:", e)
        return []

# 🧠 Rank resumes based on cosine similarity
def rank_resumes(jd_embedding, resume_embeddings, resume_texts, top_k_keywords=5):
    scores = cosine_similarity([jd_embedding], resume_embeddings)[0]
    ranked = []

    for i, score in enumerate(scores):
        resume_text = resume_texts[i]["text"]
        top_keywords = extract_top_keywords_keybert(resume_text, top_n=top_k_keywords)

        ranked.append({
            "filename": resume_texts[i]["filename"],
            "score": round(float(score * 100), 2),
            "topKeywords": top_keywords
        })

    ranked = sorted(ranked, key=lambda x: x['score'], reverse=True)
    return ranked

# ✨ Resume Embedding with weighting
def get_resume_embeddings(resume_texts):
    weighted_texts = []
    for resume in resume_texts:
        weighted_text, _ = extract_weighted_text(resume['text'])
        weighted_texts.append(weighted_text)
    return model.encode(weighted_texts)
