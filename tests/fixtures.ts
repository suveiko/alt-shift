import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Mock OpenAI API before each test
    await page.route(
      (url) => url.pathname.includes('/v1/chat/completions'),
      async (route) => {
        // Simulate processing time
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });

        const improvedLetter = `Dear Hiring Team,

I'm excited to apply for this position and believe my background makes me an excellent fit.

My experience and proven skills position me well for this role. I bring both technical expertise and a collaborative approach to problem-solving.

I'm confident my contributions would prove valuable to your organization and look forward to discussing how I can support your team's success.

Thank you for your consideration.

Best regards`;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'chatcmpl-mock',
            object: 'chat.completion',
            created: Date.now(),
            model: 'gpt-5-mini',
            choices: [
              {
                index: 0,
                message: {
                  role: 'assistant',
                  content: improvedLetter,
                },
                finish_reason: 'stop',
              },
            ],
            usage: {
              prompt_tokens: 100,
              completion_tokens: 50,
              total_tokens: 150,
            },
          }),
        });
      },
    );

    await use(page);
  },
});

export { expect } from '@playwright/test';
