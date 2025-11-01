import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { validateConfig, config } from './config.js';
import { handleHelloCommand } from './commands/hello.js';
import { handleEchoCommand } from './commands/echo.js';
import { handleHelpCommand } from './commands/help.js';
import { handleDemoCommand } from './commands/demo.js';
import { handleMessage } from './handlers/message.js';
import { registerActionHandlers } from './handlers/action.js';
import { registerEventHandlers } from './handlers/event.js';
import { handleError, log } from './utils.js';
import { COMMANDS } from './constants.js';

// ?????????
dotenv.config();

// ?????
try {
  validateConfig();
} catch (error) {
  if (error instanceof Error) {
    // ????????????????????????
    handleError(error, 'Configuration');
  }
  process.exit(1);
}

// Slack App ????
const app = new App({
  token: config.slack.botToken,
  socketMode: true,
  appToken: config.slack.appToken,
  signingSecret: config.slack.signingSecret,
  logLevel: process.env.NODE_ENV === 'production' ? 'WARN' : 'INFO',
});

// ========== ???????????? ==========
app.command(COMMANDS.HELLO, handleHelloCommand);
app.command(COMMANDS.ECHO, handleEchoCommand);
app.command(COMMANDS.HELP, handleHelpCommand);
app.command(COMMANDS.DEMO, handleDemoCommand);

// ========== ???????????? ==========
registerEventHandlers(app);

// ========== ????????????? ==========
app.message(handleMessage);

// ========== ????????????? ==========
registerActionHandlers(app);

// ========== ????????? ==========
app.error((error) => {
  handleError(error instanceof Error ? error : new Error(String(error)), 'Slack App Error');
});

// ========== ??????? ==========
(async (): Promise<void> => {
  try {
    await app.start(config.port);
    log(`?? Slack Bot ??????? ${config.port} ????????`, 'info');
    log('?????????:', 'info');
    log(`  ${COMMANDS.HELLO} - ???????`, 'info');
    log(`  ${COMMANDS.ECHO} - ?????????`, 'info');
    log(`  ${COMMANDS.HELP} - ??????`, 'info');
    log(`  ${COMMANDS.DEMO} - ?????`, 'info');
  } catch (error) {
    handleError(error instanceof Error ? error : new Error(String(error)), 'Server Start Error');
    process.exit(1);
  }
})();
