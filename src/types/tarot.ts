/**
 * Represents the suits in the Minor Arcana
 */
export type CardSuit = 'wands' | 'cups' | 'swords' | 'coins';

/**
 * Represents a Tarot card
 */
export interface TarotCard {
  id: string;
  name: string;
  nameKey: string; // i18n key for the card name
  number: number;
  suit?: CardSuit; // Only for Minor Arcana
  isMajorArcana: boolean;
  description?: string;
  descriptionKey?: string; // i18n key for description
  imageUrl?: string;
  modelUrl?: string; // 3D model URL if available
}

/**
 * Represents the orientation of a drawn card
 */
export type CardOrientation = 'upright' | 'reversed';

/**
 * Represents a card that has been drawn in a reading
 */
export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: number; // Position in the spread
}

/**
 * Represents a tarot spread layout
 */
export interface TarotSpread {
  id: string;
  name: string;
  nameKey: string;
  positions: SpreadPosition[];
}

/**
 * Represents a position in a spread
 */
export interface SpreadPosition {
  index: number;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  x: number; // 3D position
  y: number;
  z: number;
  rotation?: number; // Optional rotation in radians
}

/**
 * Animation state for cards
 */
export interface CardAnimationState {
  isFlipping: boolean;
  isHovered: boolean;
  isSelected: boolean;
}
