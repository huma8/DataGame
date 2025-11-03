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