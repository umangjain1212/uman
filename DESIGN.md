# Design Brief: Farm72

**Purpose & Tone** | Premium organic e-commerce. Earthy, natural, trustworthy, minimal. Conviction-driven organic green palette with refined typography — anti-generic, specific to cold-pressed oils market.
**Aesthetic** | Organic minimalism: cream background, forest green primary, sage accent, card-based product layout, smooth 250ms transitions, premium shadows with depth hierarchy.

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--primary` | 0.35 0.11 142 | 0.72 0.18 142 | Deep forest green (buttons, nav highlights) |
| `--accent` | 0.62 0.18 142 | 0.70 0.20 142 | Bright sage green (secondary actions, hovers) |
| `--secondary` | 0.65 0.12 142 | 0.52 0.14 142 | Muted green (cards, section headers) |
| `--background` | 0.98 0.01 162 | 0.16 0.04 142 | Cream white / deep forest |
| `--foreground` | 0.25 0.05 142 | 0.95 0.01 162 | Dark green text / cream text |
| `--card` | 1.0 0 0 | 0.22 0.05 142 | White cards / forest green cards |
| `--muted` | 0.92 0.02 162 | 0.28 0.04 142 | Subtle backgrounds (hover, disabled) |
| `--border` | 0.92 0.02 162 | 0.32 0.05 142 | Light dividers / dark dividers |

## Typography

| Role | Font | Weight | Scale | Usage |
|------|------|--------|-------|-------|
| Display | Plus Jakarta Sans | 700 | 32–48px | Headlines, hero title, section titles |
| Body | DM Sans | 400 | 16–18px | Paragraphs, product descriptions, form labels |
| Mono | Geist Mono | 400 | 12–14px | Code, pricing, product SKUs, timestamps |

**Line Height**: 1.6 (body), 1.2 (display). **Letter Spacing**: -0.01em (headlines), normal (body).

## Elevation & Depth

| Shadow | Light | Dark | Usage |
|--------|-------|------|-------|
| `shadow-card` | 0 4px 16px oklch(0.25 0.05 142 / 0.08) | 0 4px 16px oklch(0.25 0.05 142 / 0.08) | Product cards, form inputs, default elevation |
| `shadow-card-hover` | 0 12px 32px oklch(0.25 0.05 142 / 0.12) | 0 12px 32px oklch(0.25 0.05 142 / 0.12) | Hover state on cards and buttons |
| `shadow-elevated` | 0 20px 48px oklch(0.25 0.05 142 / 0.15) | 0 20px 48px oklch(0.25 0.05 142 / 0.15) | Modals, dropdowns, toast notifications |

## Structural Zones

| Zone | Background | Border | Treatment | Purpose |
|------|-----------|--------|-----------|---------|
| Header (sticky) | `bg-card` (light: white / dark: forest green 0.22) | `border-b border-border` | Shadow lift on scroll (0 4px 12px) | Navigation, logo, cart, search |
| Hero Section | `bg-primary` + image overlay | None | 60vh height, dark overlay (0.5 opacity), centered text | Hero carousel with call-to-action |
| Product Grid | `bg-background` | None | `grid gap-6` (light: cream / dark: dark forest) | Card-based product display, 3–4 cols desktop, responsive mobile |
| Product Card | `bg-card border border-border shadow-card` | `border-primary/20` on hover | Rounded-lg, smooth hover lift (+shadow-card-hover) | Image, title, price, description, CTA |
| Form Sections | `bg-muted/30` | `border-border` | Rounded-lg padding-6 | Contact forms, checkout inputs |
| Footer | `bg-primary` | `border-t border-primary/30` | Text: `text-primary-foreground`, centered | Links, contact, newsletter signup |

## Spacing & Rhythm

- **Container**: max-w-6xl, px-4 (mobile), px-6 (tablet+)
- **Vertical gaps**: 3rem (section to section), 2rem (card groups), 1rem (components within cards)
- **Horizontal gaps**: 1.5rem (grid columns), 1rem (form fields)
- **Padding**: Card = p-6, Section = py-16 px-4

## Component Patterns

**Buttons**: `btn-primary`, `btn-secondary`, `btn-accent` — inline-flex, center content, px-6 py-3, font-medium text-sm, rounded-lg, smooth transition, hover shadow lift, active scale-95.
**Form Inputs**: bg-input (light: cream / dark: forest green 0.28), border-border, rounded-md, px-4 py-2, focus ring-primary outline-none transition-smooth.
**Product Cards**: max-w-sm, overflow-hidden, rounded-lg, shadow-card, image-first, title (font-display font-bold text-lg), description (text-muted-foreground text-sm), price (font-mono font-bold text-primary), "Add to Cart" button.
**Header Nav Links**: text-foreground hover:text-primary transition-smooth, no underline default, underline on active state.

## Motion & Animation

- **Default transition**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) (`transition-smooth`)
- **Hover entrance**: fade-in 0.3s ease-out + slide-up 0.3s ease-out (cards, product images)
- **Button interactions**: scale-95 on active, shadow-card-hover on hover (250ms)
- **Carousel slides**: fade 0.5s ease-in-out (3–4 second dwell per slide)
- **Form submission**: fade-in 0.3s ease-out for success toast

## Constraints & Anti-Patterns

- ❌ No rainbow gradients, no generic Tailwind shadows
- ❌ No rounded-full borders (use rounded-lg max)
- ❌ No opacity-50 text color—use semantic tokens only
- ❌ No arbitrary color values—all OKLCH via CSS variables
- ✅ Organic green hue (142°) throughout palette, OKLCH chroma 0.11–0.20 max (muted, not vibrant)
- ✅ Typography pairs: Plus Jakarta Sans + DM Sans (distinctive, premium)
- ✅ Shadows tied to green primary, not generic greys
- ✅ Card-first layout — every section deserves intentional elevation treatment

## Signature Detail

**Product card hover choreography**: On hover, image scales 1.05 (250ms), shadow lifts to shadow-card-hover, price text color shifts primary → accent (250ms), "Add to Cart" button becomes fully opaque and lifts (+2px shadow). Entire sequence is orchestrated, not random micro-animations.

## Dark Mode

Intentional dark palette: background `0.16 0.04 142` (deep forest), card `0.22 0.05 142` (slightly lighter forest), text `0.95 0.01 162` (cream). All OKLCH green hue 142° maintained across light/dark for brand coherence. Shadows remain same OKLCH, system respects prefers-color-scheme.

