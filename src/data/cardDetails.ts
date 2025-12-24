/**
 * Extended card details from Tarot data
 * Contains name, description, and meanings for each card
 */

export interface CardDetails {
  name: string;
  description: string;
  meaningUp: string;
  meaningReversed: string;
}

/**
 * Mapping from card filename (without extension) to card details
 */
export const CARD_DETAILS: Record<string, CardDetails> = {
  // Major Arcana
  a01: {
    name: 'cards.a01.name',
    meaningUp: 'cards.a01.meaningUp',
    meaningReversed: 'cards.a01.meaningReversed',
    description: 'cards.a01.description',
  },
  a02: {
    name: 'cards.a02.name',
    meaningUp: 'cards.a02.meaningUp',
    meaningReversed: 'cards.a02.meaningReversed',
    description: 'cards.a02.description',
  },
  a03: {
    name: 'cards.a03.name',
    meaningUp: 'cards.a03.meaningUp',
    meaningReversed: 'cards.a03.meaningReversed',
    description: 'cards.a03.description',
  },
  a04: {
    name: 'cards.a04.name',
    meaningUp: 'cards.a04.meaningUp',
    meaningReversed: 'cards.a04.meaningReversed',
    description: 'cards.a04.description',
  },
  a05: {
    name: 'cards.a05.name',
    meaningUp: 'cards.a05.meaningUp',
    meaningReversed: 'cards.a05.meaningReversed',
    description: 'cards.a05.description',
  },
  a06: {
    name: 'cards.a06.name',
    meaningUp: 'cards.a06.meaningUp',
    meaningReversed: 'cards.a06.meaningReversed',
    description: 'cards.a06.description',
  },
  a07: {
    name: 'cards.a07.name',
    meaningUp: 'cards.a07.meaningUp',
    meaningReversed: 'cards.a07.meaningReversed',
    description: 'cards.a07.description',
  },
  a08: {
    name: 'cards.a08.name',
    meaningUp: 'cards.a08.meaningUp',
    meaningReversed: 'cards.a08.meaningReversed',
    description: 'cards.a08.description',
  },
  a09: {
    name: 'cards.a09.name',
    meaningUp: 'cards.a09.meaningUp',
    meaningReversed: 'cards.a09.meaningReversed',
    description: 'cards.a09.description',
  },
  a10: {
    name: 'cards.a10.name',
    meaningUp: 'cards.a10.meaningUp',
    meaningReversed: 'cards.a10.meaningReversed',
    description: 'cards.a10.description',
  },
  a11: {
    name: 'cards.a11.name',
    meaningUp: 'cards.a11.meaningUp',
    meaningReversed: 'cards.a11.meaningReversed',
    description: 'cards.a11.description',
  },
  a12: {
    name: 'cards.a12.name',
    meaningUp: 'cards.a12.meaningUp',
    meaningReversed: 'cards.a12.meaningReversed',
    description: 'cards.a12.description',
  },
  a13: {
    name: 'cards.a13.name',
    meaningUp: 'cards.a13.meaningUp',
    meaningReversed: 'cards.a13.meaningReversed',
    description: 'cards.a13.description',
  },
  a14: {
    name: 'cards.a14.name',
    meaningUp: 'cards.a14.meaningUp',
    meaningReversed: 'cards.a14.meaningReversed',
    description: 'cards.a14.description',
  },
  a15: {
    name: 'cards.a15.name',
    meaningUp: 'cards.a15.meaningUp',
    meaningReversed: 'cards.a15.meaningReversed',
    description: 'cards.a15.description',
  },
  a16: {
    name: 'cards.a16.name',
    meaningUp: 'cards.a16.meaningUp',
    meaningReversed: 'cards.a16.meaningReversed',
    description: 'cards.a16.description',
  },
  a17: {
    name: 'cards.a17.name',
    meaningUp: 'cards.a17.meaningUp',
    meaningReversed: 'cards.a17.meaningReversed',
    description: 'cards.a17.description',
  },
  a18: {
    name: 'cards.a18.name',
    meaningUp: 'cards.a18.meaningUp',
    meaningReversed: 'cards.a18.meaningReversed',
    description: 'cards.a18.description',
  },
  a19: {
    name: 'cards.a19.name',
    meaningUp: 'cards.a19.meaningUp',
    meaningReversed: 'cards.a19.meaningReversed',
    description: 'cards.a19.description',
  },
  a20: {
    name: 'cards.a20.name',
    meaningUp: 'cards.a20.meaningUp',
    meaningReversed: 'cards.a20.meaningReversed',
    description: 'cards.a20.description',
  },
  a21: {
    name: 'cards.a21.name',
    meaningUp: 'cards.a21.meaningUp',
    meaningReversed: 'cards.a21.meaningReversed',
    description: 'cards.a21.description',
  },
  a22: {
    name: 'cards.a22.name',
    meaningUp: 'cards.a22.meaningUp',
    meaningReversed: 'cards.a22.meaningReversed',
    description: 'cards.a22.description',
  },

  // Wands (Minor Arcana)
  b01: {
    name: 'cards.b01.name',
    meaningUp: 'cards.b01.meaningUp',
    meaningReversed: 'cards.b01.meaningReversed',
    description: 'cards.b01.description',
  },
  b02: {
    name: 'cards.b02.name',
    meaningUp: 'cards.b02.meaningUp',
    meaningReversed: 'cards.b02.meaningReversed',
    description: 'cards.b02.description',
  },
  b03: {
    name: 'cards.b03.name',
    meaningUp: 'cards.b03.meaningUp',
    meaningReversed: 'cards.b03.meaningReversed',
    description: 'cards.b03.description',
  },
  b04: {
    name: 'cards.b04.name',
    meaningUp: 'cards.b04.meaningUp',
    meaningReversed: 'cards.b04.meaningReversed',
    description: 'cards.b04.description',
  },
  b05: {
    name: 'cards.b05.name',
    meaningUp: 'cards.b05.meaningUp',
    meaningReversed: 'cards.b05.meaningReversed',
    description: 'cards.b05.description',
  },
  b06: {
    name: 'cards.b06.name',
    meaningUp: 'cards.b06.meaningUp',
    meaningReversed: 'cards.b06.meaningReversed',
    description: 'cards.b06.description',
  },
  b07: {
    name: 'cards.b07.name',
    meaningUp: 'cards.b07.meaningUp',
    meaningReversed: 'cards.b07.meaningReversed',
    description: 'cards.b07.description',
  },
  b08: {
    name: 'cards.b08.name',
    meaningUp: 'cards.b08.meaningUp',
    meaningReversed: 'cards.b08.meaningReversed',
    description: 'cards.b08.description',
  },
  b09: {
    name: 'cards.b09.name',
    meaningUp: 'cards.b09.meaningUp',
    meaningReversed: 'cards.b09.meaningReversed',
    description: 'cards.b09.description',
  },
  b10: {
    name: 'cards.b10.name',
    meaningUp: 'cards.b10.meaningUp',
    meaningReversed: 'cards.b10.meaningReversed',
    description: 'cards.b10.description',
  },
  b11: {
    name: 'cards.b11.name',
    meaningUp: 'cards.b11.meaningUp',
    meaningReversed: 'cards.b11.meaningReversed',
    description: 'cards.b11.description',
  },
  b12: {
    name: 'cards.b12.name',
    meaningUp: 'cards.b12.meaningUp',
    meaningReversed: 'cards.b12.meaningReversed',
    description: 'cards.b12.description',
  },
  b13: {
    name: 'cards.b13.name',
    meaningUp: 'cards.b13.meaningUp',
    meaningReversed: 'cards.b13.meaningReversed',
    description: 'cards.b13.description',
  },
  b14: {
    name: 'cards.b14.name',
    meaningUp: 'cards.b14.meaningUp',
    meaningReversed: 'cards.b14.meaningReversed',
    description: 'cards.b14.description',
  },

  // Cups (Minor Arcana)
  c01: {
    name: 'cards.c01.name',
    meaningUp: 'cards.c01.meaningUp',
    meaningReversed: 'cards.c01.meaningReversed',
    description: 'cards.c01.description',
  },
  c02: {
    name: 'cards.c02.name',
    meaningUp: 'cards.c02.meaningUp',
    meaningReversed: 'cards.c02.meaningReversed',
    description: 'cards.c02.description',
  },
  c03: {
    name: 'cards.c03.name',
    meaningUp: 'cards.c03.meaningUp',
    meaningReversed: 'cards.c03.meaningReversed',
    description: 'cards.c03.description',
  },
  c04: {
    name: 'cards.c04.name',
    meaningUp: 'cards.c04.meaningUp',
    meaningReversed: 'cards.c04.meaningReversed',
    description: 'cards.c04.description',
  },
  c05: {
    name: 'cards.c05.name',
    meaningUp: 'cards.c05.meaningUp',
    meaningReversed: 'cards.c05.meaningReversed',
    description: 'cards.c05.description',
  },
  c06: {
    name: 'cards.c06.name',
    meaningUp: 'cards.c06.meaningUp',
    meaningReversed: 'cards.c06.meaningReversed',
    description: 'cards.c06.description',
  },
  c07: {
    name: 'cards.c07.name',
    meaningUp: 'cards.c07.meaningUp',
    meaningReversed: 'cards.c07.meaningReversed',
    description: 'cards.c07.description',
  },
  c08: {
    name: 'cards.c08.name',
    meaningUp: 'cards.c08.meaningUp',
    meaningReversed: 'cards.c08.meaningReversed',
    description: 'cards.c08.description',
  },
  c09: {
    name: 'cards.c09.name',
    meaningUp: 'cards.c09.meaningUp',
    meaningReversed: 'cards.c09.meaningReversed',
    description: 'cards.c09.description',
  },
  c10: {
    name: 'cards.c10.name',
    meaningUp: 'cards.c10.meaningUp',
    meaningReversed: 'cards.c10.meaningReversed',
    description: 'cards.c10.description',
  },
  c11: {
    name: 'cards.c11.name',
    meaningUp: 'cards.c11.meaningUp',
    meaningReversed: 'cards.c11.meaningReversed',
    description: 'cards.c11.description',
  },
  c12: {
    name: 'cards.c12.name',
    meaningUp: 'cards.c12.meaningUp',
    meaningReversed: 'cards.c12.meaningReversed',
    description: 'cards.c12.description',
  },
  c13: {
    name: 'cards.c13.name',
    meaningUp: 'cards.c13.meaningUp',
    meaningReversed: 'cards.c13.meaningReversed',
    description: 'cards.c13.description',
  },
  c14: {
    name: 'cards.c14.name',
    meaningUp: 'cards.c14.meaningUp',
    meaningReversed: 'cards.c14.meaningReversed',
    description: 'cards.c14.description',
  },

  // Swords (Minor Arcana)
  d01: {
    name: 'cards.d01.name',
    meaningUp: 'cards.d01.meaningUp',
    meaningReversed: 'cards.d01.meaningReversed',
    description: 'cards.d01.description',
  },
  d02: {
    name: 'cards.d02.name',
    meaningUp: 'cards.d02.meaningUp',
    meaningReversed: 'cards.d02.meaningReversed',
    description: 'cards.d02.description',
  },
  d03: {
    name: 'cards.d03.name',
    meaningUp: 'cards.d03.meaningUp',
    meaningReversed: 'cards.d03.meaningReversed',
    description: 'cards.d03.description',
  },
  d04: {
    name: 'cards.d04.name',
    meaningUp: 'cards.d04.meaningUp',
    meaningReversed: 'cards.d04.meaningReversed',
    description: 'cards.d04.description',
  },
  d05: {
    name: 'cards.d05.name',
    meaningUp: 'cards.d05.meaningUp',
    meaningReversed: 'cards.d05.meaningReversed',
    description: 'cards.d05.description',
  },
  d06: {
    name: 'cards.d06.name',
    meaningUp: 'cards.d06.meaningUp',
    meaningReversed: 'cards.d06.meaningReversed',
    description: 'cards.d06.description',
  },
  d07: {
    name: 'cards.d07.name',
    meaningUp: 'cards.d07.meaningUp',
    meaningReversed: 'cards.d07.meaningReversed',
    description: 'cards.d07.description',
  },
  d08: {
    name: 'cards.d08.name',
    meaningUp: 'cards.d08.meaningUp',
    meaningReversed: 'cards.d08.meaningReversed',
    description: 'cards.d08.description',
  },
  d09: {
    name: 'cards.d09.name',
    meaningUp: 'cards.d09.meaningUp',
    meaningReversed: 'cards.d09.meaningReversed',
    description: 'cards.d09.description',
  },
  d10: {
    name: 'cards.d10.name',
    meaningUp: 'cards.d10.meaningUp',
    meaningReversed: 'cards.d10.meaningReversed',
    description: 'cards.d10.description',
  },
  d11: {
    name: 'cards.d11.name',
    meaningUp: 'cards.d11.meaningUp',
    meaningReversed: 'cards.d11.meaningReversed',
    description: 'cards.d11.description',
  },
  d12: {
    name: 'cards.d12.name',
    meaningUp: 'cards.d12.meaningUp',
    meaningReversed: 'cards.d12.meaningReversed',
    description: 'cards.d12.description',
  },
  d13: {
    name: 'cards.d13.name',
    meaningUp: 'cards.d13.meaningUp',
    meaningReversed: 'cards.d13.meaningReversed',
    description: 'cards.d13.description',
  },
  d14: {
    name: 'cards.d14.name',
    meaningUp: 'cards.d14.meaningUp',
    meaningReversed: 'cards.d14.meaningReversed',
    description: 'cards.d14.description',
  },

  // Coins/Pentacles (Minor Arcana)
  e01: {
    name: 'cards.e01.name',
    meaningUp: 'cards.e01.meaningUp',
    meaningReversed: 'cards.e01.meaningReversed',
    description: 'cards.e01.description',
  },
  e02: {
    name: 'cards.e02.name',
    meaningUp: 'cards.e02.meaningUp',
    meaningReversed: 'cards.e02.meaningReversed',
    description: 'cards.e02.description',
  },
  e03: {
    name: 'cards.e03.name',
    meaningUp: 'cards.e03.meaningUp',
    meaningReversed: 'cards.e03.meaningReversed',
    description: 'cards.e03.description',
  },
  e04: {
    name: 'cards.e04.name',
    meaningUp: 'cards.e04.meaningUp',
    meaningReversed: 'cards.e04.meaningReversed',
    description: 'cards.e04.description',
  },
  e05: {
    name: 'cards.e05.name',
    meaningUp: 'cards.e05.meaningUp',
    meaningReversed: 'cards.e05.meaningReversed',
    description: 'cards.e05.description',
  },
  e06: {
    name: 'cards.e06.name',
    meaningUp: 'cards.e06.meaningUp',
    meaningReversed: 'cards.e06.meaningReversed',
    description: 'cards.e06.description',
  },
  e07: {
    name: 'cards.e07.name',
    meaningUp: 'cards.e07.meaningUp',
    meaningReversed: 'cards.e07.meaningReversed',
    description: 'cards.e07.description',
  },
  e08: {
    name: 'cards.e08.name',
    meaningUp: 'cards.e08.meaningUp',
    meaningReversed: 'cards.e08.meaningReversed',
    description: 'cards.e08.description',
  },
  e09: {
    name: 'cards.e09.name',
    meaningUp: 'cards.e09.meaningUp',
    meaningReversed: 'cards.e09.meaningReversed',
    description: 'cards.e09.description',
  },
  e10: {
    name: 'cards.e10.name',
    meaningUp: 'cards.e10.meaningUp',
    meaningReversed: 'cards.e10.meaningReversed',
    description: 'cards.e10.description',
  },
  e11: {
    name: 'cards.e11.name',
    meaningUp: 'cards.e11.meaningUp',
    meaningReversed: 'cards.e11.meaningReversed',
    description: 'cards.e11.description',
  },
  e12: {
    name: 'cards.e12.name',
    meaningUp: 'cards.e12.meaningUp',
    meaningReversed: 'cards.e12.meaningReversed',
    description: 'cards.e12.description',
  },
  e13: {
    name: 'cards.e13.name',
    meaningUp: 'cards.e13.meaningUp',
    meaningReversed: 'cards.e13.meaningReversed',
    description: 'cards.e13.description',
  },
  e14: {
    name: 'cards.e14.name',
    meaningUp: 'cards.e14.meaningUp',
    meaningReversed: 'cards.e14.meaningReversed',
    description: 'cards.e14.description',
  },

  // Special cards
  z00: {
    name: 'cards.z00.name',
    meaningUp: 'cards.z00.meaningUp',
    meaningReversed: 'cards.z00.meaningReversed',
    description: 'cards.z00.description',
  },
  z01: {
    name: 'cards.z01.name',
    meaningUp: 'cards.z01.meaningUp',
    meaningReversed: 'cards.z01.meaningReversed',
    description: 'cards.z01.description',
  },
};

/**
 * Get card details by filename (without extension)
 */
export function getCardDetails(filename: string): CardDetails | null {
  const key = filename.replace(/\.[^/.]+$/, '');
  return CARD_DETAILS[key] || null;
}

/**
 * Get card details by CardInfo
 */
export function getCardDetailsFromInfo(card: { filename: string }): CardDetails | null {
  return getCardDetails(card.filename);
}
