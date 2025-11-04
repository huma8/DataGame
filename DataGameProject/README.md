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

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (version 8 or higher) or yarn

## Installation

1. Clone the repository or download the project files:
   ```bash
   git clone https://github.com/your-username/DataGame.git
   cd DataGame
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

## Running the Application

### Development Mode
To run the application in development mode with hot reloading:

```bash
npm start
```
or 
```bash
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build
To create a production-ready build:

```bash
npm run build
```
or
```bash
yarn build
```

The production build will be created in the `build/` directory and can be served using any static server.

### Serving Production Build Locally
To test the production build locally:

```bash
npm install -g serve
serve -s build
```

## Project Structure

The project follows a modular architecture organized as follows:

```
DataGameProject/
├── public/
│   ├── index.html
│   └── malzemeler.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── data/
│   │   ├── production/
│   │   └── ui/
│   ├── config/
│   │   ├── appConfig.js
│   │   └── constants.js
│   ├── models/
│   │   ├── malzeme-model.ts
│   │   └── veritabani-model.ts
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── dataService.js
│   │   ├── uretim-hesaplama.js
│   │   └── ...
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

### Key Components:
- `src/components/production/ProductionPlanner.jsx`: Main application component
- `src/utils/dataService.js`: Handles data loading and initialization
- `src/utils/uretim-hesaplama.js`: Core production calculation functions
- `src/config/`: Application configuration and constants
- `public/malzemeler.txt`: Production data file

## Development

### Adding New Components
To create a new component for development, you can use:

```bash
# Create a new component in the appropriate directory
# For example, to add a new UI component:
# 1. Create the component file in src/components/ui/
# 2. Follow the existing component patterns
```

### Data Model
The application uses `malzemeler.txt` in the public directory to load production data. To modify available items or their properties, edit this file following the existing format.

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

## Building and Deployment

### Creating a Production Build
```bash
npm run build
```

This will create an optimized build in the `build/` directory that can be deployed to any static hosting service.

### Environment Variables
The application doesn't require any environment variables for basic operation, but you can customize the API URL by setting `REACT_APP_API_URL` if needed.

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Ensure all dependencies are installed with `npm install`
   - Check that import paths match the modular structure

2. **Data loading issues**:
   - Verify `public/malzemeler.txt` exists and is correctly formatted
   - Check that the file path is correctly referenced in the data service

3. **Build errors**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Performance
The application is optimized for use with moderate numbers of items. For larger datasets, consider implementing virtualized lists for better performance.

## Contributing

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the repository. For questions about the production planning concepts, check the documentation or contact the maintainers.