import { makeRouteHandler } from "@keystatic/next/route-handler";
import { revalidatePath } from "next/cache";
import config from "../../../../../keystatic.config";

type KeystaticHandlers = ReturnType<typeof makeRouteHandler>;

/** Lazy init so `next build` doesn't require OAuth secrets (only needed at runtime on Workers). */
let handlers: KeystaticHandlers | null = null;
function getHandlers() {
  handlers ??= makeRouteHandler({ config });
  return handlers;
}

export async function GET(request: Request) {
  return getHandlers().GET(request);
}

/** Revalidate the whole site after a CMS save so edits go live without a redeploy. */
export async function POST(request: Request) {
  const response = await getHandlers().POST(request);
  if (response.ok) {
    revalidatePath("/", "layout");
  }
  return response;
}
