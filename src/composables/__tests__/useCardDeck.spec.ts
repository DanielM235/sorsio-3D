import { describe, it, expect, beforeEach } from 'vitest';
import { useCardDeck } from '@/composables/useCardDeck';
import type { TarotCard } from '@/types';

const mockCards: TarotCard[] = [
  {
    id: '0',
    name: 'The Fool',
    nameKey: 'cards.majorArcana.theFool',
    number: 0,
    isMajorArcana: true,
  },
  {
    id: '1',
    name: 'The Magician',
    nameKey: 'cards.majorArcana.theMagician',
    number: 1,
    isMajorArcana: true,
  },
  {
    id: '2',
    name: 'The High Priestess',
    nameKey: 'cards.majorArcana.theHighPriestess',
    number: 2,
    isMajorArcana: true,
  },
];

describe('useCardDeck', () => {
  let cardDeck: ReturnType<typeof useCardDeck>;

  beforeEach(() => {
    cardDeck = useCardDeck(mockCards);
  });

  it('should initialize with all cards in the deck', () => {
    expect(cardDeck.remainingCards.value).toBe(3);
    expect(cardDeck.hasCards.value).toBe(true);
    expect(cardDeck.drawnCards.value).toHaveLength(0);
  });

  it('should draw a card from the deck', () => {
    const drawnCard = cardDeck.drawCard();

    expect(drawnCard).not.toBeNull();
    expect(drawnCard?.card).toBeDefined();
    expect(drawnCard?.orientation).toMatch(/upright|reversed/);
    expect(drawnCard?.position).toBe(0);
    expect(cardDeck.remainingCards.value).toBe(2);
    expect(cardDeck.drawnCards.value).toHaveLength(1);
  });

  it('should return null when drawing from an empty deck', () => {
    cardDeck.drawCard();
    cardDeck.drawCard();
    cardDeck.drawCard();

    const result = cardDeck.drawCard();

    expect(result).toBeNull();
    expect(cardDeck.hasCards.value).toBe(false);
  });

  it('should reset the deck to its initial state', () => {
    cardDeck.drawCard();
    cardDeck.drawCard();

    cardDeck.reset();

    expect(cardDeck.remainingCards.value).toBe(3);
    expect(cardDeck.drawnCards.value).toHaveLength(0);
  });

  it('should shuffle the deck', () => {
    // Shuffle multiple times
    for (let i = 0; i < 10; i++) {
      cardDeck.shuffle();
    }

    // Deck should still have the same number of cards
    expect(cardDeck.remainingCards.value).toBe(3);
  });
});
