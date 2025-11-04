// Data Service for Production Data
import { initializeData } from '../utils/uretim-hesaplama.js';
import appConfig from '../config/appConfig.js';

class DataService {
  static async loadProductionData() {
    try {
      const response = await fetch(appConfig.productionDataFile);
      const text = await response.text();
      initializeData(text);
      return { success: true, message: 'Data loaded successfully' };
    } catch (error) {
      console.error('Error loading production data:', error);
      return { success: false, error: error.message };
    }
  }
}

export default DataService;