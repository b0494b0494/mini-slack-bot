import { getHelpMessage } from '../messages.js';
import type { CommandContext } from '../types.js';
import { handleError } from '../utils.js';

/**
 * /help ??????????
 */
export async function handleHelpCommand({ command, ack, respond }: CommandContext): Promise<void> {
  try {
    await ack();
    await respond({
      text: getHelpMessage(),
      response_type: 'ephemeral',
    });
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'Help Command');
  }
}
