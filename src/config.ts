import dotenv from 'dotenv';

dotenv.config();

export const config = {
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN || '',
    appToken: process.env.SLACK_APP_TOKEN || '',
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
  },
  port: parseInt(process.env.PORT || '3000', 10),
};

/**
 * ??????????
 */
function validateTokenFormat(token: string, prefix: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  return token.startsWith(prefix);
}

/**
 * ???????
 */
export function validateConfig(): void {
  const required = [
    'SLACK_BOT_TOKEN',
    'SLACK_APP_TOKEN',
    'SLACK_SIGNING_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `?????????????????: ${missing.join(', ')}\n` +
      `.env.example ???? .env ??????????????`
    );
  }

  // ??????????
  const botToken = process.env.SLACK_BOT_TOKEN!;
  const appToken = process.env.SLACK_APP_TOKEN!;

  if (!validateTokenFormat(botToken, 'xoxb-')) {
    throw new Error('SLACK_BOT_TOKEN ?????????????xoxb- ????????????');
  }

  if (!validateTokenFormat(appToken, 'xapp-')) {
    throw new Error('SLACK_APP_TOKEN ?????????????xapp- ????????????');
  }

  // Signing Secret?????????24?????
  const signingSecret = process.env.SLACK_SIGNING_SECRET!;
  if (signingSecret.length < 24) {
    throw new Error('SLACK_SIGNING_SECRET ????????????');
  }
}
