import { ref, computed } from 'vue';
import type { TarotCard, DrawnCard, CardOrientation } from '@/types';

/**
 * Composable for managing a tarot card deck
 */
export function useCardDeck(cards: TarotCard[]) {
  const deck = ref<TarotCard[]>([...cards]);
  const drawnCards = ref<DrawnCard[]>([]);

  const remainingCards = computed(() => deck.value.length);
  const hasCards = computed(() => deck.value.length > 0);

  /**
   * Shuffles the deck using Fisher-Yates algorithm
   */
  function shuffle(): void {
    const shuffled = [...deck.value];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    deck.value = shuffled;
  }

  /**
   * Draws a card from the top of the deck
   */
  function drawCard(): DrawnCard | null {
    if (!hasCards.value) return null;

    const card = deck.value.pop();
    if (!card) return null;

    const orientation: CardOrientation = Math.random() > 0.5 ? 'upright' : 'reversed';
    const drawnCard: DrawnCard = {
      card,
      orientation,
      position: drawnCards.value.length,
    };

    drawnCards.value.push(drawnCard);
    return drawnCard;
  }

  /**
   * Resets the deck with all cards and clears drawn cards
   */
  function reset(): void {
    deck.value = [...cards];
    drawnCards.value = [];
  }

  return {
    deck,
    drawnCards,
    remainingCards,
    hasCards,
    shuffle,
    drawCard,
    reset,
  };
}
