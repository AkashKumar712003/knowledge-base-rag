import express from "express";
import multer from "multer";
import fs from "fs";
import { ingestDocument } from "./ingest.js";
import { answerQuery } from "./query.js";

const app = express();
app.use(express.json());

const upload = multer({ dest: "data/documents/" });


app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("UPLOAD REQUEST RECEIVED");

  if (!req.file) {
    return res.status(400).json({ error: "File field is missing" });
  }

  console.log("FILE SAVED:", req.file.path);

  await ingestDocument(req.file.path);

  console.log("INGESTION COMPLETE");

  res.json({ message: "Document ingested successfully" });
});



app.post("/query", async (req, res) => {
  const { question } = req.body;
  const answer = await answerQuery(question);
  res.json({ answer });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
