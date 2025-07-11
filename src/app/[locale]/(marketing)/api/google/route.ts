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
    logger.info('准备发起 fetch 请求');
    // 3. 调用 Google Gemini REST 接口（fetch 方式）
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const fetchOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens,
        },
      }),
    };
    const resp = await fetch(endpoint, fetchOptions);
    logger.info('fetch 请求已完成');

    let fetchResult = '';
    if (!resp.ok) {
      const text = await resp.text();
      logger.error('调用 Google API 失败', {
        status: resp.status,
        statusText: resp.statusText,
        body: text,
      });
      fetchResult = `第三方 API 返回错误 ${resp.status}: ${text}`;
    } else {
      const data = await resp.json();
      fetchResult = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      logger.info('成功获取 Google 文本', { promptLength: prompt.length });
    }

    logger.info('API 返回结果', { fetchResult });
    return NextResponse.json({
      fetchResult,
    });
  } catch (e: any) {
    logger.error('主流程异常', { message: e?.message, stack: e?.stack, error: e });
    console.error('主流程异常', e);
    // 提取所有属性
    let extraErrorProps: Record<string, unknown> = {};
    if (typeof e === 'object' && e !== null) {
      extraErrorProps = Object.entries(e).reduce((acc: Record<string, unknown>, [k, v]) => {
        acc[`err_${k}`] = v;
        return acc;
      }, {});
    }
    logger.error('处理 /api/google 时抛出异常', {
      message: e?.message,
      stack: e?.stack,
      name: e?.name,
      error: e,
      toString: e?.toString?.(),
      ...extraErrorProps,
    });
    return NextResponse.json(
      {
        error: '处理请求时发生异常',
        message: e?.message,
        stack: e?.stack,
        name: e?.name,
        errorObj: e,
        toString: e?.toString?.(),
        ...extraErrorProps,
      },
      { status: 500 },
    );
  }
}
