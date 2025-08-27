# X-Pocket

A minimalist web application featuring smooth animations and unified design standards.


## Tech Stack

Modern React application built with **Next.js 15**:

- **React 19** - UI Framework
- **Next.js 15** - React application framework
- **TypeScript 5** - Type Safety
- **Tailwind CSS 4** - Styling Framework
- **Framer Motion** - Animation Library
- **GSAP** - High-performance Animation
- **Lenis** - Smooth Scrolling
- **clsx** - Conditional className utility
- **react-markdown** - Markdown renderer
- **tailwind-merge** - Tailwind class merging utility
- **tailwindcss-animate** - Animation utility for Tailwind

## Dev Dependencies

- **ESLint & eslint-config-next** - Code linting and quality assurance
- **Sass** - CSS preprocessor
- **@types/node, @types/react, @types/react-dom** - TypeScript type definitions

## Design Philosophy

- **Minimalist Interface** - Clean, distraction-free user experience
- **Smooth Animations** - Fluid transitions powered by Framer Motion and GSAP
- **Unified Standards** - Consistent design patterns across all components
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Smooth Scrolling** - Enhanced page navigation with Lenis scroll library

## Design Theme

Unified black and white color scheme:
- Pure black background (`#000000`)
- Pure white text (`#FFFFFF`)
- Opacity variations for visual hierarchy
- Gradients for enhanced visual depth

## Development Guidelines

- Use Tailwind utilities: `bg-black`, `text-white`, `text-white/75`
- CSS custom properties for color variables
- Maintain theme consistency across components
- Interactive elements use only black/white/transparent variations
- Implement responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Consider scroll-triggered animations and viewport transitions
- **Component Naming** - Keep names concise. For section components, use `[Name]Section` (e.g., `GamesSection` not `GamesShowcaseSection`).
- Implement responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Consider scroll-triggered animations and viewport transitions

## Naming Conventions

- **Component Naming**: Keep component names concise and descriptive.
- **Section Components**: For page sections, use the format `[Name]Section`. For example, use `GamesSection` instead of `GamesShowcaseSection`.

## Project Structure & Utilities

### Utility Functions
- **cn Function**: Located at `src/utils/cn.ts` - Use `@/utils/cn` for imports
- Combines `clsx` for conditional class joining and `twMerge` for Tailwind class conflict resolution
- **Important**: Always use `@/utils/cn` instead of creating duplicate utility files in other locations

### Common Import Issues & Solutions
- **TypeScript Module Resolution**: If encountering "Cannot find module '@/utils/cn'" errors:
  1. Verify `tsconfig.json` has correct path mapping: `"@/*": ["./src/*"]`
  2. Restart TypeScript server in IDE (Cmd+Shift+P → "TypeScript: Restart TS Server")
  3. Use relative path as fallback: `../../utils/cn`
- **Existing Utilities**: Check `src/utils/` directory before creating new utility functions to avoid duplication