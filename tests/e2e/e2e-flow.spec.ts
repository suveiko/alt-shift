import { expect, test } from '../fixtures';
import {
  APPLICATION_CARD_TEST_IDS,
  APPLICATION_FORM_TEST_IDS,
  GOAL_BANNER_TEST_IDS,
  PAGE_HEADER_TEST_IDS,
  RoutesPaths,
} from '../test-ids';

test.describe('E2E User Flow with Real API Mocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(RoutesPaths.home);
    await page.evaluate(() => localStorage.clear());
  });

  test('complete user journey: create, view, copy, and delete application', async ({
    page,
  }) => {
    await page.goto(RoutesPaths.home);
    await expect(page.getByTestId(PAGE_HEADER_TEST_IDS.title)).toHaveText(
      'Applications',
    );

    await page.getByTestId(PAGE_HEADER_TEST_IDS.createButton).click();
    await expect(page).toHaveURL(RoutesPaths.newApplication);

    await page.getByLabel(/job title/i).fill('Senior Frontend Developer');
    await page.getByLabel(/company/i).fill('Acme Corporation');
    await page.getByLabel(/I am good at/i).fill('React, TypeScript, Next.js');
    await page.getByLabel(/additional details/i).fill('7 years of experience');

    await expect(
      page.getByTestId(APPLICATION_FORM_TEST_IDS.generateButton),
    ).toBeEnabled();
    await page.getByTestId(APPLICATION_FORM_TEST_IDS.generateButton).click();

    await page.waitForTimeout(1500);
    await expect(
      page.getByTestId(APPLICATION_CARD_TEST_IDS.letterContent),
    ).toContainText('Dear Hiring Team');

    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByTestId(APPLICATION_CARD_TEST_IDS.copyButton).click();

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );

    expect(clipboardText).toContain('Dear Hiring Team');

    await page.goto(RoutesPaths.home);
    await expect(page.getByTestId(PAGE_HEADER_TEST_IDS.title)).toHaveText(
      'Applications',
    );

    await expect(
      page.getByTestId(APPLICATION_CARD_TEST_IDS.letterContent).first(),
    ).toContainText('Dear Hiring Team');

    await page
      .getByTestId(APPLICATION_CARD_TEST_IDS.deleteButton)
      .first()
      .click();

    await expect(
      page.getByTestId(APPLICATION_CARD_TEST_IDS.letterContent),
    ).toHaveCount(0);
  });

  test('create multiple applications', async ({ page }) => {
    for (let index = 1; index <= 3; index++) {
      await page.goto(RoutesPaths.newApplication);

      await page
        .getByRole('textbox', { name: /job title/i })
        .fill(`Job Title ${index}`);
      await page
        .getByRole('textbox', { name: /company/i })
        .fill(`Company ${index}`);
      await page
        .getByRole('textbox', { name: /I am good at/i })
        .fill(`Skill set ${index}`);
      await page
        .getByRole('textbox', { name: /additional details/i })
        .fill(`Details ${index}`);

      await page.getByTestId(APPLICATION_FORM_TEST_IDS.generateButton).click();
      await page.waitForTimeout(1500);
    }

    await page.goto(RoutesPaths.home);

    const cards = page.getByTestId(APPLICATION_CARD_TEST_IDS.root);

    await expect(cards).toHaveCount(3);
  });

  test('navigation between pages works correctly', async ({ page }) => {
    await page.goto(RoutesPaths.home);

    await page.getByTestId(PAGE_HEADER_TEST_IDS.createButton).click();
    await expect(page).toHaveURL(RoutesPaths.newApplication);

    await page.goto(RoutesPaths.newApplication);
    await expect(
      page.getByTestId(APPLICATION_FORM_TEST_IDS.title),
    ).toContainText('New application');
  });

  test('localStorage persistence across page reloads', async ({ page }) => {
    await page.goto(RoutesPaths.home);

    await page.evaluate(() => {
      const mockApplications = [
        {
          id: 'persist-test-1',
          content: 'This should persist after reload',
          jobTitle: 'Test Job',
          company: 'Test Company',
        },
      ];

      localStorage.setItem('applications', JSON.stringify(mockApplications));
    });

    await page.reload();

    await expect(
      page.getByTestId(APPLICATION_CARD_TEST_IDS.letterContent).first(),
    ).toContainText('This should persist after reload');

    await page.goto(RoutesPaths.newApplication);
    await page.goto(RoutesPaths.home);

    await expect(
      page.getByTestId(APPLICATION_CARD_TEST_IDS.letterContent).first(),
    ).toContainText('This should persist after reload');
  });

  test('goal banner updates as applications are created and deleted', async ({
    page,
  }) => {
    await page.goto(RoutesPaths.home);

    await expect(page.getByTestId(GOAL_BANNER_TEST_IDS.title)).toHaveText(
      'Hit your goal',
    );

    await page.evaluate(() => {
      const mockApplications = [
        {
          id: '1',
          content: 'App 1',
          jobTitle: 'Job 1',
          company: 'Company 1',
        },
        {
          id: '2',
          content: 'App 2',
          jobTitle: 'Job 2',
          company: 'Company 2',
        },
      ];

      localStorage.setItem('applications', JSON.stringify(mockApplications));
    });

    await page.reload();

    await expect(page.getByTestId(GOAL_BANNER_TEST_IDS.title)).toHaveText(
      'Hit your goal',
    );

    await page
      .getByTestId(APPLICATION_CARD_TEST_IDS.deleteButton)
      .first()
      .click();

    await expect(page.getByTestId(GOAL_BANNER_TEST_IDS.title)).toHaveText(
      'Hit your goal',
    );
  });
});
