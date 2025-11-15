from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import re
from collections import Counter

app = FastAPI()

# IMPORTANT: Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3001"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sentiment = pipeline("sentiment-analysis")
keywords_pipe = pipeline("token-classification", model="dslim/bert-base-NER", aggregation_strategy="simple")

# Common stop words to filter out
STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i',
    'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when',
    'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
    'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than',
    'too', 'very', 'just', 'am', 'my', 'me', 'your'
}

class TextIn(BaseModel):
    text: str

def extract_keywords(text, max_keywords=10):
    """Extract keywords using both NER and word frequency"""
    keywords = []
    
    # Try NER first
    try:
        entities = keywords_pipe(text)
        ner_keywords = [e["word"].strip() for e in entities if e["word"].strip()]
        keywords.extend(ner_keywords)
    except:
        pass
    
    # If no NER keywords or we want more, use word frequency
    if len(keywords) < 3:
        # Tokenize and clean
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        # Filter stop words
        important_words = [w for w in words if w not in STOP_WORDS]
        # Get most common words
        word_freq = Counter(important_words)
        freq_keywords = [word for word, count in word_freq.most_common(max_keywords)]
        keywords.extend(freq_keywords)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_keywords = []
    for kw in keywords:
        kw_lower = kw.lower()
        if kw_lower not in seen and kw_lower not in STOP_WORDS:
            seen.add(kw_lower)
            unique_keywords.append(kw)
    
    return unique_keywords[:max_keywords]

@app.post("/process_text")
async def process_text(data: TextIn):
    text = data.text

    s = sentiment(text)[0]
    score = s["score"]
    if s["label"] == "NEGATIVE":
        score = -score

    keywords = extract_keywords(text)

    return {
        "sentiment_score": score,
        "keywords": keywords
    }
