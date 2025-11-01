import { getDemoBlocks } from '../messages.js';
import type { CommandContext } from '../types.js';
import { handleError } from '../utils.js';

/**
 * /demo ??????????
 */
export async function handleDemoCommand({ command, ack, respond }: CommandContext): Promise<void> {
  try {
    await ack();
    await respond({
      blocks: getDemoBlocks(),
    });
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'Demo Command');
  }
}
