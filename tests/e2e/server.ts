import http from "node:http";

import { GET as homeGet } from "../../app/route";
import { GET as giftGet } from "../../app/gift/route";
import { GET as giftResultGet } from "../../app/gift/result/route";
import { GET as giftPageGet } from "../../app/gift/g/[slug]/route";
import { GET as bookingGet } from "../../app/booking/route";
import { GET as bookingConfirmationGet } from "../../app/booking/confirmation/route";
import { POST as giftRecommendationPost } from "../../app/api/gift/recommendation/route";
import { POST as giftLeadPost } from "../../app/api/gift/lead/route";
import { POST as bookingRequestPost } from "../../app/api/booking/request/route";

type RouteHandler = (request: Request, context?: { params: Promise<Record<string, string>> }) => Promise<Response>;

const routeMap = {
  GET: new Map<string, RouteHandler>([
    ["/", homeGet],
    ["/gift", giftGet],
    ["/gift/result", giftResultGet],
    ["/booking", bookingGet],
    ["/booking/confirmation", bookingConfirmationGet],
  ]),
  POST: new Map<string, RouteHandler>([
    ["/api/gift/recommendation", giftRecommendationPost],
    ["/api/gift/lead", giftLeadPost],
    ["/api/booking/request", bookingRequestPost],
  ]),
};

function getHandler(method: string, pathname: string): RouteHandler | null {
  const staticHandler = routeMap[method as keyof typeof routeMap]?.get(pathname);
  if (staticHandler) {
    return staticHandler;
  }

  if (method === "GET" && pathname.startsWith("/gift/g/")) {
    const slug = pathname.slice("/gift/g/".length);
    if (!slug) {
      return null;
    }
    return (request: Request) => giftPageGet(request, { params: Promise.resolve({ slug }) });
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "127.0.0.1:4173"}`);
  const handler = getHandler(method, url.pathname);
  if (!handler) {
    res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, code: "NOT_FOUND" }));
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody && chunks.length > 0 ? Buffer.concat(chunks) : undefined;
  const request = new Request(url.toString(), {
    method,
    headers: req.headers as HeadersInit,
    body,
  });

  try {
    const response = await handler(request);
    const headers = Object.fromEntries(response.headers.entries());
    const bytes = new Uint8Array(await response.arrayBuffer());
    res.writeHead(response.status, headers);
    res.end(bytes);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, code: "INTERNAL_ERROR", message: String(error) }));
  }
});

const port = Number(process.env.PORT || 4173);
server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`E2E server listening on http://127.0.0.1:${port}\n`);
});
