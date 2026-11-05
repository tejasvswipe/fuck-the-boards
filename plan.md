# Board Sprint — implementation plan

## Product scope

Board Sprint is a responsive, two-person CBSE Class 10 study room built around a shared 15-day board-exam sprint. Both students see the same syllabus, but completion stays independent per student. The first usable release will make the core loop feel complete in the browser: review the sprint dashboard, open today’s tasks, search/filter the syllabus, mark owned chapters complete, compare individual progress, and message the other student in a private chat.

The product brief calls for user accounts, a private room, an invite/link flow, profiles, a shared syllabus, a 15-day planning system, a chat with activity/unread states, automatic remaining-task calculation, and separate student completion records. The website ships with the complete verified curriculum catalogue and local state for immediate progress and chat interactions; the existing Server + Database project foundation remains available for persistence/auth integration.

## Design direction

### Design movement

Calm coffee-house editorial: warm paper neutrals, espresso ink, soft blush, and restrained terracotta accents create a focused study atmosphere without feeling like a generic productivity SaaS dashboard.

### Core principles

1. **Warm focus** — use generous breathing room, soft surfaces, and a clear visual rhythm so the page feels like a quiet desk beside a café window.
2. **Shared, not crowded** — make the common sprint visible while keeping each student’s lane visually distinct.
3. **Progress with tactility** — use coffee-ring progress arcs, pill statuses, and softly lifted cards instead of loud data-viz chrome.
4. **Make the next action obvious** — today’s tasks and one primary CTA should always have the strongest contrast.

### Color philosophy

The base is creamy oat paper (`#f7f1eb`) with espresso ink (`#2f2622`) for trust and legibility. Pastel pink (`#f2c9cf`) owns the brand: it highlights the shared study room, completion, and friendly moments. Roasted coffee brown (`#6c4b3b`) grounds the interface, while pistachio and apricot accents distinguish statuses without turning the app into a rainbow.

### Layout paradigm

A quiet left rail anchors the experience while the content canvas is editorial and asymmetrical: a dark coffee hero block, a large progress surface, and a slim stack of supporting stats. On smaller screens, the rail becomes a bottom navigation strip and the layout collapses into a single scroll with the hero staying first.

### Signature elements

- A rounded espresso hero card with a tiny orbiting “15 DAYS” stamp and a blush action button.
- Progress rings drawn like gentle coffee-cup gauges, with the student initials sitting inside.
- Fine dotted rules, soft paper cards, and little “study note” labels that make the app feel like an annotated desk planner.

### Interaction philosophy

Every action should feel reversible and low-pressure. Buttons use language like “Open today’s tasks” and “Send a note”, and completion updates are immediate with a gentle visual shift. Filters are compact and readable. Chat keeps the other student present through activity snippets instead of demanding constant context switching.

### Animation

Keep motion short and soft: cards rise 2–4px on hover, progress arcs ease over 450ms, checked task rows fade their label weight, and the hero action gets a subtle 2px pulse once on page load. Avoid looping decorative motion that competes with studying.

### Typography system

Use Fraunces for expressive display headings and DM Sans for UI/body copy. Headings are sentence case, slightly tight, and never all caps except for tiny eyebrow labels. Body copy is 14–16px with generous line height. Numbers use tabular spacing where possible so progress can be scanned quickly.

### Brand essence

**Board Sprint is the warm, shared study desk for two students who want to finish the syllabus together without losing their own pace.** Personality: steady, encouraging, quietly optimistic.

### Brand voice

Headlines sound like a friend setting the table: “Let’s finish the syllabus.” CTAs are direct but kind: “Open today’s tasks” and “Send a note”. Avoid productivity clichés and empty “get started” language.

### Wordmark & logo

The wordmark uses the stacked idea of a little board card and a sprint line: “board” set in Fraunces with a blush underline that curls into a small coffee steam mark, while “sprint” sits in compact DM Sans below.

### Signature brand color

Pastel blush `#f2c9cf` — the recognizable shared-room color, used for the hero action, selected navigation, and completion highlights.

## Implementation approach

- Build the first release in the existing React/Vite client with TypeScript and the existing icon library.
- Keep feature state local for this first visual/product pass: active section, search/filter state, toggled task completion, and chat messages.
- Structure the main page into reusable content sections in one page module now; split to route-level modules when persistence/auth is connected.
- Preserve the prepared Express/tRPC/Drizzle foundation and the managed server/database resources for the next pass.
- Add the required static `/manus-routes.json` manifest for `/`, `/chat`, `/syllabus`, and `/progress` even though the prototype uses a single app shell.
- Start the existing `pnpm dev` service on port 3000, verify health/manifest/preview, run `pnpm check` and `pnpm build`, then save a checkpoint.

## Project structure

- `client/src/pages/Home.tsx` — responsive shell, seeded sprint data, dashboard views, and interaction state.
- `client/src/index.css` — coffee/pastel design tokens, typography, responsive layout, component styling, and motion.
- `client/src/App.tsx` — route shell; keeps the home app available at the root.
- `public/manus-routes.json` — page route declaration for the preview/published app.
- `server/` and `drizzle/` — prepared backend/database foundation, left intact for persistence and auth integration.
