# daily-worker

一个可直接部署到 Cloudflare Workers 的测试页面。

## 本地运行

```bash
npm install
npm run dev
```

打开 Wrangler 输出的本地地址：

- `/`：HTML 测试页
- `/health`：JSON 健康检查

## 部署

```bash
npx wrangler login
npm run deploy
```

首次部署会要求登录 Cloudflare，并输出 `workers.dev` 访问地址。
