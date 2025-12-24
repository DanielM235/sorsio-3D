import type { Particle } from '@/types/Particle';
import type { DecorativeCard } from '@/types/DecorativeCard';

/**
 * Number of background particles
 */
export const PARTICLE_COUNT = 35;

/**
 * Number of decorative floating cards
 */
export const DECORATIVE_CARD_COUNT = 12;

/**
 * Generate random particles for background effect
 */
export function generateParticles(count: number = PARTICLE_COUNT): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 2,
  }));
}

/**
 * Generate decorative cards positioned around the screen edges
 */
export function generateDecorativeCards(count: number = DECORATIVE_CARD_COUNT): DecorativeCard[] {
  return Array.from({ length: count }, (_, i) => {
    // Distribute cards around the edges of the screen
    const angle = (i / count) * Math.PI * 2;
    const radiusX = 42 + Math.random() * 10; // % from center
    const radiusY = 38 + Math.random() * 10;

    return {
      id: i,
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
      rotation: (Math.random() - 0.5) * 40,
      scale: 0.6 + Math.random() * 0.4,
      delay: i * 0.08,
    };
  });
}

/**
 * Animation timing configuration
 */
export const ANIMATION_TIMING = {
  /** Initial delay before animation starts */
  initialDelay: 0.1,
  /** Duration for particle fade in */
  particleFadeIn: 0.6,
  /** Duration for decorative cards entrance */
  cardEntrance: 1.2,
  /** Duration for title appearance */
  titleAppear: 0.8,
  /** Duration for menu cards entrance */
  menuCardsEntrance: 0.7,
  /** Stagger delay between menu cards */
  menuCardStagger: 0.1,
  /** Duration for exit animations */
  exitDuration: 0.5,
} as const;

/**
 * Easing functions used in animations
 */
export const ANIMATION_EASING = {
  cardEntrance: 'elastic.out(1, 0.6)',
  cardFloat: 'sine.inOut',
  menuCardEntrance: 'back.out(1.7)',
  titleEntrance: 'power3.out',
  exit: 'power2.in',
  particle: 'power2.out',
} as const;
