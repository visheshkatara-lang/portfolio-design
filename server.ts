import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface VideoFile {
  url: string;
  filename: string;
  expectedSize: number;
}

const REQUIRED_VIDEOS: VideoFile[] = [
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
    filename: "hero-bg.mp4",
    expectedSize: 16092112,
  },
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4",
    filename: "work-bg.mp4",
    expectedSize: 17790659,
  },
  {
    url: "https://docs.google.com/uc?export=download&id=1ORtgE-3P5DSQDrpI8e9HbeBRA2oixKxM",
    filename: "event-ops-bg.mp4",
    expectedSize: 15153337,
  },
  {
    url: "https://docs.google.com/uc?export=download&id=1c2h2yzoCzcD0bAoUu-3MRuqwJnbHfIV7",
    filename: "automation-ai-bg.mp4",
    expectedSize: 5087961,
  },
  {
    url: "https://docs.google.com/uc?export=download&id=1pkV4onubAAQZkPtUnZu4RTy7EWS2UXvW",
    filename: "marketing-bg.mp4",
    expectedSize: 29129799,
  },
];

async function ensureVideosOnDisk() {
  console.log("=========================================");
  console.log("[Self-Healing] Verifying background videos...");
  console.log("=========================================");

  for (const video of REQUIRED_VIDEOS) {
    const publicPath = path.join(process.cwd(), 'public', video.filename);
    const distPath = path.join(process.cwd(), 'dist', video.filename);

    let needsDownload = false;

    if (fs.existsSync(publicPath)) {
      const stats = fs.statSync(publicPath);
      if (stats.size !== video.expectedSize) {
        console.log(`[Self-Healing] Size mismatch for ${video.filename} (found ${stats.size} bytes, expected ${video.expectedSize} bytes). Downloading correct file...`);
        needsDownload = true;
      }
    } else {
      console.log(`[Self-Healing] ${video.filename} is missing from public/. Downloading...`);
      needsDownload = true;
    }

    if (needsDownload) {
      try {
        const response = await fetch(video.url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Quick sanity clean
        const headSample = buffer.subarray(0, 150).toString("utf8");
        if (headSample.includes("<html") || headSample.includes("<!doctype") || headSample.includes("<HTML")) {
          throw new Error("Target file returned HTML content instead of mp4 binary");
        }

        fs.mkdirSync(path.dirname(publicPath), { recursive: true });
        fs.writeFileSync(publicPath, buffer);
        console.log(`[Self-Healing] Successfully downloaded and saved ${video.filename} to public/.`);

        if (fs.existsSync(path.dirname(distPath))) {
          fs.writeFileSync(distPath, buffer);
          console.log(`[Self-Healing] Synced ${video.filename} to dist/.`);
        }
      } catch (err: any) {
        console.error(`[Self-Healing] FAILED downloading ${video.filename}:`, err.message);
      }
    } else {
      console.log(`[Self-Healing] ${video.filename} is healthy on disk.`);
      // Sync to dist if dist folder exists but file missing/incorrect size inside dist/
      if (fs.existsSync(path.dirname(distPath))) {
        let copyToDist = false;
        if (!fs.existsSync(distPath)) {
          copyToDist = true;
        } else {
          const distStats = fs.statSync(distPath);
          if (distStats.size !== video.expectedSize) {
            copyToDist = true;
          }
        }
        if (copyToDist) {
          try {
            fs.copyFileSync(publicPath, distPath);
            console.log(`[Self-Healing] Copied ${video.filename} from public/ to dist/.`);
          } catch (err: any) {
            console.error(`[Self-Healing] Error copying to dist/:`, err.message);
          }
        }
      }
    }
  }
  console.log("=========================================");
}

async function startServer() {
  // Run self-healing diagnostics
  await ensureVideosOnDisk();

  const app = express();
  const PORT = 3000;

  // Serve static assets out of the 'public' directory with Express first to guarantee Range Requests support!
  // This is the permanent solution for video streaming chunking (HTTP 206) in all browsers.
  app.use(express.static(path.join(process.cwd(), 'public')));

  // API testing route (health-check)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the 'dist' directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

