// app/api/google/route.ts
import { NextResponse } from 'next/server';
import z from 'zod';
import { logger } from '@/libs/Logger';

const requestSchema = z.object({
  prompt: z.string().min(1, 'Prompt 不能为空'),
  temperature: z.number().optional(),
  maxOutputTokens: z.number().optional(),
});

export function GET() {
  return NextResponse.json({
    ok: true,
    info: 'GET 方法可用 —— 请使用 POST 进行文本生成',
  });
}

export async function POST(request: Request) {
  // 1. 解析并校验输入
  let body: unknown;
  try {
    body = await request.json();
  } catch (e: any) {
    logger.error('解析请求 JSON 失败', { message: e.message, stack: e.stack });
    return NextResponse.json(
      { error: '无效的 JSON 格式' },
      { status: 400 },
    );
  }

  const parseResult = requestSchema.safeParse(body);
  if (!parseResult.success) {
    logger.warn('请求校验不通过', { issues: parseResult.error.issues });
    return NextResponse.json(
      { errors: parseResult.error.format() },
      { status: 422 },
    );
  }

  const { prompt, temperature = 0.7, maxOutputTokens = 512 } = parseResult.data;

  // 2. 获取并检查 API Key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    logger.error('环境变量 GOOGLE_API_KEY 未配置');
    return NextResponse.json(
      { error: '服务器配置错误：缺少 API Key' },
      { status: 500 },
    );
  }

  try {
    // 3. 调用 Google Gemini REST 接口
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: { text: prompt },
        temperature,
        maxOutputTokens,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      logger.error('调用 Google API 失败', {
        status: resp.status,
        statusText: resp.statusText,
        body: text,
      });
      return NextResponse.json(
        {
          error: `第三方 API 返回错误 ${resp.status}`,
          details: text,
        },
        { status: 502 },
      );
    }

    const data = await resp.json();
    const generated = data.candidates?.[0]?.content ?? '';
    logger.info('成功获取 Google 文本', { promptLength: prompt.length });
    return NextResponse.json({ text: generated });
  } catch (e: any) {
    logger.error('处理 /api/google 时抛出异常', {
      message: e.message,
      stack: e.stack,
    });
    return NextResponse.json(
      {
        error: '处理请求时发生异常',
        message: e.message,
      },
      { status: 500 },
    );
  }
}
