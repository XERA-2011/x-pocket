# X-Pocket

A minimalist web application featuring smooth animations and unified design standards.


## Tech Stack

Modern React application built with **Next.js 15**:

### Core Dependencies
- **React 19.1.0** - UI Framework
- **Next.js 15.4.2** - React application framework with Turbopack support
- **TypeScript 5** - Type Safety

### Styling & UI
- **Tailwind CSS 4** - Styling Framework
- **class-variance-authority ^0.7.1** - Component variant management
- **clsx ^2.1.1** - Conditional className utility
- **tailwind-merge ^3.3.1** - Tailwind class merging utility
- **tailwindcss-animate ^1.0.7** - Animation utility for Tailwind

### Animation Libraries
- **Framer Motion ^12.23.9** - Declarative animations
- **GSAP ^3.13.0** - High-performance animation engine
- **Lenis ^1.3.8** - Smooth scrolling library

### Content & Utilities
- **react-markdown ^10.1.0** - Markdown renderer for React

## Dev Dependencies

- **ESLint ^9.34.0 & eslint-config-next 15.4.2** - Code linting and Next.js specific rules
- **@eslint/eslintrc ^3** - ESLint configuration utilities
- **Sass ^1.90.0** - CSS preprocessor
- **@tailwindcss/postcss ^4** - Tailwind CSS PostCSS plugin
- **TypeScript type definitions**:
  - **@types/node ^20** - Node.js type definitions
  - **@types/react ^19** - React type definitions
  - **@types/react-dom ^19** - React DOM type definitions

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

### UI Components
- **Button Component**: Custom implementation without external dependencies
  - Supports `asChild` prop for polymorphic rendering
  - Uses `class-variance-authority` for variant management

### Common Import Issues & Solutions
- **TypeScript Module Resolution**: If encountering "Cannot find module '@/utils/cn'" errors:
  1. Verify `tsconfig.json` has correct path mapping: `"@/*": ["./src/*"]`
  2. Restart TypeScript server in IDE (Cmd+Shift+P → "TypeScript: Restart TS Server")
  3. Use relative path as fallback: `../../utils/cn`
- **Existing Utilities**: Check `src/utils/` directory before creating new utility functions to avoid duplication

## Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build production application
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint code quality checks