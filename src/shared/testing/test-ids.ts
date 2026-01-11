/**
 * Centralized test IDs for E2E testing
 * All data-testid values should be defined here to ensure type safety and consistency
 */

// Application Card
const APPLICATION_CARD_PREFIX = 'application-card' as const;

export const APPLICATION_CARD_TEST_IDS = {
  root: APPLICATION_CARD_PREFIX,
  letterContent: `${APPLICATION_CARD_PREFIX}-letter-content`,
  deleteButton: `${APPLICATION_CARD_PREFIX}-delete-button`,
  copyButton: `${APPLICATION_CARD_PREFIX}-copy-button`,
} as const;

// Application Form
const APPLICATION_FORM_PREFIX = 'application-form' as const;

export const APPLICATION_FORM_TEST_IDS = {
  title: `${APPLICATION_FORM_PREFIX}-title`,
  generateButton: `${APPLICATION_FORM_PREFIX}-generate-button`,
  tryAgainButton: `${APPLICATION_FORM_PREFIX}-try-again-button`,
} as const;

// Goal Banner
const GOAL_BANNER_PREFIX = 'goal-banner' as const;

export const GOAL_BANNER_TEST_IDS = {
  root: GOAL_BANNER_PREFIX,
  title: `${GOAL_BANNER_PREFIX}-title`,
  description: `${GOAL_BANNER_PREFIX}-description`,
  createButton: `${GOAL_BANNER_PREFIX}-create-button`,
} as const;

// Page Header
const PAGE_HEADER_PREFIX = 'page-header' as const;

export const PAGE_HEADER_TEST_IDS = {
  title: `${PAGE_HEADER_PREFIX}-title`,
  createButton: `${PAGE_HEADER_PREFIX}-create-button`,
} as const;
