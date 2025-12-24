import type { SpreadPosition } from './SpreadPosition';

/**
 * Represents a tarot spread layout
 */
export interface TarotSpread {
  id: string;
  name: string;
  nameKey: string;
  positions: SpreadPosition[];
}
