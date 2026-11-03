# Quiz App

A simple, interactive quiz web app built with React and Vite. It lets users answer multiple-choice questions, tracks their time and progress, and provides a clear score breakdown with correct answers and explanations at the end.

## Features

- Multiple-choice questions with instant selection
- Live timer and progress bar
- Question navigation to review or jump between questions
- Result summary with score percentage and time taken
- Answer review section showing what you got right or wrong and why
- Clean and responsive interface

## Getting Started

Make sure you have Node.js installed on your machine.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open the link displayed in your terminal (usually `http://localhost:5173`) in your browser.

## Other Scripts

- `npm run build` - Builds the app for production.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Checks code for linting issues.

## How to Add or Edit Questions

All quiz questions live in `src/data/quiz-data.js`. You can add new questions or edit existing ones following this structure:

```js
{
  id: 7,
  question: "What is the capital of Japan?",
  options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
  answer: "Tokyo",
  explanation: "Tokyo is the capital and largest city of Japan.",
  category: "Geography"
}
```

The app will automatically update the total question count, progress bar, and score calculations.

## Tech Stack

- React 18
- Vite
- React Context API for state management
- Pure CSS
