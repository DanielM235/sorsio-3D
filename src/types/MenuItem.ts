/**
 * Menu item configuration for navigation
 */
export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Emoji or icon to display */
  icon: string;
  /** Route path to navigate to */
  route: string;
  /** i18n key for the menu item title */
  titleKey: string;
  /** i18n key for the menu item description */
  descKey: string;
}
