# Judgify Web - Copilot Instructions

Judgify is a competitive programming and online judge web app.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Mock data first

## Product Direction

Judgify is similar in workflow to LeetCode:
- Browse problems
- Filter by difficulty, topic, status
- Read problem statements
- Write code
- Run test cases
- Submit solution
- View submission result

The visual design must be original.

## Implementation Rules

- Use the Stitch AI MCP design as the visual source of truth.
- Implement one screen at a time.
- Prefer reusable components.
- Do not create one huge page file.
- Do not implement backend APIs unless explicitly requested.
- Do not implement authentication unless explicitly requested.
- Use mock data under `src/data`.
- Use TypeScript types for UI data.
- Use Tailwind CSS for styling.
- Keep components small and readable.
- Run build after implementation and fix errors.

## Folder Structure

Use this structure:

```text
src/
  app/
  pages/
  components/
    layout/
    problems/
    editor/
    submissions/
    profile/
  data/
  types/
  lib/