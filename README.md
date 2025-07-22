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

## Gemini cli

```bash
npx https://github.com/google-gemini/gemini-cli

or

npm install -g @google/gemini-cli

or

brew install gemini-cli

# win
set GOOGLE_API_KEY=YOUR_API_KEY
# mac
export GOOGLE_API_KEY=YOUR_API_KEY

gemini
```