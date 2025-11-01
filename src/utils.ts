/**
 * ?????????
 */

import { MESSAGE_KEYWORDS } from './constants.js';
import type { MessageType } from './types.js';

/**
 * ?????????????
 */
export function detectMessageType(text: string): MessageType {
  const lowerText = text.toLowerCase();
  
  if (MESSAGE_KEYWORDS.GREETING.some(keyword => lowerText.includes(keyword))) {
    return 'greeting';
  }
  
  if (MESSAGE_KEYWORDS.THANKS.some(keyword => lowerText.includes(keyword))) {
    return 'thanks';
  }
  
  if (MESSAGE_KEYWORDS.TIME.some(keyword => lowerText.includes(keyword))) {
    return 'time';
  }
  
  return 'unknown';
}

/**
 * ???????????????????????
 */
export function handleError(error: Error, context: string = ''): void {
  const safeMessage = sanitizeError(error.message);
  const message = context ? `${context}: ${safeMessage}` : safeMessage;
  
  // ??????????????????????????
  const shouldLogStack = process.env.NODE_ENV !== 'production';
  
  console.error('Error:', {
    message,
    ...(shouldLogStack && error.stack ? { stack: sanitizeError(error.stack) } : {}),
    timestamp: new Date().toISOString(),
  });
}

/**
 * ?????????????????
 */
function sanitizeError(errorMessage: string): string {
  let sanitized = errorMessage;
  
  // ?????????????????????????
  sanitized = sanitized.replace(/(SLACK_\w+_TOKEN|SLACK_\w+_SECRET)=[^\s]+/gi, (match) => {
    const [key] = match.split('=');
    return `${key}=***`;
  });
  
  // ????????????????
  sanitized = sanitized.replace(/xox[baprs]-\w+-\w+-\w+/g, 'xoxb-***');
  sanitized = sanitized.replace(/xapp-\w+-\w+-\w+/g, 'xapp-***');
  
  return sanitized;
}

/**
 * ?????
 */
export function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  const timestamp = new Date().toISOString();
  const safeMessage = sanitizeError(message);
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${safeMessage}`;
  
  switch (level) {
    case 'error':
      console.error(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      break;
    default:
      console.log(logMessage);
  }
}

/**
 * ???????????XSS???
 */
export function sanitizeText(text: unknown): string {
  if (typeof text !== 'string') {
    return String(text);
  }
  // Slack?Markdown????????????HTML??????
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;');
}

/**
 * ???????????
 */
export function validateInputLength(text: string, maxLength: number = 1000): boolean {
  if (typeof text !== 'string') {
    return false;
  }
  return text.length <= maxLength;
}

/**
 * ????ID??????
 */
export function validateUserId(userId: string): boolean {
  if (typeof userId !== 'string' || !userId) {
    return false;
  }
  // Slack?????ID??? U ???????
  return /^[UW][A-Z0-9]{8,}$/.test(userId);
}

/**
 * ???????????????????????????
 */
export function isSafeString(text: string): boolean {
  if (typeof text !== 'string') {
    return false;
  }
  
  // ???????????
  if (text.length > 4000) {
    return false;
  }
  
  // ?????????????????
  if (/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/.test(text)) {
    return false;
  }
  
  return true;
}
