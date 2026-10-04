# English AI Teacher

A complete English learning platform with AI-powered teacher experiences for both desktop web and mobile app use.

## Features

- AI grammar correction and explanation
- Vocabulary improvement lessons
- Daily study plan generator
- Conversation practice prompts
- Beginner to advanced levels
- Responsive web app + mobile app
- API-ready backend for integrating OpenAI or other LLMs

## Project structure

- `apps/web` — laptop/web app
- `apps/mobile` — Expo mobile app
- `apps/api` — Express backend for AI teaching logic

## Quick start

```bash
npm install
npm run dev:web
npm run dev:api
```

For mobile:

```bash
npm run dev:mobile
```

## Environment variables

Create `apps/api/.env` with:

```env
PORT=4000
OPENAI_API_KEY=your_key_here
```

## Tech stack

- React + Vite
- Expo / React Native
- Express.js
- OpenAI-compatible API support

## License

MIT
