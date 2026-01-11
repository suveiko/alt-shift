import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock OpenAI API for application letter generation
  http.post('https://api.openai.com/v1/chat/completions', async () => {
    // Simulate processing time
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    // Generate a mock improved application letter
    const improvedLetter = `Dear Hiring Team,

I'm excited to apply for this position and believe my background makes me an excellent fit.

My experience and proven skills position me well for this role. I bring both technical expertise and a collaborative approach to problem-solving.

I'm confident my contributions would prove valuable to your organization and look forward to discussing how I can support your team's success.

Thank you for your consideration.

Best regards`;

    return HttpResponse.json(
      {
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
      },
      { status: 200 },
    );
  }),
];
