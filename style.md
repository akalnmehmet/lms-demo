# Design System Strategy: The Digital Atelier

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

Unlike standard Learning Management Systems that feel like rigid databases, this system treats digital education as a high-end, curated editorial experience. It rejects the "industrial" look of traditional grids in favor of **Intentional Asymmetry** and **Tonal Depth**. We prioritize breathing room (white space) and sophisticated layering to create an environment that feels authoritative yet inviting. This is not just a tool for consumption; it is a premium space for mastery.

Through the use of **Inter** at extreme scales—from massive, bold display headings to tiny, high-contrast labels—we establish a visual rhythm that guides the eye through complex course data with the ease of a luxury magazine.

---

## 2. Colors & Surface Philosophy
The palette is anchored by the deep authority of **Dark Navy (#1A1A37)** and the kinetic energy of **Vibrant Orange (#FF7E31)**.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning or containment. We define boundaries exclusively through:
1.  **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
2.  **Tonal Transitions:** Using subtle shifts in the neutral scale to indicate a change in context.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `surface` (#fcf9f8).
- **Secondary Areas:** `surface-container-low` (#f6f3f2).
- **Interactive Elements:** `surface-container-lowest` (#ffffff) for maximum "pop."
- **Deep Content Wells:** `surface-container-high` (#eae7e7) for inset or sidebar elements.

### Glass & Gradient Signature
To avoid a flat "template" feel:
- **Floating Navigation:** Use `surface` colors at 80% opacity with a `20px` backdrop-blur (Glassmorphism).
- **Kinetic Gradients:** Primary CTAs should utilize a linear gradient from `primary` (#9e4200) to `primary-container` (#ff7e31) at a 135-degree angle to provide "soul" and depth.

---

## 3. Typography
We utilize **Inter** across all scales. The hierarchy is designed to create an editorial flow, moving from high-impact "Display" levels to highly readable "Body" text.

*   **Display (lg/md/sm):** Used for hero sections and course titles. Use a negative letter-spacing of `-0.02em` for a tighter, premium feel.
*   **Headline (lg/md):** Used for module titles. These are the "anchors" of the page.
*   **Title (md/sm):** Used for card headings and section labels.
*   **Body (lg/md):** Optimized for long-form reading. Use a line height of `1.6` for `body-lg` to ensure the eye doesn't fatigue during long lessons.
*   **Label (md/sm):** Used for metadata (e.g., "12 Lessons", "Intermediate"). Always set in All Caps with `0.05em` letter-spacing for an authoritative, "architectural" look.

---

## 4. Elevation & Depth
Depth is a functional tool, not a decorative one. We move away from structural lines toward **Tonal Layering**.

### The Layering Principle
Achieve elevation by stacking surface tokens. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, soft lift without a single pixel of shadow.

### Ambient Shadows
Where floating depth is required (e.g., Modals, Popovers):
- **Blur:** 40px - 60px.
- **Opacity:** 4% - 8% of the `on-surface` color.
- **Color:** Tint the shadow with a hint of the `secondary` (#5c5b7c) color to prevent it from looking "muddy."

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., high-contrast mode), use a **Ghost Border**: `outline-variant` (#dfc0b2) at 15% opacity. Never use 100% opaque borders.

---

## 5. Components & Interaction

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), 8px border-radius, `label-md` uppercase text.
- **Secondary:** Ghost style. No background, `outline-variant` at 20% for the border, `primary` text.
- **Hover State:** A "lift" effect using a `-4px` Y-axis translation and an ambient shadow.

### Cards (The "Elite" Card)
- **Styling:** `surface-container-lowest` background, 8px border-radius.
- **Interaction:** On hover, the card lifts (`-8px` Y-axis) and the `primary-container` (#FF7E31) appears as a 2px bottom "accent trace."
- **Separation:** Forbid dividers. Use `spacing-8` (2rem) of vertical white space to separate content blocks.

### Input Fields
- **Default:** `surface-container-low` background with a `ghost border`.
- **Focus:** Border transitions to `primary` (#9e4200) at 100% opacity with a subtle `primary-fixed` glow.

### Specialized Components
- **Progress Arc:** Use a custom SVG arc instead of a straight bar for course completion to break the "grid" feel.
- **Floating Lesson Navigator:** A glassmorphic side-rail that utilizes `backdrop-blur` to show the course content underneath as the user scrolls.

### Motion & Transition
- **Page Entry:** Implement a "Soft Reveal." Content blocks must use a `fade-in up` animation (Duration: 600ms, Easing: Cubic-Bezier(0.16, 1, 0.3, 1)).
- **Hover Lift:** All interactive containers must utilize a `200ms` ease-out transition on the transform property.

---

## 6. Do’s and Don’ts

### Do
- **DO** use asymmetry. Shift a text block 1-2 columns off-center to create visual interest.
- **DO** use "Surface Nesting" to define content importance.
- **DO** use `display-lg` typography sparingly for maximum impact.

### Don’t
- **DON’T** use 1px solid black or dark grey borders.
- **DON’T** use standard "Drop Shadows." Only use tinted Ambient Shadows.
- **DON’T** use dividers or horizontal rules to separate list items; use white space (from the `spacing-6` or `spacing-8` tokens).
- **DON’T** crowd the layout. If in doubt, increase the spacing by one tier in the scale.