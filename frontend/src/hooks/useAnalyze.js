import { useState } from "react";
import { analyzeImage } from "../utils/api.js";

export function useAnalyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const analyze = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Generate local preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setResult(null);
    setError(null);
    setPreview(null);
    setLoading(false);
  };

  return { result, loading, error, preview, analyze, reset };
}
