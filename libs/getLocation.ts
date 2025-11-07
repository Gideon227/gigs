export async function getLocationSuggestions(query: string) {
  if (!query) return [];

  try {
    const res = await fetch(`/api/location?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: any) => ({
      display_name: item.display_name,
      address: item.address,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (err) {
    console.error("Location fetch failed:", err);
    return [];
  }
}
