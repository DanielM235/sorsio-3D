import type { MenuItem } from '@/types/MenuItem';

/**
 * Main menu navigation items
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'explore',
    icon: '🃏',
    route: '/explore',
    titleKey: 'menu.explore',
    descKey: 'menu.exploreDesc',
  },
  {
    id: 'draw',
    icon: '✨',
    route: '/draw',
    titleKey: 'menu.simpleDraw',
    descKey: 'menu.simpleDrawDesc',
  },
  {
    id: 'resources',
    icon: '📚',
    route: '/resources',
    titleKey: 'menu.resources',
    descKey: 'menu.resourcesDesc',
  },
  {
    id: 'about',
    icon: '💫',
    route: '/about',
    titleKey: 'menu.about',
    descKey: 'menu.aboutDesc',
  },
];
