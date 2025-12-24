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
