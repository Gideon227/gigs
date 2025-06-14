import { Country } from 'country-state-city';
import { NextResponse } from 'next/server';

export async function GET() {
  const countries = Country.getAllCountries();
  return NextResponse.json(countries);
}
