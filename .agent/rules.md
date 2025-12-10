# Project Rules

## Component Structure
- Each component **MUST** be located in its own dedicated folder within `src/components`.
- The folder name **MUST** match the component name (e.g., `src/components/NavBar`).
- Inside the folder, there **MUST** be two files:
    - `[ComponentName].jsx`
    - `[ComponentName].css`
- **DO NOT** use single-file components or CSS modules unless explicitly requested.

## Styling & Responsiveness
- **Units**: Use `vw` (viewport width), `vh`, `rem`, and `em` for sizing and spacing. Avoid fixed `px` values for layout dimensions.
- **Palette**: Use the following CSS variables defined in global css:
    - `--color-primary: #B87BE2`
    - `--color-secondary: #F59F1B`
    - `--color-tertiary: #47BFC4`
    - `--color-accent: #D85561`
    - `--color-success: #46DD85`
    - `--color-highlight: #FC5520`
    - `--color-white: #ffffff`
    - `--color-black: #000000`
- **Animations**: The site should be full of animations.

## Tech Stack
- **Framework**: React (Vite)
- **Language**: JSX (JavaScript)
- **Styling**: Vanilla CSS (with variables)
