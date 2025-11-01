# Mini Slack Bot

A practice Slack bot application built with TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)

3. Configure:
   - Bot Token Scopes: `app_mentions:read`, `chat:write`, `commands`, `users:read`, `app_home:read`, `app_home:write`
   - App-Level Token: `connections:write` scope
   - Slash Commands: `/hello`, `/echo`, `/help`, `/demo`
   - Enable Socket Mode

4. Create `.env` file:
```bash
cp .env.example .env
```

Add your tokens to `.env`:
```
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_APP_TOKEN=xapp-your-token
SLACK_SIGNING_SECRET=your-secret
PORT=3000
```

## Run

```bash
npm run build
npm start
```

## Commands

- `/hello` - Greeting message
- `/echo [text]` - Echo input
- `/help` - Show help
- `/demo` - Button demo

## Project Structure

```
src/
??? app.ts          # Main app
??? commands/       # Command handlers
??? handlers/       # Event handlers
??? ...
```

## License

MIT
