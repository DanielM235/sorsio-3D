import type { TarotCard } from './TarotCard';
import type { CardOrientation } from './CardOrientation';

/**
 * Represents a card that has been drawn in a reading
 */
export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: number; // Position in the spread
}
