from fastapi import FastAPI
import chromadb

app = FastAPI()

client = chromadb.Client()
collection = client.get_or_create_collection("documents")

@app.post("/store")
def store(data: dict):
    texts = data["texts"]
    embeddings = data["embeddings"]
    ids = data["ids"]

    collection.add(
        documents=texts,
        embeddings=embeddings,
        ids=ids
    )

    return {"status": "stored"}

@app.get("/all")
def get_all():
    results = collection.get()

    return {
        "ids": results["ids"],
        "documents": results["documents"],
        "metadatas": results.get("metadatas", []),
    }

@app.post("/query")
def query(data: dict):
    query_embedding = data["embedding"]

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return results