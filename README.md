# Emoji Memory Game

A fast React + Vite memory game where your goal is to click each emoji only once without repetition.

## Demo

The app is automatically deployed to GitHub Pages on pushes to `main`.

## Features

- Multiple difficulty levels: Easy (5), Normal (10), Hard (15), and Custom
- Best score tracking
- Responsive grid with card shuffling after each click
- API-powered emoji media via GIPHY

## Tech

- React 18
- Vite 5
- ESLint
- GitHub Actions + GitHub Pages deployment

## Setup

```bash
npm install
npm run dev           # dev server
npm run build         # production build
npm run preview       # preview built app
npm run lint          # check code style
```

## How to play

1. Pick a difficulty
2. Click emoji cards you haven't seen before
3. Cards shuffle after each click
4. Clicking the same emoji twice ends the game
5. Click all emojis to win

## License

MIT