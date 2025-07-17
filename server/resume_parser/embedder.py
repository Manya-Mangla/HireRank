from sentence_transformers import SentenceTransformer
import numpy as np

# Load the SentenceTransformer model once
model = SentenceTransformer('all-mpnet-base-v2')  # You can replace with 'all-mpnet-base-v2' for better results

# Basic embedding function for any list of texts
def get_embeddings(text_list):
    try:
        embeddings = model.encode(text_list, convert_to_tensor=False)
        return embeddings
    except Exception as e:
        print("Error during embedding:", e)
        return []

# Enhanced resume embedding with section weighting
def get_resume_embeddings_wrapped(resume_texts):
    def extract_sections(text):
        text_lower = text.lower()

        experience_keywords = ['experience', 'intern', 'work', 'employment']
        project_keywords = ['project', 'built', 'developed', 'application']
        skills_keywords = ['skills', 'technologies', 'tools']

        exp_section, proj_section, skills_section = "", "", ""

        for line in text_lower.split('\n'):
            line = line.strip()
            if any(kw in line for kw in experience_keywords):
                exp_section += line + " "
            elif any(kw in line for kw in project_keywords):
                proj_section += line + " "
            elif any(kw in line for kw in skills_keywords):
                skills_section += line + " "

        return exp_section.strip(), proj_section.strip(), skills_section.strip()

    enhanced_embeddings = []

    for resume in resume_texts:
        full_text = resume.get('text', '')
        exp, proj, skills = extract_sections(full_text)

        if not any([exp, proj, skills]):
            emb = model.encode(full_text)
        else:
            sections = []
            weights = []

            if exp:
                sections.append(model.encode(exp))
                weights.append(0.5)
            if proj:
                sections.append(model.encode(proj))
                weights.append(0.3)
            if skills:
                sections.append(model.encode(skills))
                weights.append(0.2)

            emb = np.average(sections, axis=0, weights=weights)

        enhanced_embeddings.append(emb)

    return enhanced_embeddings
