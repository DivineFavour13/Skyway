import { NextRequest, NextResponse } from 'next/server';
import { getSeatMaps } from '@/services/duffel';

export async function GET(req: NextRequest) {
  const offerId = req.nextUrl.searchParams.get('offerId');

  if (!offerId) {
    return NextResponse.json({ error: 'offerId is required' }, { status: 400 });
  }

  try {
    const seatMaps = await getSeatMaps(offerId);
    return NextResponse.json({ data: seatMaps });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}