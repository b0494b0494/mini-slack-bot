import { getHelloMessage } from '../messages.js';
import type { CommandContext } from '../types.js';
import { handleError } from '../utils.js';
import { validateUserId } from '../utils.js';

/**
 * /hello ??????????
 */
export async function handleHelloCommand({ command, ack, respond }: CommandContext): Promise<void> {
  try {
    await ack();
    
    // ????ID???
    if (!validateUserId(command.user_id)) {
      await respond({
        text: '???: ???????ID???',
        response_type: 'ephemeral',
      });
      return;
    }
    
    await respond({
      text: getHelloMessage(command.user_id),
      response_type: 'in_channel',
    });
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'Hello Command');
    try {
      await respond({
        text: '???????????????????????????????',
        response_type: 'ephemeral',
      });
    } catch {
      // ?????????????????
    }
  }
}
