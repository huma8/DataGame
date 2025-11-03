# DataGame - Production Planning Application

## Overview

DataGame is an interactive production planning application that simulates a startup company's manufacturing process. Plan and queue production of various components and modules, each with specific resource requirements, time requirements, and worker types.

This application is designed for educational purposes to demonstrate:
- Production planning and resource management concepts
- Dependency management in manufacturing/development
- Supply chain visualization
- React and TypeScript development

## Features

- **Production Queue Management**: Add, remove, and track items in the production queue
- **Resource Requirements**: Each item shows required components/resources
- **Categorization**: Items are categorized by type (Component/Module) and worker level (Designer/Developer/Lead Developer)
- **Search & Filter**: Find specific items by name or category
- **Production Planning**: Visual interface to plan and track production runs
- **Quantity Controls**: Specify how many of each item to produce
- **Total Production Tracking**: Comprehensive summary of all produced items and their quantities
- **Detailed Breakdown**: Shows production requirements in a hierarchical view

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript for backend logic
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library

## Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. The application will be available at http://localhost:3000

## Usage

1. Browse through the available components and modules
2. Use the search bar and filters to find specific items
3. Specify the quantity you want to produce using the quantity controls
4. Click the "+" button next to an item to add it to your production queue
5. Review the total production time and required resources
6. Monitor the total production summary for all items in the queue

## Project Structure

- `src/App.js`: Main application component
- `src/ProductionPlanner.jsx`: Core functionality component
- `src/uretim-fonksiyonlari.ts`: Production engine and functions (TypeScript)
- `src/veritabani-model.ts`: Database model for items (TypeScript)
- `src/malzeme-model.ts`: Data model for materials/components (TypeScript)
- `src/yardimci-fonksiyonlar.ts`: Helper functions for various operations (TypeScript)

## Production Process

The application simulates a production process where:
1. Complex modules require simpler components
2. Each item has a specific production time
3. Different worker types are required for different items
4. Resource dependencies are calculated recursively
5. Total production time accounts for all dependencies

## Data Model

Items in the application include:
- Name
- Production time (in hours)
- Required worker type and level
- Resource requirements (other components needed)
- Category (component/module) and type (designer/developer/lead)
- Icon

## Educational Value

This application serves as a practical example of:
- Resource planning and management
- Dependency tracking in manufacturing
- Component-based architecture in React
- TypeScript integration with React applications
- Production workflow visualization

## Architecture

### Main Components

- `src/App.js`: Main application component
- `src/ProductionPlanner.jsx`: Core functionality component (recently updated)
- `src/uretim-fonksiyonlari.ts`: Production engine and functions (TypeScript)
- `src/veritabani-model.ts`: Database model for items (TypeScript)
- `src/malzeme-model.ts`: Data model for materials/components (TypeScript)
- `src/yardimci-fonksiyonlar.ts`: Helper functions for various operations (TypeScript)

### Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript for backend logic
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library
- **React Scripts**: Build and development tools

## Building and Running

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode**:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## Development Conventions

### React Component Structure

- Functional components with React Hooks
- TypeScript interfaces where appropriate
- Tailwind CSS for styling (with some custom CSS in index.css)
- Lucide icons for UI elements

### State Management

- React's useState, useMemo, and other hooks for component state
- Local state for UI interactions (search, filters, queue)
- No external state management library currently used

### Data Structure

- Items are defined in both the JSX component (`ProductionPlanner.jsx`) and in the TypeScript model files
- Each item has:
  - Name
  - Production time (in hours)
  - Required worker type and level
  - Resource requirements (other components needed)
  - Category (component/module) and type (designer/developer/lead)
  - Icon

## Key Files and Directories

### Source Directory (`src/`)

- `App.js`: Main application wrapper
- `ProductionPlanner.jsx`: Main application logic and UI
- `index.js`: React root rendering
- `index.css`: Base CSS styling
- `uretim-fonksiyonlari.ts`: Production engine and utility functions
- `veritabani-model.ts`: Database model for items
- `malzeme-model.ts`: Data model and definitions for materials
- `yardimci-fonksiyonlar.ts`: Helper functions
- `full.png`: Image asset

### Configuration Files

- `package.json`: Project dependencies and scripts
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `index.html`: Main HTML file

### Build Output

- `build/`: Production build output (generated with `npm run build`)

## Project Purpose

This application appears to be an educational or simulation tool for:
- Understanding production planning in manufacturing/development
- Learning React and modern web development
- Demonstrating resource management concepts
- Practicing TypeScript integration with React
- Exploring component-based architecture

The application uses a game-like approach to simulate production of components and modules, with each item having specific requirements and time costs, which helps understand dependency management and resource planning in a development environment.

## Core Functionality

The application implements several core concepts:

1. **Production Queue**: Users can add items to a production queue to plan what they want to build
2. **Resource Tracking**: The system tracks all required resources needed for production
3. **Recursive Resource Calculation**: When an item is added to the queue, all required sub-components are calculated recursively
4. **Worker Types**: Different items require different types of workers (Designer, Developer, Lead Developer) at different skill levels
5. **Time Calculation**: Total production time is calculated based on all items in the queue and their dependencies

## Data Model

The application uses a well-defined data model with:
- `Malzeme` interface defining a material/item
- `GerekliMalzeme` interface defining required materials for production
- `UretimSiparisi` interface for production orders
- `UretimSonucu` interface for production results
- `Stok` interface for inventory tracking

The system includes three main classes:
- `MalzemeVeritabani`: Material database providing CRUD operations and resource calculations
- `UretimMotoru`: Production engine handling actual production processes
- Helper functions for various statistics and utility operations

## New Production Calculation System

With our recent updates, the application now includes:
- `uretim-hesaplama.js`: A new utility module that reads and parses the `malzemeler.txt` file to build a production database
- Recursive functions to calculate:
  - Total raw materials needed (`cikarHammaddeler`)
  - All production steps needed (`cikarToplamUretimler`)
  - Total production time (`toplamUretimSuresi`)
  - Production chain of workers needed (`uretimZinciri`)
- Updated UI components to display detailed production information

This architecture makes the application suitable for educational purposes in teaching production planning, supply chain management, and resource allocation concepts.

## Contributing

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License (if applicable).

## Support

For support, please open an issue in the repository or contact the maintainers.