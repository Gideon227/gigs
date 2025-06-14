import { City } from 'country-state-city';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const countryCode = req.nextUrl.searchParams.get('countryCode');
  const stateCode = req.nextUrl.searchParams.get('stateCode');

  if (!countryCode || !stateCode) return NextResponse.json([], { status: 400 });

  const cities = City.getCitiesOfState(countryCode, stateCode);
  return NextResponse.json(cities);
}
