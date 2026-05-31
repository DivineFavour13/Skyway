import { NextRequest, NextResponse } from 'next/server';
import { createOfferRequest } from '@/services/duffel';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const origin      = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date        = searchParams.get('date');
  const returnDate  = searchParams.get('returnDate');
  const adults      = Number(searchParams.get('adults') ?? '1');

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: 'origin, destination and date are required' },
      { status: 400 }
    );
  }

  try {
    const offers = await createOfferRequest(
      origin,
      destination,
      date,
      adults,
      returnDate ?? undefined
    );
    return NextResponse.json({ data: offers });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}