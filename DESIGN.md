---
name: Judgify
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  panel-gap: 1px
---

## Brand & Style

The design system is engineered for a high-performance competitive programming environment. It prioritizes technical precision, speed, and cognitive clarity. The aesthetic combines a "Developer-First" utility with a sophisticated, professional finish—moving beyond basic dark modes into a layered, high-fidelity workspace.

The style is **Modern Enterprise / Developer-Centric**. It leverages a high-contrast foundation for long-duration coding sessions, utilizing deep navy and charcoal tones to reduce eye strain. Visual interest is maintained through subtle glassmorphism on floating elements (modals, tooltips) and precise, electric accents that signify action and state transitions. The brand response should be one of "Expertise and Efficiency," making the user feel they are operating within a professional-grade IDE.

## Colors

This design system utilizes a tiered dark-mode palette to create depth without relying solely on heavy shadows. 

- **Primary & Secondary:** Electric Blue (#3B82F6) is the primary driver for critical actions and links. Vibrant Violet (#8B5CF6) is reserved for secondary highlights, such as achievement markers or special user statuses.
- **Surface Strategy:** Use `#0F172A` for the base background (the "canvas") and `#1E293B` for elevated containers like cards, sidebars, and editor panels.
- **Semantic Feedback:** Difficulty levels and test case statuses are strictly enforced:
    - **Emerald (Easy/Pass):** For low-difficulty problems and successful submissions.
    - **Amber (Medium/Warning):** For mid-tier difficulty and time-limit warnings.
    - **Rose (Hard/Fail):** For high-tier difficulty and runtime errors.

## Typography

Typography is split into two distinct functional roles:
1.  **Interface Text:** Uses **Geist** for headlines to provide a sharp, technical character and **Inter** for body copy to ensure maximum readability in information-dense views.
2.  **Technical Text:** Uses **JetBrains Mono** for all code blocks, editor views, terminal outputs, and data-heavy labels. 

Large display titles should use tighter letter-spacing to feel "engineered," while code snippets should maintain standard JetBrains Mono spacing for legibility. Labels (like table headers or metadata) should often be rendered in uppercase JetBrains Mono to distinguish them from user-generated content.

## Layout & Spacing

The design system employs a **Fluid Grid with Panel-Based Layouts**. For the core IDE/Judging experience, a "No-Margin" panel approach is preferred where components are separated by 1px borders or subtle gutters to maximize screen real estate.

- **Grid:** A 12-column system is used for marketing and dashboard pages.
- **Information Density:** Vertical spacing is tight (4px units). Use 8px (2 units) for small gaps and 16px (4 units) for standard component padding.
- **Responsive Behavior:** On mobile, the layout collapses into a single column with a bottom-docked navigation or tab bar for switching between "Problem Description," "Editor," and "Results." On Desktop, use a 3-column split: [Navigation/Files | Editor | Description/Tests].

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Outlines** rather than heavy drop shadows.

- **Level 0 (Canvas):** `#0F172A` - Used for the main background.
- **Level 1 (Surfaces):** `#1E293B` - Used for cards and sidebar panels. These should have a 1px solid border of `rgba(255, 255, 255, 0.1)`.
- **Level 2 (Popovers):** Surface color with a "Glass" effect: `backdrop-filter: blur(12px)` and a slightly lighter border `rgba(255, 255, 255, 0.2)`.
- **Interaction:** Hovering over a card should not move it (no lift); instead, the border color should transition to the Primary Electric Blue.

## Shapes

The shape language is "Soft-Square." It avoids the organic roundness of consumer apps in favor of a more structured, architectural feel. 

- **Cards & Containers:** Use a 8px (`rounded-md`) radius.
- **Buttons & Inputs:** Use a 6px radius to appear slightly sharper than the containers they sit within.
- **Badges:** Use a 4px radius or remain fully square with a 2px radius for a more "terminal" look.

## Components

- **Buttons:** 
  - *Primary:* Solid Electric Blue with white text. 
  - *Secondary:* Ghost style with 1px white/alpha border and hover-fill.
- **Cards:** Background `#1E293B`, 1px border. No shadow. Title in Geist Bold.
- **Badges (Difficulty):** Use a low-opacity background of the semantic color (e.g., Emerald at 10% opacity) with a solid 1px border and high-contrast text.
- **Data Tables:** High-density. Rows separated by 1px `border-subtle`. No zebra striping; use hover highlight in `rgba(255, 255, 255, 0.05)`.
- **Tabs:** Underline style for top-level navigation; "Pill-in-track" style for sub-navigation within panels. 
- **Code Editor:** Ensure a distinct background color (e.g., `#0B1222`) to separate the code environment from the UI. Use a vertical active-line highlight in the gutter.
- **Input Fields:** Dark background (darker than the card surface), subtle inner shadow, and an Electric Blue focus ring.