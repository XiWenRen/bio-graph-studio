import { SpeciesData } from '../types';

// In-memory cache for resolved species images
const imageCache: Record<string, string> = {};

/**
 * Fetch reliable, accurate species media directly from Wikipedia & GBIF
 * based strictly on its canonical binomial Latin Scientific Name or Chinese Name.
 */
export async function fetchScientificSpeciesImage(
  scientificName: string,
  chineseName?: string
): Promise<string | null> {
  const cleanSciName = scientificName.split('(')[0].trim();
  const cacheKey = `${cleanSciName}_${chineseName || ''}`;

  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  // 1. Try English Wikipedia by Scientific Name (highest accuracy for verified biological photographs)
  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      cleanSciName
    )}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
    const res = await fetch(wikiUrl);
    if (res.ok) {
      const data = await res.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId && pageId !== '-1' && pages[pageId]?.thumbnail?.source) {
          const imgUrl = pages[pageId].thumbnail.source;
          imageCache[cacheKey] = imgUrl;
          return imgUrl;
        }
      }
    }
  } catch (e) {
    // continue to fallback
  }

  // 2. Try Chinese Wikipedia by Chinese Common Name
  if (chineseName) {
    try {
      const zhWikiUrl = `https://zh.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        chineseName
      )}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
      const res = await fetch(zhWikiUrl);
      if (res.ok) {
        const data = await res.json();
        const pages = data.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          if (pageId && pageId !== '-1' && pages[pageId]?.thumbnail?.source) {
            const imgUrl = pages[pageId].thumbnail.source;
            imageCache[cacheKey] = imgUrl;
            return imgUrl;
          }
        }
      }
    } catch (e) {
      // continue to fallback
    }
  }

  // 3. Try GBIF (Global Biodiversity Information Facility) Taxonomy & Media Registry API
  try {
    const gbifMatchUrl = `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(cleanSciName)}`;
    const matchRes = await fetch(gbifMatchUrl);
    if (matchRes.ok) {
      const matchData = await matchRes.json();
      const taxonKey = matchData.usageKey || matchData.speciesKey;
      if (taxonKey) {
        const gbifMediaUrl = `https://api.gbif.org/v1/species/${taxonKey}/media?limit=5`;
        const mediaRes = await fetch(gbifMediaUrl);
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          const validMedia = mediaData.results?.find(
            (m: any) => m.type === 'StillImage' && m.identifier && (m.format?.includes('jpeg') || m.format?.includes('png') || m.identifier.endsWith('.jpg') || m.identifier.endsWith('.png'))
          );
          if (validMedia?.identifier) {
            imageCache[cacheKey] = validMedia.identifier;
            return validMedia.identifier;
          }
        }
      }
    }
  } catch (e) {
    // continue to fallback
  }

  return null;
}
