# Mini Slack Bot - Practice App

A practice Slack bot application for learning Slack Bot development. Built with TypeScript and modular structure, inspired by chrome-extension-playground.

## ?? Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build TypeScript

```bash
npm run build
```

Or development mode (auto-build):

```bash
npm run watch
```

### 3. Create Slack App

1. Go to [Slack API](https://api.slack.com/apps)
2. Click "Create New App"
3. Select "From scratch"
4. Enter App Name and select Workspace

### 4. Configure Bot Token

1. Go to "OAuth & Permissions"
2. Add the following scopes to "Bot Token Scopes":
   - `app_mentions:read`
   - `chat:write`
   - `commands`
   - `users:read`
   - `app_home:read`
   - `app_home:write`
3. Click "Install to Workspace" to install
4. Copy "Bot User OAuth Token"

### 5. Configure App-Level Token (for Socket Mode)

1. Go to "Basic Information" ? "App-Level Tokens"
2. Click "Generate Token and Scopes"
3. Enter Token Name (e.g., `socket-mode-token`)
4. Add `connections:write` scope
5. Copy the Token

### 6. Get Signing Secret

1. Go to "Basic Information" ? "App Credentials"
2. Copy "Signing Secret"

### 7. Configure Slash Commands

1. Go to "Slash Commands"
2. Add the following commands:
   - `/hello` - Description: "Display greeting message"
   - `/echo` - Description: "Echo message"
   - `/help` - Description: "Display help"
   - `/demo` - Description: "Interactive button demo"

### 8. Enable Socket Mode

1. Go to "Socket Mode"
2. Enable "Socket Mode"

### 9. Configure Environment Variables

Copy `.env.example` to `.env` and set your tokens:

```bash
cp .env.example .env
```

Edit `.env` file:

```
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

## ?? Running

```bash
# Build and run
npm run build
npm start

# Development mode (auto-build + run)
npm run watch
# In another terminal
npm start
```

## ?? Features

### Slash Commands

- `/hello` - Display greeting message
- `/echo [text]` - Echo input text
- `/help` - Display help message
- `/demo` - Interactive button demo

### Mention Feature

When you mention the bot and talk to it, it responds to the following keywords:

- "?????", "hello" - Returns greeting
- "?????", "thank" - Returns thanks
- "??", "time" - Displays current time

### Interactions

- Execute actions by clicking buttons
- Customize App Home tab

## ?? Project Structure

Inspired by chrome-extension-playground, modularized with TypeScript:

```
mini-slack-bot/
??? src/
?   ??? app.ts              # Main application file
?   ??? config.ts           # Configuration and environment variables
?   ??? types.ts            # TypeScript type definitions
?   ??? constants.ts        # Constant definitions
?   ??? messages.ts         # Message template management
?   ??? utils.ts            # Utility functions
?   ??? commands/           # Command handlers
?   ?   ??? hello.ts
?   ?   ??? echo.ts
?   ?   ??? help.ts
?   ?   ??? demo.ts
?   ??? handlers/           # Event handlers
?       ??? event.ts        # Event handler
?       ??? message.ts      # Message handler
?       ??? action.ts        # Action handler
??? dist/                   # Build output (auto-generated)
??? tsconfig.json           # TypeScript configuration
??? .env.example            # Environment variable template
??? .gitignore
??? package.json
??? README.md
```

## ??? Architecture Features

### TypeScript

- Full type safety
- Improved development efficiency with type definitions
- Error detection at compile time

### Modularization

- **commands/**: Each slash command managed in separate files
- **handlers/**: Events, messages, and actions categorized
- **messages.ts**: Message templates managed centrally
- **constants.ts**: Constants managed centrally

### Code Reusability

- Message templates managed in `messages.ts`
- Utility functions shared in `utils.ts`
- Configuration managed centrally in `config.ts`

### Extensibility

To add new commands or features:
1. Add new handler file to `commands/`
2. Add message template to `messages.ts`
3. Register handler in `app.ts`
4. Manage type definitions in `types.ts`

## ?? Customization

You can edit each module to add your own commands and features:

- **New command**: Add new file to `src/commands/`
- **New message**: Add template to `src/messages.ts`
- **New event**: Add handler to `src/handlers/`
- **New type**: Add type definition to `src/types.ts`

## ?? Packages Used

### Dependencies
- `@slack/bolt` - Slack Bot framework
- `@slack/logger` - Logging utility
- `@slack/web-api` - Slack Web API client
- `dotenv` - Environment variable management

### Dev Dependencies
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions

## ??? Development Commands

```bash
npm run build    # Build TypeScript
npm run watch    # Watch files and auto-build
npm start        # Start application
npm run dev      # Development mode (watch + start)
npm run clean    # Clean dist directory
```

## ?? References

- [Slack Bolt for JavaScript](https://slack.dev/bolt-js/tutorial/getting-started)
- [Slack API Documentation](https://api.slack.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [chrome-extension-playground](../chrome-extension-playground/) - Reference project

## ?? License

MIT
