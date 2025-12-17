import fs from "fs";
import { createRequire } from "module";
import { chunkText } from "./search.js";
import { createEmbedding } from "./embed.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export let vectorDB = [];

export async function ingestDocument(filePath) {
  let text = "";

  if (filePath.endsWith(".pdf")) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    text = data.text;
  } else {
    text = fs.readFileSync(filePath, "utf-8");
  }

  const chunks = chunkText(text).slice(0, 5);

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);
    vectorDB.push({ text: chunk, embedding });
  }
}
