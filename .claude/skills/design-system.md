# Skill: Design System

## Overview
Design tokens and component specifications for CareTaker Match. The design prioritizes accessibility for elderly users while maintaining a professional, medical aesthetic.

## Color Palette

### Primary Colors
```css
:root {
  /* Primary - Teal (trust, medical, calm) */
  --color-primary: #0D7377;
  --color-primary-light: #14A3A8;
  --color-primary-dark: #095456;
  
  /* Secondary - Warm gray */
  --color-secondary: #4A5568;
  --color-secondary-light: #718096;
  --color-secondary-dark: #2D3748;
  
  /* Accent - Coral (warmth, action) */
  --color-accent: #E85D4C;
  --color-accent-light: #FC8181;
  --color-accent-dark: #C53030;
  
  /* Semantic */
  --color-success: #38A169;
  --color-warning: #D69E2E;
  --color-error: #E53E3E;
  --color-info: #3182CE;
  
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #F7FAFC;
  --color-gray-100: #EDF2F7;
  --color-gray-200: #E2E8F0;
  --color-gray-300: #CBD5E0;
  --color-gray-400: #A0AEC0;
  --color-gray-500: #718096;
  --color-gray-600: #4A5568;
  --color-gray-700: #2D3748;
  --color-gray-800: #1A202C;
  --color-gray-900: #171923;
  
  /* Background */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F7FAFC;
  --color-bg-dark: #1A202C;
}
```

### Selection States
```css
:root {
  --color-selected-bg: #E6FFFA;
  --color-selected-border: #0D7377;
  --color-hover-bg: #F0FFF4;
  --color-focus-ring: #0D7377;
}
```

## Typography

### Font Stack
```css
:root {
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Font Sizes (Elderly-Optimized)
```css
:root {
  --font-size-xs: 14px;    /* Fine print only */
  --font-size-sm: 16px;    /* Minimum body text */
  --font-size-base: 20px;  /* Default body */
  --font-size-lg: 24px;    /* Emphasis */
  --font-size-xl: 28px;    /* Subheadings */
  --font-size-2xl: 32px;   /* Section headers */
  --font-size-3xl: 40px;   /* Screen titles */
  --font-size-4xl: 48px;   /* Hero text */
}
```

### Font Weights
```css
:root {
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Line Heights
```css
:root {
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

## Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

## Component Specifications

### Large Button (Primary Action)
```css
.button-large {
  min-height: 60px;
  min-width: 200px;
  padding: 16px 32px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-radius: 12px;
  
  /* Touch feedback */
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.button-large:active {
  transform: scale(0.98);
}
```

### Option Card (Selectable)
```css
.option-card {
  min-height: 72px;
  padding: 20px 24px;
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  font-size: var(--font-size-lg);
  background: var(--color-white);
  
  /* Selection state */
  &.selected {
    border-color: var(--color-primary);
    background: var(--color-selected-bg);
    border-width: 3px;
  }
}
```

### Text Input (Large)
```css
.input-large {
  height: 60px;
  padding: 16px 20px;
  font-size: var(--font-size-base);
  border: 2px solid var(--color-gray-300);
  border-radius: 8px;
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.2);
  }
}
```

### Progress Bar
```css
.progress-bar {
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  transition: width 0.3s ease;
}
```

### Question Text
```css
.question-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-8);
}
```

## Layout Constants

```css
:root {
  /* Content area */
  --max-content-width: 600px;
  --content-padding: 32px;
  
  /* Navigation bar */
  --nav-height: 80px;
  
  /* Safe areas (iPad) */
  --safe-area-top: env(safe-area-inset-top, 0px);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
}
```

## Animation

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}

/* Page transitions */
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}
```

## Breakpoints

```css
:root {
  /* iPad-focused breakpoints */
  --bp-tablet-portrait: 768px;
  --bp-tablet-landscape: 1024px;
  --bp-desktop: 1280px;
}
```

## Accessibility

### Focus Styles
```css
*:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
