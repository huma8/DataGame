# DataGame Project - Development Context

## Overview
DataGame is a React-based production planning application that simulates a startup company's manufacturing process. It allows users to plan and queue production of various components and modules with specific resource requirements, time requirements, and worker types. The application is built with React, TypeScript, Tailwind CSS, and uses Lucide React for icons.

## Project Structure
- `build/` - Production build output
- `pics/` - Image assets (contains UI mockups: image.png, image copy.png, image copy 2.png, image copy 3.png)
- `public/` - Public assets (not shown in current listing)
- `src/` - Source code files
  - `App.js` - Main application component
  - `ProductionPlanner.jsx` - Core functionality component (main UI)
  - `uretim-hesaplama.js` - Production engine and calculation functions
  - `index.css` - Tailwind CSS and custom styles
  - `index.js` - React entry point
  - `malzeme-model.ts` - Data model for materials/components
  - `uretim-fonksiyonlari.ts` - Production functions (TypeScript)
  - `uretim-hesaplama.ts` - Production calculation functions (TypeScript)
  - `veritabani-model.ts` - Database model for items
  - `yardimci-fonksiyonlar.ts` - Helper functions
- `process_images.js` - Image processing script for modifying images in the pics folder

## Technology Stack
- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Build Tools**: React Scripts
- **Languages**: JavaScript, TypeScript

## Key Features
- Production queue management with add/remove functionality
- Resource requirements visualization for each item
- Categorization by type (Component/Module) and worker level
- Search and filter capabilities
- Production planning with quantity controls
- Total production time and resource tracking
- Detailed breakdown of production requirements

## UI Enhancements
Recent changes made to the UI include:
- Removal of duplicate search functionality from the items list column
- Increased font size and center-alignment for "Total Time" and "Unique Items" displays
- Enhanced "Production Summary" heading with improved styling
- Better spacing and alignment throughout the interface

## Building and Running
- Install dependencies: `npm install`
- Start development server: `npm start` (runs on http://localhost:3000)
- Build production: `npm run build`
- Run tests: `npm test`

## Configuration Files
- `package.json` - Project metadata, dependencies, and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration with Tailwind and Autoprefixer
- `index.html` - HTML template

## Special Files
- `malzemeler.txt` - Data file for production items (loaded at runtime)

## Development Conventions
- Uses a 4px grid system for consistent spacing
- Custom scrollbar styling with purple gradient
- Hover effects with transform scaling and purple glow
- Responsive design with flexbox and Tailwind utility classes
- Consistent use of backdrop blur effects and glassmorphism
- Minimum readable font sizes with overrides for accessibility

## Image Processing
The project includes an image processing script (`process_images.js`) that can:
- Soften purple/magenta areas in the first 3 images in the pics folder
- Adjust `image copy 3.png` to fill available space properly
- Requires ImageMagick to be installed on the system