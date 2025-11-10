import { NextRequest, NextResponse } from 'next/server';

// 缓存时间（秒）
const CACHE_SECONDS = 300; // 5分钟缓存

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('limit') || '10';
    const closed = searchParams.get('closed') || 'false';

    // 调用 Polymarket API
    const apiUrl = `https://gamma-api.polymarket.com/markets?limit=${limit}&closed=${closed}`;
    
    console.log('Fetching from Polymarket API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      // 不使用 Next.js 缓存，因为可能导致问题
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Polymarket API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch markets data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched', data.length, 'markets');

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    console.error('Error fetching Polymarket data:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
