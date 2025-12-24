import type { CardSuit } from './CardSuit';

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
