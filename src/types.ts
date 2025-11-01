import type { SlackCommandMiddlewareArgs, AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import type { BlockAction, ButtonAction, BlockActionMiddlewareArgs } from '@slack/bolt';
import type { MessageEvent } from '@slack/bolt';

/**
 * ??????
 */
export interface BotConfig {
  slack: {
    botToken: string;
    appToken: string;
    signingSecret: string;
  };
  port: number;
}

/**
 * ??????????
 */
export type CommandContext = SlackCommandMiddlewareArgs & AllMiddlewareArgs;

/**
 * ???????????
 */
export type MessageContext = SlackEventMiddlewareArgs<'message'> & AllMiddlewareArgs;

/**
 * ??????????????? - ??BlockActionMiddlewareArgs????
 */
export type ActionContext = BlockActionMiddlewareArgs<ButtonAction> & AllMiddlewareArgs;

/**
 * ???????
 */
export type CommandType = 'hello' | 'echo' | 'help' | 'demo' | 'unknown';

/**
 * ????????
 */
export type MessageType = 'greeting' | 'thanks' | 'time' | 'unknown';
