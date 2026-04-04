# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Build to dist/
npm run preview  # Preview production build
```

No test framework is configured. Manual testing is done via the browser. The file `test_toggle.js` is a standalone Node script for debugging task toggling logic (`node test_toggle.js`).

## Architecture

This is a **single-file web application** (~8,000 lines in `index.html`). All HTML, CSS, and JavaScript live in one file. There is no framework, no component library, and no build-time code splitting.

### File Structure

- `index.html` — The entire application (HTML structure, `<style>` block, `<script>` block)
- `vite.config.js` — Minimal Vite config (output to `dist/`)
- `test_toggle.js` — Standalone debug script for task completion/repeat logic

### Single External Dependency

Chart.js loaded via CDN (`cdn.jsdelivr.net/npm/chart.js`) for radar charts and bar charts. Everything else is vanilla JS/CSS.

### Application Purpose

A gamified task/habit tracker themed as "Solo Leveling" (我獨自升級). Players earn EXP, gold, and level up 8 RPG attributes (Strength, Intelligence, Agility, Vitality, Charisma, Dexterity, Luck, Willpower) by completing real-life tasks. Features include a Pomodoro focus timer, shop/inventory system, badge collection, achievement tracking, journal/reflections, and a GitHub-style activity heatmap.

### State Management

A single global `state` object holds all application data. It is persisted to `localStorage` under the key `sl_data`. The `saveState()` function serializes `state` to localStorage and must be called after any mutation.

The `defaultState` object (~line 1779) defines the complete data schema. Data migration logic (~lines 1858-1939) handles schema evolution when new properties are added.

### Rendering Pattern

Page-based SPA routing via a `switchTab(tab)` function that sets `currentTab` and calls `render()`. The `render()` function dispatches to page-specific render functions (e.g., `renderTasksPage()`, `renderFocusPage()`, `renderStorePage()`) that replace the innerHTML of `#app-content`.

There are 12 views: tasks, focus, projects, store, badges, achievements, status, activity, statistics, reflections, patch, and settings (modal-based).

### UI Approach

- **Glassmorphism design** with CSS variables for theming (4 themes: purple default, pink, green, orange)
- Theme variables defined in `:root` and `body[data-theme="..."]` selectors
- All modals are defined in the HTML body and shown/hidden via JS

### Language

The UI is in **Traditional Chinese (zh-TW)**. Code comments, variable names, and function names are in English.

## Key Patterns to Preserve

- All state mutations must be followed by `saveState()` and then `render()` (or the relevant render function)
- Task completion triggers attribute/skill EXP rewards, gold rewards, and activity log entries
- Repeating tasks spawn a cloned next-occurrence task when completed (via `spawnedNext` flag)
- The "🔥當日小任務" (daily focus task) has special handling — it auto-repeats daily even without an explicit repeat setting
- Shop items have tier badges (Bronze, Silver, Gold, Platinum, Diamond) with gradient CSS styling
- Deployed to Vercel
