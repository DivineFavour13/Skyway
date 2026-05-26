import { NextRequest, NextResponse } from 'next/server';
import { searchAirportsLocal } from '@/lib/airports';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') ?? '';
  const results = searchAirportsLocal(query);
  return NextResponse.json({ data: results });
}