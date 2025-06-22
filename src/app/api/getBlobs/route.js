import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix');

  try {
    const blobs = await list({
      prefix: prefix,
      limit: 1,
    });

    return NextResponse.json(blobs.blobs);
  } catch (err) {
    console.error('Error fetching blobs:', err);
    return NextResponse.json({ error: 'Failed to fetch blobs' }, { status: 500 });
  }
}