/**
 * Sends an image file to the backend for analysis.
 * @param {File} file - The image File object from an input or drop event
 * @returns {Promise<Object>} The analysis result
 */
export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
    // Don't set Content-Type — browser sets it with correct boundary for multipart
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to analyze image.");
  }

  return data;
}
