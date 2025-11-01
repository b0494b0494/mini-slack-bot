import type { App, BlockActionMiddlewareArgs, AllMiddlewareArgs } from '@slack/bolt';
import type { ButtonAction } from '@slack/bolt';
import { getButtonResponseMessage } from '../messages.js';
import { ACTION_IDS } from '../constants.js';
import { handleError, isSafeString } from '../utils.js';

/**
 * ??????????????????
 */
async function handleButtonClick({ action, ack, respond }: BlockActionMiddlewareArgs<ButtonAction> & AllMiddlewareArgs): Promise<void> {
  try {
    await ack();
    
    if (!('value' in action) || !action.value) {
      return;
    }

    const value = action.value as string;
    
    // ??????????
    if (!isSafeString(value)) {
      await respond({
        text: '???: ???????',
        replace_original: false,
      });
      return;
    }

    const message = getButtonResponseMessage(value);
    
    await respond({
      text: message,
      replace_original: false,
    });
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'Button Click Handler');
    try {
      await respond({
        text: '???????????',
        replace_original: false,
      });
    } catch {
      // ?????????????????
    }
  }
}

/**
 * ???????????????????
 */
export function registerActionHandlers(app: App): void {
  app.action(ACTION_IDS.BUTTON_CLICK, handleButtonClick);
}
