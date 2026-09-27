import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig, { isLocalStorage } from "../../keystatic.config";

const REPO = "bobinthomas/blujoylabs" as const;

/** How long GitHub API reads are served from Cloudflare's edge cache. */
const CONTENT_TTL_SECONDS = 60; // page content: CMS edits show up within a minute
const MEDIA_TTL_SECONDS = 300; // raw image bytes change far less often

type EdgeCache = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
};

/**
 * Wraps fetch for the content reader and the media route:
 *  - adds the User-Agent GitHub's REST API requires (Workers send none), and
 *  - serves GET requests to api.github.com from Cloudflare's edge cache.
 *
 * Without the cache every page view made fresh GitHub API calls: slow first
 * loads after a push, and a hard traffic ceiling from GitHub's 5,000
 * requests/hour limit. Only successful GETs are cached; the key includes the
 * Accept header because the same URL returns JSON or raw bytes depending on it.
 * Where no edge cache exists (local `next dev`) requests pass straight through.
 */
export function ensureGitHubFetchPatched() {
  if (typeof globalThis.fetch !== "function") return;
  if ((globalThis.fetch as { __bjPatched?: boolean }).__bjPatched) return;
  const originalFetch = globalThis.fetch.bind(globalThis);

  const patched = async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    if (!request.headers.has("User-Agent")) {
      request.headers.set("User-Agent", "blujoylabs/1.0 (Keystatic GitHub reader)");
    }

    const cache = (globalThis as { caches?: { default?: EdgeCache } }).caches?.default;
    if (!cache || request.method !== "GET" || !request.url.startsWith("https://api.github.com/")) {
      return originalFetch(request);
    }

    const accept = request.headers.get("Accept") ?? "";
    const keyUrl = new URL(request.url);
    keyUrl.searchParams.set("__bj_accept", accept);
    const key = new Request(keyUrl.toString(), { method: "GET" });

    const hit = await cache.match(key);
    if (hit) return hit;

    const response = await originalFetch(request);
    if (response.ok) {
      const ttl = accept.includes("raw") ? MEDIA_TTL_SECONDS : CONTENT_TTL_SECONDS;
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", `public, max-age=${ttl}`);
      headers.delete("Set-Cookie");
      await cache.put(key, new Response(response.clone().body, { status: response.status, headers }));
    }
    return response;
  };
  (patched as { __bjPatched?: boolean }).__bjPatched = true;
  globalThis.fetch = patched as typeof fetch;
}

function createContentReader() {
  const token = process.env.KEYSTATIC_GITHUB_TOKEN;

  if (token && !isLocalStorage) {
    ensureGitHubFetchPatched();
    return createGitHubReader(keystaticConfig, { repo: REPO, token });
  }

  if (process.env.KEYSTATIC_GITHUB_CLIENT_ID) {
    console.warn(
      "[content] KEYSTATIC_GITHUB_TOKEN is not set — CMS saves go to GitHub but the site reads local content/*.json. Add a read-only GitHub PAT to .env.local and Cloudflare secrets."
    );
  }

  return createReader(process.cwd(), keystaticConfig);
}

let cachedReader: ReturnType<typeof createContentReader> | undefined;

/** Lazy reader — env bindings are only guaranteed at request time on Workers. */
export function getKeystaticReader() {
  if (cachedReader === undefined) {
    cachedReader = createContentReader();
  }
  return cachedReader;
}
