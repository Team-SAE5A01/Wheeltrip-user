import { NextResponse } from 'next/server';
import { apiBaseUrl } from '@/lib/appConfig';

export async function GET() {
  try {
    const testResponse = await fetch(`${apiBaseUrl}/test`); // Adjust endpoint based on your API
    const data = await testResponse.json();

    return NextResponse.json({
      apiBaseUrl,
      testResponseStatus: testResponse.status,
      responseBody: data,
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to connect to the API',
      apiBaseUrl,
    }, { status: 500 });
  }
}
