import Groq from "groq-sdk";
import { vectorDB } from "./ingest.js";
import { createEmbedding } from "./embed.js";
import { cosineSimilarity } from "./search.js";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function answerQuery(question) {
  if (!vectorDB.length) {
    throw new Error("No documents ingested yet");
  }

  const queryEmbedding = await createEmbedding(question);

  const scored = vectorDB.map((item) => ({
    text: item.text,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  const context = scored
    .slice(0, 3)
    .map((c) => c.text)
    .join("\n");

  const prompt = `
Using ONLY the following documents, answer the question.

Context:
${context}

Question:
${question}

Answer concisely and accurately.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
