import { State } from 'country-state-city';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const countryCode = req.nextUrl.searchParams.get('countryCode');
  if (!countryCode) return NextResponse.json([], { status: 400 });

  const states = State.getStatesOfCountry(countryCode);
  return NextResponse.json(states);
}
