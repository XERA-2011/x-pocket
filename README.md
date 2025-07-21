# X-POCKET

## Requirements

- Node.js 22+
- pnpm

## Installation

```bash
npm install pnpm -g
pnpm config set registry https://registry.npmmirror.com # ignorable
pnpm install
```

## Run

```bash
pnpm dev
```

## Vercel

```bash
# 安装 Vercel CLI
pnpm install -g vercel

# 登录
vercel login

# 链接项目
vercel link

# 列出环境变量
vercel env ls

# 下载环境变量
vercel env pull .env.local

```