const page = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cloudflare Worker 测试页</title>
    <style>
      :root { color-scheme: dark; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #101827; color: #f8fafc; }
      main { width: min(680px, calc(100% - 40px)); padding: 42px; border: 1px solid #334155; border-radius: 14px; background: #172235; box-shadow: 0 24px 70px #02061766; }
      .status { display: inline-flex; align-items: center; gap: 8px; color: #86efac; font-size: 14px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
      .dot { width: 9px; height: 9px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 0 5px #4ade8022; }
      h1 { margin: 18px 0 10px; font-size: clamp(30px, 6vw, 48px); line-height: 1.08; letter-spacing: -.02em; }
      p { margin: 0; color: #cbd5e1; line-height: 1.7; }
      .meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 28px; }
      .item { padding: 15px 16px; border: 1px solid #334155; border-radius: 8px; background: #0f172acc; }
      .label { display: block; margin-bottom: 6px; color: #94a3b8; font-size: 12px; }
      code { color: #bfdbfe; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 13px; word-break: break-word; }
      @media (max-width: 520px) { main { padding: 28px 24px; } .meta { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    <main>
      <div class="status"><span class="dot"></span> Worker 已运行</div>
      <h1>Cloudflare Worker 测试页</h1>
      <p>这个页面由 Cloudflare Worker 动态返回。部署成功后，访问 <code>/health</code> 可以检查服务状态。</p>
      <div class="meta">
        <div class="item"><span class="label">运行平台</span><code>Cloudflare Workers</code></div>
        <div class="item"><span class="label">检查接口</span><code>GET /health</code></div>
      </div>
    </main>
  </body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "daily-worker", timestamp: new Date().toISOString() });
    }

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET" } });
    }

    return new Response(page, { headers: { "content-type": "text/html; charset=UTF-8" } });
  },
};
