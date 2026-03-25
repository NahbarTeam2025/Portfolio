import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Brute-Force-Schutz: Maximal 5 Versuche pro 15 Minuten pro IP
  const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 5, // 5 Versuche
    message: { success: false, message: "Zu viele Versuche. Bitte warte 15 Minuten." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API-Endpunkt zur Passwortprüfung mit Brute-Force-Schutz
  app.post("/api/verify-password", passwordLimiter, (req, res) => {
    const { password } = req.body;
    // Das Passwort wird aus der Umgebungsvariable gelesen (Fallback auf 'Robert' für die Entwicklung)
    const correctPassword = process.env.PROTECTED_CONTENT_PASSWORD || "Robert";

    if (password === correctPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Ungültiges Passwort" });
    }
  });

  // Vite-Middleware für die Entwicklung
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
}

startServer();
