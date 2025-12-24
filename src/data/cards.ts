/**
 * Card data for the Tarot de Marseille deck
 */

export interface CardInfo {
  id: string;
  filename: string;
  category: 'major' | 'wands' | 'cups' | 'swords' | 'coins' | 'special';
  number: number;
}

// Major Arcana (a01-a22)
const majorArcana: CardInfo[] = Array.from({ length: 22 }, (_, i) => ({
  id: `major-${i + 1}`,
  filename: `a${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'major' as const,
  number: i + 1,
}));

// Wands (b01-b14)
const wands: CardInfo[] = Array.from({ length: 14 }, (_, i) => ({
  id: `wands-${i + 1}`,
  filename: `b${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'wands' as const,
  number: i + 1,
}));

// Cups (c01-c14)
const cups: CardInfo[] = Array.from({ length: 14 }, (_, i) => ({
  id: `cups-${i + 1}`,
  filename: `c${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'cups' as const,
  number: i + 1,
}));

// Swords (d01-d14)
const swords: CardInfo[] = Array.from({ length: 14 }, (_, i) => ({
  id: `swords-${i + 1}`,
  filename: `d${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'swords' as const,
  number: i + 1,
}));

// Coins (e01-e14)
const coins: CardInfo[] = Array.from({ length: 14 }, (_, i) => ({
  id: `coins-${i + 1}`,
  filename: `e${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'coins' as const,
  number: i + 1,
}));

// Special cards (z00-z01)
const special: CardInfo[] = Array.from({ length: 2 }, (_, i) => ({
  id: `special-${i}`,
  filename: `z${String(i).padStart(2, '0')}.jpg`,
  category: 'special' as const,
  number: i,
}));

export const ALL_CARDS: CardInfo[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...coins,
  ...special,
];

export const CARDS_BY_CATEGORY = {
  major: majorArcana,
  wands,
  cups,
  swords,
  coins,
  special,
};

/**
 * Get the full path to a card image.
 * Supports custom base URL and cards directory configuration.
 */
export function getCardImagePath(card: CardInfo): string {
  const baseUrl = import.meta.env.VITE_BASE_URL || '/';
  const cardsPath = import.meta.env.VITE_CARDS_PATH || 'cards';

  // Normalize base URL to always end with a slash
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  // Remove leading slash from cards path if present
  const normalizedCardsPath = cardsPath.startsWith('/') ? cardsPath.slice(1) : cardsPath;

  return `${normalizedBase}${normalizedCardsPath}/${card.filename}`;
}
