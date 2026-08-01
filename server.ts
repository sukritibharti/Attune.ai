import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Health API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Cognitive Reframe API Endpoint
app.post("/api/ai/reframe", async (req, res) => {
  const { thought, mood } = req.body;
  if (!thought || typeof thought !== "string") {
    res.status(400).json({ error: "Thought text is required" });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Fallback response if GEMINI_API_KEY is not set yet
    res.json({
      reframe: `It's completely natural to feel ${mood || 'overwhelmed'} right now. Try reminding yourself: "This feeling is temporary, and I am taking gentle steps to care for myself."`,
      perspective: "Acknowledging your feelings is the first step toward finding balance.",
      technique: "Paced Breathing"
    });
    return;
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are Attune, a gentle, empathetic mental health assistant for a reflective wellness app.
A user logged this thought while feeling "${mood || 'anxious'}":
"${thought}"

Please provide a compassionate response in JSON format with:
1. "reframe": A gentle, reframed perspective (2-3 sentences) validating their experience while offering a calmer, balanced way to look at it.
2. "perspective": A short grounding insight (1 sentence).
3. "technique": Suggested grounding technique (e.g., "Paced Breathing", "5-4-3-2-1 Grounding", "Cognitive Reframe").

Return ONLY valid JSON with keys: reframe, perspective, technique.`,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (err: any) {
    console.error("Gemini reframe error:", err);
    res.json({
      reframe: `It's completely natural to have moments like this. Remember that your current thoughts don't define your entire reality.`,
      perspective: "Taking a deep breath helps bring your mind back to the present.",
      technique: "Paced Breathing"
    });
  }
});

// Reflection Insight API
app.post("/api/ai/insight", async (req, res) => {
  const { reflections } = req.body;
  const client = getGeminiClient();
  if (!client) {
    res.json({
      summary: "You are actively giving yourself space to pause and reflect. Consistent small check-ins nurture long-term calm.",
      recommendedFocus: "Paced Breathing for 4 minutes in the morning."
    });
    return;
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are Attune's gentle reflection guide. Based on these recent user reflections: ${JSON.stringify(reflections)}, provide a warm 2-sentence summary of their emotional journey and 1 actionable mindfulness recommendation. Return JSON with "summary" and "recommendedFocus".`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (err) {
    res.json({
      summary: "You are building a healthy habit of pausing and honoring your emotional state.",
      recommendedFocus: "Regular grounding practices when feeling tense."
    });
  }
});

// Vite / Static setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Attune app running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
