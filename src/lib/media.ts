import { readFile } from "node:fs/promises";
import path from "node:path";

const REPO = "bobinthomas/blujoylabs";
const MEDIA_ROOT = "content/media/images";
const MEDIA_URL_PREFIX = "/api/media/images/";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export function mediaContentPath(urlPath: string): string {
  const normalized = urlPath.replace(/^\/+/, "");
  const prefix = MEDIA_URL_PREFIX.replace(/^\/+/, "");
  if (!normalized.startsWith(prefix)) {
    throw new Error("Invalid media path");
  }
  const relative = normalized.slice(prefix.length);
  if (relative.includes("..")) {
    throw new Error("Invalid media path");
  }
  return path.posix.join(MEDIA_ROOT, relative);
}

export function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME[ext] ?? "application/octet-stream";
}

async function readFromGitHub(repoPath: string): Promise<ArrayBuffer> {
  const token = process.env.KEYSTATIC_GITHUB_TOKEN;
  if (!token) {
    throw new Error("KEYSTATIC_GITHUB_TOKEN is required to serve media on Workers");
  }

  const url = `https://api.github.com/repos/${REPO}/contents/${repoPath}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.raw",
      "User-Agent": "blujoylabs/1.0 (media)",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GitHub media fetch failed (${res.status})`);
  }

  return res.arrayBuffer();
}

async function readFromDisk(repoPath: string): Promise<ArrayBuffer> {
  // Dev-only path (KEYSTATIC_GITHUB_TOKEN is always set in the deployed Worker) —
  // turbopackIgnore keeps this dynamic fs access from tracing the whole project
  // into the production server bundle.
  const absolute = path.join(/* turbopackIgnore: true */ process.cwd(), repoPath);
  const buffer = await readFile(absolute);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

/** Read image bytes from the repo — GitHub API when a token is configured (Workers/prod), disk otherwise (dev). */
export async function readMediaBytes(repoPath: string): Promise<ArrayBuffer> {
  if (process.env.KEYSTATIC_GITHUB_TOKEN) {
    return readFromGitHub(repoPath);
  }
  return readFromDisk(repoPath);
}
