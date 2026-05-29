import fs from 'fs';
import path from 'path';

const REQUIRED_VIDEOS = [
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

async function downloadDriveFile(url, destPath, expectedSize) {
  console.log(`Checking file: ${destPath}...`);

  // Check if it already exists and has correct size
  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size === expectedSize) {
      console.log(`- Local file is healthy (${stats.size} bytes). Skipping download.`);
      return;
    }
    console.log(`- Size mismatch (found ${stats.size} bytes, expected ${expectedSize} bytes). Downloading replacement...`);
  } else {
    console.log(`- File is missing. Downloading...`);
  }

  // Create parent directory if missing
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Quick HTML check
  const headSample = buffer.subarray(0, 150).toString('utf8');
  if (headSample.includes('<html') || headSample.includes('<!doctype') || headSample.includes('<HTML')) {
    throw new Error(`Google Drive returned HTML instead of raw binary for ${url}. File state may have changed.`);
  }

  fs.writeFileSync(destPath, buffer);
  console.log(`- Successfully saved ${destPath}. Size: ${buffer.length} bytes`);
}

async function run() {
  console.log("=========================================");
  console.log("[Build Event] Pre-installing video assets...");
  console.log("=========================================");
  
  try {
    for (const video of REQUIRED_VIDEOS) {
      const destPath = path.join(process.cwd(), 'public', video.filename);
      await downloadDriveFile(video.url, destPath, video.expectedSize);
    }
    console.log("=========================================");
    console.log("[Build Event] All videos successfully validated!");
    console.log("=========================================");
  } catch (err) {
    console.error("\n[Build Event] ERROR downloading videos:", err.message);
    process.exit(1);
  }
}

run();
