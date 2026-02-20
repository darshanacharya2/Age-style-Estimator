import { Router } from "express";
import multer from "multer";
import { analyzePortrait } from "../services/claudeService.js";

export const analyzeRoute = Router();

const MAX_SIZE_MB = Number(process.env.MAX_IMAGE_SIZE_MB) || 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Store file in memory — never written to disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type. Please upload JPEG, PNG, WebP, or GIF."));
    }
  },
});

analyzeRoute.post("/analyze", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image provided. Please upload an image file." });
  }

  try {
    const result = await analyzePortrait(req.file.buffer, req.file.mimetype);

    // If Claude detected no face
    if (result.error === "no_face") {
      return res.status(422).json({ error: result.message });
    }

    res.json(result);
  } catch (err) {
    console.error("Analysis error:", err);

    if (err.status === 401) {
      return res.status(500).json({ error: "Invalid API key. Check your .env file." });
    }

    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "AI returned an unexpected response. Please try again." });
    }

    if (err.message?.includes("file size")) {
      return res.status(413).json({ error: `Image too large. Max size is ${MAX_SIZE_MB}MB.` });
    }

    res.status(500).json({ error: "Failed to analyze image. Please try again." });
  }
});

// Multer error handler
analyzeRoute.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});
