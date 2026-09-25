import worker from "../worker/index.js";

function firstHeaderValue(value, fallback) {
  if (Array.isArray(value)) return value[0] || fallback;
  return String(value || fallback).split(",")[0].trim();
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

export default async function handler(request, response) {
  try {
    const protocol = firstHeaderValue(request.headers["x-forwarded-proto"], "https");
    const host = firstHeaderValue(
      request.headers["x-forwarded-host"],
      request.headers.host || "localhost",
    );
    const url = new URL(request.url || "/", `${protocol}://${host}`);
    const method = request.method || "GET";
    const body = method === "GET" || method === "HEAD"
      ? undefined
      : await readRequestBody(request);
    const webRequest = new Request(url, {
      method,
      headers: request.headers,
      body,
      ...(body ? { duplex: "half" } : {}),
    });
    const executionContext = { waitUntil() {} };
    const webResponse = await worker.fetch(webRequest, process.env, executionContext);

    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, name) => response.setHeader(name, value));

    if (method === "HEAD" || !webResponse.body) {
      response.end();
      return;
    }

    response.end(Buffer.from(await webResponse.arrayBuffer()));
  } catch (error) {
    console.error("Vercel adapter error", error);
    response.statusCode = 500;
    response.setHeader("content-type", "application/json; charset=utf-8");
    response.end(JSON.stringify({ error: "서버 요청을 처리하지 못했습니다." }));
  }
}
