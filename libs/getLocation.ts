export async function getLocationSuggestions(query: string) {
  if (!query) return [];

  try {
    const res = await fetch(`/api/location?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Location fetch failed:", err);
    return [];
  }
}
