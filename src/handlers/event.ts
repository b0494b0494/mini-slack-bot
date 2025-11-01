import type { App, SlackEventMiddlewareArgs } from '@slack/bolt';
import type { AllMiddlewareArgs } from '@slack/bolt';
import { getHomeTabBlocks } from '../messages.js';
import { handleError } from '../utils.js';
import { validateUserId } from '../utils.js';

/**
 * App Home?????????????????
 */
async function handleAppHomeOpened({ event, client }: SlackEventMiddlewareArgs<'app_home_opened'> & AllMiddlewareArgs): Promise<void> {
  try {
    // ????ID???
    if (!validateUserId(event.user)) {
      return; // ???????ID?????????
    }

    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: getHomeTabBlocks(event.user),
      },
    });
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'App Home Opened');
    // ????????????????
  }
}

/**
 * ????????????????
 */
export function registerEventHandlers(app: App): void {
  app.event('app_home_opened', handleAppHomeOpened);
}
