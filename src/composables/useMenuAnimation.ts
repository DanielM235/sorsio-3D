import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { ANIMATION_TIMING, ANIMATION_EASING } from '@/constants/animationConfig';
import type { Particle } from '@/types/Particle';
import type { DecorativeCard } from '@/types/DecorativeCard';

/**
 * Composable for menu page animations
 */
export function useMenuAnimation(
  particles: Particle[],
  decorativeCards: DecorativeCard[],
  containerRef: Ref<HTMLElement | null>
) {
  const router = useRouter();
  const isReady = ref(false);

  let mainTimeline: gsap.core.Timeline | null = null;
  const floatingAnimations: gsap.core.Tween[] = [];

  /**
   * Initialize all animations on mount
   */
  function initAnimations(): void {
    mainTimeline = gsap.timeline({
      delay: ANIMATION_TIMING.initialDelay,
    });

    // Set initial states
    setInitialStates();

    // Build animation sequence
    buildEntranceAnimation();

    // Start continuous ambient animations
    startAmbientAnimations();
  }

  /**
   * Set initial hidden states for all animated elements
   */
  function setInitialStates(): void {
    // Particles - scattered and invisible
    gsap.set('.particle', {
      opacity: 0,
      scale: 0,
    });

    // Decorative cards - hidden and scaled down
    gsap.set('.decorative-card', {
      opacity: 0,
      scale: 0,
      rotation: (i) => (decorativeCards[i]?.rotation ?? 0) - 180,
    });

    // Title elements
    gsap.set('.app-title', {
      opacity: 0,
      y: -40,
      scale: 0.9,
    });

    gsap.set('.app-subtitle', {
      opacity: 0,
      y: -20,
    });

    // Menu cards
    gsap.set('.menu-card', {
      opacity: 0,
      y: 80,
      scale: 0.7,
      rotateX: -20,
    });
  }

  /**
   * Build the main entrance animation sequence
   */
  function buildEntranceAnimation(): void {
    if (!mainTimeline) return;

    mainTimeline
      // Phase 1: Particles burst in from random positions
      .to('.particle', {
        opacity: (i) => particles[i]?.opacity ?? 0.2,
        scale: 1,
        duration: ANIMATION_TIMING.particleFadeIn,
        stagger: {
          each: 0.015,
          from: 'random',
        },
        ease: ANIMATION_EASING.particle,
      })

      // Phase 2: Decorative cards spiral in from edges
      .to(
        '.decorative-card',
        {
          opacity: 0.7,
          scale: (i) => decorativeCards[i]?.scale ?? 0.8,
          rotation: (i) => decorativeCards[i]?.rotation ?? 0,
          duration: ANIMATION_TIMING.cardEntrance,
          stagger: {
            each: 0.06,
            from: 'edges',
          },
          ease: ANIMATION_EASING.cardEntrance,
        },
        '-=0.3'
      )

      // Phase 3: Title drops in with impact
      .to(
        '.app-title',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_TIMING.titleAppear,
          ease: ANIMATION_EASING.titleEntrance,
        },
        '-=0.8'
      )

      // Subtitle follows
      .to(
        '.app-subtitle',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // Phase 4: Menu cards fan in
      .to(
        '.menu-card',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: ANIMATION_TIMING.menuCardsEntrance,
          stagger: {
            each: ANIMATION_TIMING.menuCardStagger,
            from: 'center',
          },
          ease: ANIMATION_EASING.menuCardEntrance,
          onComplete: () => {
            isReady.value = true;
            startFloatingAnimations();
          },
        },
        '-=0.3'
      );
  }

  /**
   * Start continuous ambient particle animations
   */
  function startAmbientAnimations(): void {
    // Particles drift slowly
    gsap.to('.particle', {
      y: '-=20',
      x: (i) => (i % 2 === 0 ? '+=8' : '-=8'),
      duration: 'random(5, 10)',
      ease: ANIMATION_EASING.cardFloat,
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.2,
        from: 'random',
      },
    });
  }

  /**
   * Start floating animations for interactive elements
   */
  function startFloatingAnimations(): void {
    // Decorative cards gentle float
    const decorCards = document.querySelectorAll('.decorative-card');
    decorCards.forEach((card, i) => {
      floatingAnimations.push(
        gsap.to(card, {
          y: '-=12',
          x: i % 2 === 0 ? '+=5' : '-=5',
          rotation: `+=${(Math.random() - 0.5) * 8}`,
          duration: 3 + Math.random() * 2,
          ease: ANIMATION_EASING.cardFloat,
          yoyo: true,
          repeat: -1,
        })
      );
    });

    // Menu cards subtle hover
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, i) => {
      floatingAnimations.push(
        gsap.to(card, {
          y: '-=4',
          duration: 2 + i * 0.2,
          ease: ANIMATION_EASING.cardFloat,
          yoyo: true,
          repeat: -1,
        })
      );
    });
  }

  /**
   * Navigate to a route with exit animation
   */
  function navigateTo(route: string): void {
    if (!isReady.value) return;

    // Kill floating animations
    floatingAnimations.forEach((anim) => anim.kill());

    const exitTimeline = gsap.timeline({
      onComplete: () => {
        router.push(route);
      },
    });

    exitTimeline
      // Menu cards fly out
      .to('.menu-card', {
        y: -50,
        opacity: 0,
        scale: 0.8,
        stagger: 0.04,
        duration: ANIMATION_TIMING.exitDuration,
        ease: ANIMATION_EASING.exit,
      })
      // Decorative cards scatter
      .to(
        '.decorative-card',
        {
          scale: 0,
          opacity: 0,
          rotation: '+=90',
          stagger: {
            each: 0.02,
            from: 'random',
          },
          duration: 0.4,
          ease: ANIMATION_EASING.exit,
        },
        '-=0.3'
      )
      // Title fades
      .to(
        ['.app-title', '.app-subtitle'],
        {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: ANIMATION_EASING.exit,
        },
        '-=0.3'
      )
      // Container fades
      .to(
        containerRef.value,
        {
          opacity: 0,
          duration: 0.2,
        },
        '-=0.1'
      );
  }

  /**
   * Cleanup all animations
   */
  function cleanup(): void {
    mainTimeline?.kill();
    floatingAnimations.forEach((anim) => anim.kill());
    gsap.killTweensOf('.menu-card');
    gsap.killTweensOf('.decorative-card');
    gsap.killTweensOf('.particle');
    gsap.killTweensOf('.app-title');
    gsap.killTweensOf('.app-subtitle');
  }

  onMounted(() => {
    initAnimations();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    isReady,
    navigateTo,
  };
}
