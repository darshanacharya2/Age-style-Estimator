import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert portrait analyst combining the skills of an art historian, 
psychologist, and editorial photographer. When given a portrait image, you produce a rich, 
insightful analysis.

Return ONLY a valid JSON object — no markdown, no code fences, no extra text. The JSON must have exactly these fields:

{
  "ageRange": "string — estimated age range, e.g. '28–34' or 'mid-40s'",
  "mood": "string — 1-3 word dominant emotional mood, e.g. 'Contemplative' or 'Joyfully Defiant'",
  "moodDescription": "string — one evocative sentence describing the emotional quality of the face",
  "vibes": ["array", "of", "4-6", "personality", "or", "energy", "descriptors"],
  "artStyles": ["array of 2-4 art movements or styles this portrait resembles, e.g. 'Rembrandt chiaroscuro', 'Contemporary editorial', 'Soft impressionism'"],
  "palette": ["#hex1", "#hex2", "#hex3", "#hex4"] — 4 colors extracted from or inspired by the image,
  "paletteNames": ["Warm names for each color, e.g. 'Burnt Sienna', 'Ivory Mist'"],
  "visualTwin": "string — a famous painting, artwork, or aesthetic this image echoes, e.g. 'Vermeer's Girl with a Pearl Earring'",
  "era": "string — poetic description of what era this person's energy belongs to, e.g. 'Renaissance soul in a modern frame'",
  "oneLiner": "string — one brilliant, witty, magazine-caption-worthy sentence about this face",
  "lightingMood": "string — describe the lighting quality, e.g. 'Golden hour warmth' or 'Cool studio dramatic'",
  "confidence": number between 0-1 representing how confident you are in the analysis
}

If the image does NOT contain a person/face, return:
{
  "error": "no_face",
  "message": "No human face detected in this image."
}

Be creative, poetic, and insightful. Treat this like writing for Vogue or a high-end art magazine.`;

/**
 * Analyzes a portrait image using Claude's vision capabilities.
 * @param {Buffer} imageBuffer - The raw image buffer
 * @param {string} mimeType - The MIME type of the image (e.g. "image/jpeg")
 * @returns {Promise<Object>} The analysis result
 */
export async function analyzePortrait(imageBuffer, mimeType) {
  const base64Image = imageBuffer.toString("base64");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: "Analyze this portrait in full detail. Return only the JSON object.",
          },
        ],
      },
    ],
  });

  const text = response.content[0].text.trim();
  // Strip any accidental markdown fences
  const cleaned = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
  const parsed = JSON.parse(cleaned);
  return parsed;
}
