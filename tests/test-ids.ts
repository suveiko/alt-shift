/**
 * Re-export test ID constants for use in E2E tests
 * This ensures tests use the same type-safe constants as components
 */
export {
  APPLICATION_CARD_TEST_IDS,
  APPLICATION_FORM_TEST_IDS,
  GOAL_BANNER_TEST_IDS,
  PAGE_HEADER_TEST_IDS,
} from '../src/shared/testing';

/**
 * Re-export route paths for use in E2E tests
 */
export { RoutesPaths } from '../src/shared/routing';
