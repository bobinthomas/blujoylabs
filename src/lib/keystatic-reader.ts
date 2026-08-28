import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../keystatic.config";

const REPO = "bobinthomas/blujoylabs" as const;

/** GitHub's REST API requires a User-Agent header; Cloudflare Workers omit one by default. */
function patchFetchForGitHubApi() {
  if (typeof globalThis.fetch !== "function") return;
  const originalFetch = globalThis.fetch.bind(globalThis);
  if ((originalFetch as { __keystaticPatched?: boolean }).__keystaticPatched) return;

  const patched = (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "blujoylabs/1.0 (Keystatic GitHub reader)");
    }
    return originalFetch(input, { ...init, headers });
  };
  (patched as { __keystaticPatched?: boolean }).__keystaticPatched = true;
  globalThis.fetch = patched;
}

function createContentReader() {
  const token = process.env.KEYSTATIC_GITHUB_TOKEN;

  if (token) {
    patchFetchForGitHubApi();
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
