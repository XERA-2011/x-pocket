---
description: Design requirements and UI specifications for web frontend and mini-program pages
globs: ["**/*.css", "**/*.scss", "**/*.less", "**/*.wxml", "**/*.vue", "**/*.jsx", "**/*.tsx"]
alwaysApply: false
---

# Design Requirements

## Core Design Principles

This project follows a strict black and white theme system with minimalist aesthetics. All UI elements must adhere to the following design standards:

### Color System

#### Base Colors
- **Pure Black**: `#000000` - Primary background color
- **Pure White**: `#ffffff` - Primary foreground color (text, borders)

#### Opacity Variants
**Black Opacity Series**:
- `rgba(0, 0, 0, 0.9)` - 90% Black
- `rgba(0, 0, 0, 0.75)` - 75% Black  
- `rgba(0, 0, 0, 0.5)` - 50% Black
- `rgba(0, 0, 0, 0.25)` - 25% Black
- `rgba(0, 0, 0, 0.1)` - 10% Black

**White Opacity Series**:
- `rgba(255, 255, 255, 0.9)` - 90% White
- `rgba(255, 255, 255, 0.75)` - 75% White
- `rgba(255, 255, 255, 0.5)` - 50% White
- `rgba(255, 255, 255, 0.25)` - 25% White
- `rgba(255, 255, 255, 0.1)` - 10% White

#### Semantic Color Mapping
```css
--color-background: #000000;
--color-foreground: #ffffff;
--color-surface: rgba(0, 0, 0, 0.9);
--color-border: rgba(255, 255, 255, 0.25);
--color-hover: rgba(255, 255, 255, 0.1);
```

### Animation and Transitions

The project emphasizes smooth, seamless animations and transitions to enhance the minimalist content presentation. All interactions should feature fluid motion that feels natural and unobtrusive.

### Typography

Use clean, sans-serif fonts for optimal readability. Maintain consistent typography hierarchy with appropriate sizing and spacing to support the minimalist aesthetic.

### Layout

Adopt a clean, uncluttered layout with ample whitespace. Use grids and alignment to create visual harmony while maintaining simplicity.

### Component Style Guidelines

#### Interactive Elements
- **Default State**: Black background, white text/borders
- **Hover State**: Semi-transparent white overlay
- **Active State**: Color inversion or increased opacity
- **Focus State**: White border with opacity

#### Cards and Surfaces
- **Background**: Pure black or semi-transparent black
- **Border**: Semi-transparent white
- **Shadows**: Black with varying opacity

### Implementation Requirements

#### CSS Custom Properties
Use CSS custom properties for color management to ensure global consistency:

```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  /* Other opacity variants... */
}
```

#### Tailwind CSS Integration
Use an extended Tailwind color palette that aligns with custom properties.

#### Browser Compatibility
- Provide fallback values for CSS custom properties
- Progressive enhancement for advanced features
- Graceful degradation in older browsers

### Prohibited Items

1. **No non-black/white color schemes**
2. **No gray colors** - Use opacity variants instead
3. **No hardcoded color values** - Must use CSS custom properties
4. **No colored icons or decorative elements**

### Quality Assurance

#### Development Checks
- Automated color compliance checking
- Contrast validation (accessibility)
- Visual regression testing

#### Manual Validation
- Page-by-page visual inspection
- Interactive state testing
- Cross-browser compatibility verification

### Best Practices

1. **Prefer opacity over gray colors**
2. **Maintain maximum contrast** (pure black with pure white)
3. **Use CSS custom properties consistently**
4. **Use gradients only for visual enhancement**
5. **Ensure consistency across all interactive states**