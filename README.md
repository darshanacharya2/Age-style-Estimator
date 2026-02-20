# 🎨 Age & Style Estimator

An AI-powered portrait analyzer. Upload a photo and get an estimated age range, emotional mood, and art style tags — powered by Claude's vision capabilities.

## Project Structure

```
age-style-estimator/
├── backend/          # Express.js API server
│   └── src/
│       ├── index.js
│       ├── routes/analyze.js
│       └── services/claudeService.js
├── frontend/         # React + Vite app
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── hooks/
│       └── utils/
└── README.md
```

## Features

- Drag & drop or click to upload any portrait photo
- AI estimates age range, emotional mood, and dominant personality vibes
- Generates art style tags (e.g. "Baroque", "Neo-noir", "Lo-fi Illustration")
- Suggests a matching color palette for the subject
- Recommends a "visual twin" — a famous artwork or aesthetic the photo resembles
- Editorial magazine–inspired UI

## Tech Stack

- **Frontend**: React 18, Vite, CSS Modules
- **Backend**: Node.js, Express
- **AI Vision**: Anthropic Claude API (claude-sonnet with image input)

---

## Getting Started

### Prerequisites

- Node.js v18+
- An [Anthropic API key](https://console.anthropic.com/)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/age-style-estimator.git
cd age-style-estimator
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Environment Variables

### `backend/.env`

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
MAX_IMAGE_SIZE_MB=5
```

---

## API Endpoints

### `POST /api/analyze`

Accepts `multipart/form-data` with an `image` field.

**Response:**
```json
{
  "ageRange": "28–34",
  "mood": "Contemplative",
  "moodDescription": "A quiet introspection — the kind that comes after long thought.",
  "vibes": ["intellectual", "melancholic", "composed", "quietly intense"],
  "artStyles": ["Chiaroscuro", "Impressionist portrait", "Contemporary editorial"],
  "palette": ["#2C1810", "#8B6914", "#D4A853", "#F5E6C8"],
  "paletteNames": ["Mahogany", "Antique Gold", "Warm Amber", "Parchment"],
  "visualTwin": "Vermeer's Girl with a Pearl Earring",
  "era": "Renaissance soul in a modern frame",
  "oneLiner": "The face of someone who has read every room they've entered."
}
```

---

## Notes

- Images are **never stored** on disk. They are read into memory, analyzed, and discarded.
- Supported formats: JPEG, PNG, WebP, GIF
- Max image size: 5MB

---

## License

MIT
