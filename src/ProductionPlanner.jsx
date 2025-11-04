import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, Clock, User, Package, ChevronDown, ChevronUp, X } from 'lucide-react';
import { initializeData, cikarHammaddeler, cikarToplamUretimler, toplamUretimSuresi, uretimZinciri } from './uretim-hesaplama.js';

// Title easter egg options
const TITLE_OPTIONS = [
  "Miss me?",
  "Still here?",
  "Come back soon!",
  "Where did you go?",
  "Don't leave me!",
  "Please return!",
  "Can't live without you",
  "Hurry back!",
  "Time is ticking...",
  "Still producing?",
  "Don't forget me!",
  "Waiting for you...",
  "Come back!",
  "Don't abandon me!",
  "I miss you!",
  "Return to production!",
  "Still here!",
  "Miss you...",
  "Where are you?",
  "Come back to me!"
];

const ProductionPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productionQueue, setProductionQueue] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [totalProductions, setTotalProductions] = useState({});
  const [detailedBreakdown, setDetailedBreakdown] = useState([]);
  const [productionDetails, setProductionDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [searchOptions, setSearchOptions] = useState({
    exactMatch: false,
    caseSensitive: false
  });

  // Initialize the production data when the component mounts
  useEffect(() => {
    fetch('/malzemeler.txt')
      .then(response => response.text())
      .then(text => {
        initializeData(text);
        setIsLoading(false); // Set loading to false after data is loaded
      })
      .catch(error => {
        console.error('Error loading malzemeler.txt:', error);
        setIsLoading(false); // Still set loading to false in case of error
      });
  }, []);

  // Title easter egg functionality
  useEffect(() => {
    let currentInactiveMessage = null;
    
    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // When tab becomes hidden, select and show a random easter egg message
        const randomIndex = Math.floor(Math.random() * TITLE_OPTIONS.length);
        currentInactiveMessage = TITLE_OPTIONS[randomIndex];
        document.title = currentInactiveMessage;
      } else {
        // When tab becomes visible again, show default title
        document.title = 'Startup Company Production Planner';
      }
    };

    // Set up the event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const items = [
    // Components - Developer
    { name: 'UI Component', time: 2, worker: 'Developer(beginner)', resources: [], category: 'component', type: 'developer', icon: '⚙️' },
    { name: 'Backend Component', time: 4, worker: 'Developer(beginner)', resources: [], category: 'component', type: 'developer', icon: '💾' },
    { name: 'Network Component', time: 6, worker: 'Developer(beginner)', resources: [], category: 'component', type: 'developer', icon: '🌐' },
    { name: 'Database Component', time: 4, worker: 'Developer(beginner)', resources: [], category: 'component', type: 'developer', icon: '🗄️' },
    { name: 'Video Component', time: 14, worker: 'Developer(beginner)', resources: [], category: 'component', type: 'developer', icon: '📹' },
    { name: 'Semantic Component', time: 3, worker: 'Developer(intermediate)', resources: [], category: 'component', type: 'developer', icon: '🔤' },
    { name: 'Encryption Component', time: 8, worker: 'Developer(intermediate)', resources: [], category: 'component', type: 'developer', icon: '🔒' },
    { name: 'Filesystem Component', time: 4, worker: 'Developer(intermediate)', resources: [], category: 'component', type: 'developer', icon: '📁' },
    { name: 'Smtp Component', time: 8, worker: 'Developer(intermediate)', resources: [], category: 'component', type: 'developer', icon: '📧' },
    { name: 'i18n Component', time: 4, worker: 'Developer(expert)', resources: [], category: 'component', type: 'developer', icon: '🌍' },
    { name: 'Search Algorithm Component', time: 12, worker: 'Developer(expert)', resources: [], category: 'component', type: 'developer', icon: '🔍' },
    { name: 'Compression Component', time: 8, worker: 'Developer(expert)', resources: [], category: 'component', type: 'developer', icon: '📦' },
    
    // Components - Designer
    { name: 'Blueprint Component', time: 2, worker: 'Designer(beginner)', resources: [], category: 'component', type: 'designer', icon: '📐' },
    { name: 'Wireframe Component', time: 3, worker: 'Designer(beginner)', resources: [], category: 'component', type: 'designer', icon: '🖼️' },
    { name: 'Graphics Component', time: 4, worker: 'Designer(beginner)', resources: [], category: 'component', type: 'designer', icon: '🎨' },
    { name: 'UI Element', time: 6, worker: 'Designer(beginner)', resources: ['1 Blueprint Component', '1 Graphics Component'], category: 'component', type: 'designer', icon: '🎯' },
    { name: 'UI Set', time: 18, worker: 'Designer(intermediate)', resources: ['2 Wireframe Component', '2 UI Element'], category: 'component', type: 'designer', icon: '🎭' },
    { name: 'Responsive UI', time: 18, worker: 'Designer(intermediate)', resources: ['2 Wireframe Component', '2 UI Element'], category: 'component', type: 'designer', icon: '📱' },
    { name: 'Documentation Component', time: 12, worker: 'Designer(expert)', resources: [], category: 'component', type: 'designer', icon: '📄' },
    { name: 'Design Guidelines', time: 90, worker: 'Designer(expert)', resources: ['3 Documentation Component', '3 Responsive UI'], category: 'component', type: 'designer', icon: '📚' },
    
    // Modules
    { name: 'Interface Module', time: 15, worker: 'Lead Developer(beginner)', resources: ['2 UI Element', '1 Wireframe Component'], category: 'module', type: 'lead', icon: '🖥️' },
    { name: 'Frontend Module', time: 21, worker: 'Lead Developer(beginner)', resources: ['1 UI Element', '1 Interface Module'], category: 'module', type: 'lead', icon: '💻' },
    { name: 'Backend Module', time: 10, worker: 'Lead Developer(beginner)', resources: ['1 Backend Component', '1 Network Component'], category: 'module', type: 'lead', icon: '⚡' },
    { name: 'Input Module', time: 6, worker: 'Lead Developer(beginner)', resources: ['1 UI Component', '1 Backend Component'], category: 'module', type: 'lead', icon: '⌨️' },
    { name: 'Storage Module', time: 8, worker: 'Lead Developer(beginner)', resources: ['1 Filesystem Component', '1 Backend Component'], category: 'module', type: 'lead', icon: '💿' },
    { name: 'Content Management Module', time: 37, worker: 'Lead Developer(beginner)', resources: ['1 Frontend Module', '1 Input Module', '1 Backend Module'], category: 'module', type: 'lead', icon: '📝' },
    { name: 'Video Playback Module', time: 45, worker: 'Lead Developer(beginner)', resources: ['1 Video Component', '1 Frontend Module', '1 Backend Module'], category: 'module', type: 'lead', icon: '▶️' },
    { name: 'Seo Module', time: 24, worker: 'Lead Developer(intermediate)', resources: ['1 Frontend Module', '1 Semantic Component'], category: 'module', type: 'lead', icon: '🔎' },
    { name: 'Authentication Module', time: 22, worker: 'Lead Developer(intermediate)', resources: ['1 Database Component', '1 Encryption Component', '1 Backend Module'], category: 'module', type: 'lead', icon: '🔐' },
    { name: 'Email Module', time: 12, worker: 'Lead Developer(intermediate)', resources: ['1 Smtp Component', '1 Backend Component'], category: 'module', type: 'lead', icon: '✉️' },
    { name: 'Database Layer', time: 14, worker: 'Lead Developer(intermediate)', resources: ['1 Database Component', '1 Backend Component', '1 Network Component'], category: 'module', type: 'lead', icon: '🗃️' },
    { name: 'Notification Module', time: 18, worker: 'Lead Developer(intermediate)', resources: ['1 UI Component', '1 Backend Component', '1 Email Module'], category: 'module', type: 'lead', icon: '🔔' },
    { name: 'Payment Gateway Module', time: 76, worker: 'Lead Developer(expert)', resources: ['1 Database Layer', '1 API Client Module', '1 Authentication Module'], category: 'module', type: 'lead', icon: '💳' },
    { name: 'Localization Module', time: 25, worker: 'Lead Developer(expert)', resources: ['1 i18n Component', '1 Frontend Module'], category: 'module', type: 'lead', icon: '🗺️' },
    { name: 'Search Module', time: 20, worker: 'Lead Developer(expert)', resources: ['1 Database Component', '1 Search Algorithm Component', '1 Backend Component'], category: 'module', type: 'lead', icon: '🔍' },
    { name: 'Bandwidth Compression Module', time: 18, worker: 'Lead Developer(expert)', resources: ['1 Compression Component', '1 Network Component', '1 Backend Component'], category: 'module', type: 'lead', icon: '📡' },
    { name: 'API Client Module', time: 40, worker: 'Lead Developer(expert)', resources: ['1 Backend Module', '1 Database Layer', '2 Compression Component'], category: 'module', type: 'lead', icon: '🔌' },
    { name: 'Code Optimization Module', time: 90, worker: 'Lead Developer(expert)', resources: ['2 Backend Module', '2 Database Layer', '2 Frontend Module'], category: 'module', type: 'lead', icon: '⚙️' },
    
    // Sysadmin items
    { name: 'Virtual Hardware', time: 4, worker: 'Sysadmin(beginner)', resources: [], category: 'component', type: 'sysadmin', icon: '🖥️' },
    { name: 'Operating System', time: 4, worker: 'Sysadmin(beginner)', resources: [], category: 'component', type: 'sysadmin', icon: '💾' },
    { name: 'Firewall', time: 4, worker: 'Sysadmin(beginner)', resources: [], category: 'component', type: 'sysadmin', icon: '🛡️' },
    { name: 'Process Management', time: 6, worker: 'Sysadmin(intermediate)', resources: [], category: 'component', type: 'sysadmin', icon: '🔄' },
    { name: 'Continuous Integration', time: 8, worker: 'Sysadmin(intermediate)', resources: [], category: 'component', type: 'sysadmin', icon: '🔄' },
    { name: 'Cron Job', time: 3, worker: 'Sysadmin(intermediate)', resources: [], category: 'component', type: 'sysadmin', icon: '⏰' },
    { name: 'Virtual Container', time: 25, worker: 'Sysadmin(expert)', resources: ['1 Virtual Hardware', '1 Operating System', '1 Process Management', '1 Continuous Integration', '1 Cron Job'], category: 'module', type: 'sysadmin', icon: '📦' },
    { name: 'Cluster', time: 115, worker: 'Sysadmin(expert)', resources: ['3 Virtual Container', '10 Firewall'], category: 'module', type: 'sysadmin', icon: '⚡' },
    { name: 'Swarm Management', time: 140, worker: 'Sysadmin(expert)', resources: ['1 Cluster', '1 Virtual Container'], category: 'module', type: 'sysadmin', icon: '🐝' },
    
    // Features
    { name: 'Research Point', time: 0, worker: 'Feature', resources: [], category: 'feature', type: 'feature', icon: '🔍' },
    { name: 'Landing Page', time: 0, worker: 'Feature', resources: ['1 UI Component', '1 Backend Component', '1 Blueprint Component', '1 Graphics Component'], category: 'feature', type: 'feature', icon: '🌐' },
    { name: 'Video Functionality', time: 0, worker: 'Feature', resources: ['1 Frontend Module', '1 Video Playback Module'], category: 'feature', type: 'feature', icon: '🎥' },
    { name: 'Item Listing', time: 0, worker: 'Feature', resources: ['1 Backend Module', '1 Frontend Module', '1 Content Management Module'], category: 'feature', type: 'feature', icon: '📋' },
    { name: 'Text Ads', time: 0, worker: 'Feature', resources: [], category: 'feature', type: 'feature', icon: '📰' },
    { name: 'Sharing Functionality', time: 0, worker: 'Feature', resources: ['2 Backend Module', '1 Frontend Module', '1 Input Module', '2 Email Module', '1 UI Set'], category: 'feature', type: 'feature', icon: '📤' },
    { name: 'Offline Content', time: 0, worker: 'Feature', resources: ['2 Backend Module', '1 Frontend Module', '2 Storage Module', '2 Database Layer', '1 UI Set'], category: 'feature', type: 'feature', icon: '💾' },
    { name: 'Profile Page', time: 0, worker: 'Feature', resources: ['4 Input Module', '3 Frontend Module', '3 Backend Module', '2 UI Set', '1 Authentication Module'], category: 'feature', type: 'feature', icon: '👤' },
    { name: 'Subscription', time: 0, worker: 'Feature', resources: [], category: 'feature', type: 'feature', icon: '💳' },
    { name: 'Banner Ads', time: 0, worker: 'Feature', resources: [], category: 'feature', type: 'feature', icon: ' rekl' },
    { name: 'Video Ads', time: 0, worker: 'Feature', resources: [], category: 'feature', type: 'feature', icon: '📺' },
    { name: 'Ad_Block_Obfuscator', time: 0, worker: 'Feature', resources: ['2 Code Optimization Module', '4 UI Set', '2 API Client Module', '200 Research Point'], category: 'feature', type: 'feature', icon: '🛡️' },
    { name: 'DDos Protection', time: 0, worker: 'Feature', resources: ['1 Code Optimization Module', '2 API Client Module', '200 Research Point', '1 Swarm Management', '5 Firewall'], category: 'feature', type: 'feature', icon: '🔒' },
    { name: 'Help System', time: 0, worker: 'Feature', resources: ['4 Content Management Module', '4 Input Module', '3 Frontend Module', '3 Backend Module', '2 UI Set'], category: 'feature', type: 'feature', icon: '❓' },
  ];

  const filteredItems = useMemo(() => {
    // Preprocess items if search term is not empty and not using exact match for performance
    if (searchTerm && !searchOptions.exactMatch && !searchOptions.caseSensitive) {
      // Create a search index if it doesn't exist
      if (!window.searchIndex) {
        window.searchIndex = items.map(item => ({
          ...item,
          lowerName: item.name.toLowerCase(),
          lowerWorker: item.worker.toLowerCase(),
          lowerCategory: item.category.toLowerCase()
        }));
      }
      
      return window.searchIndex.filter(item => {
        const matchesSearch = item.lowerName.includes(searchTerm.toLowerCase()) || 
                             item.lowerWorker.includes(searchTerm.toLowerCase()) || 
                             item.lowerCategory.includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || 
                               (selectedCategory === 'feature' && item.category === 'feature') ||
                               (selectedCategory === 'component' && item.category === 'component') ||
                               (selectedCategory === 'module' && item.category === 'module') ||
                               (selectedCategory === 'designer' && item.type === 'designer') ||
                               (selectedCategory === 'developer' && item.type === 'developer') ||
                               (selectedCategory === 'lead' && item.type === 'lead') ||
                               (selectedCategory === 'sysadmin' && item.type === 'sysadmin');
        return matchesSearch && matchesCategory;
      });
    } else {
      // For exact match or case-sensitive searches, use the original filtering
      return items.filter(item => {
        let matchesSearch = false;
        
        if (searchTerm === '') {
          matchesSearch = true;
        } else {
          const searchValue = searchOptions.caseSensitive ? searchTerm : searchTerm.toLowerCase();
          const itemName = searchOptions.caseSensitive ? item.name : item.name.toLowerCase();
          const itemWorker = searchOptions.caseSensitive ? item.worker : item.worker.toLowerCase();
          const itemCategory = searchOptions.caseSensitive ? item.category : item.category.toLowerCase();
          
          if (searchOptions.exactMatch) {
            matchesSearch = itemName === searchValue || 
                           itemWorker === searchValue || 
                           itemCategory === searchValue;
          } else {
            matchesSearch = itemName.includes(searchValue) || 
                           itemWorker.includes(searchValue) || 
                           itemCategory.includes(searchValue);
          }
        }
        
        const matchesCategory = selectedCategory === 'all' || 
                               (selectedCategory === 'feature' && item.category === 'feature') ||
                               (selectedCategory === 'component' && item.category === 'component') ||
                               (selectedCategory === 'module' && item.category === 'module') ||
                               (selectedCategory === 'designer' && item.type === 'designer') ||
                               (selectedCategory === 'developer' && item.type === 'developer') ||
                               (selectedCategory === 'lead' && item.type === 'lead') ||
                               (selectedCategory === 'sysadmin' && item.type === 'sysadmin');
        return matchesSearch && matchesCategory;
      });
    }
  }, [searchTerm, selectedCategory, searchOptions]);

  // Memoize category item counts
  const categoryCounts = useMemo(() => {
    return {
      all: items.length,
      feature: items.filter(item => item.category === 'feature').length,
      component: items.filter(item => item.category === 'component').length,
      module: items.filter(item => item.category === 'module').length,
      designer: items.filter(item => item.type === 'designer').length,
      developer: items.filter(item => item.type === 'developer').length,
      lead: items.filter(item => item.type === 'lead').length,
      sysadmin: items.filter(item => item.type === 'sysadmin').length
    };
  }, [items]);

  // Find item by name in the items array
  const findItem = (name) => {
    return items.find(item => item.name === name);
  };

  // Function to get detailed breakdown of resources needed for an item
  const getDetailedBreakdown = (item, qty = 1) => {
    const breakdown = [];
    
    // Add how the main item breaks down
    if (item.resources && item.resources.length > 0) {
      const resourceBreakdown = item.resources.map(resource => resource).join(', ');
      breakdown.push(`${qty} ${item.name} → ${resourceBreakdown}`);
      
      // Recursively get breakdown for each resource
      for (const resource of item.resources) {
        const [count, resourceName] = resource.split(' ');
        const resourceCount = parseInt(count) * qty;
        const resourceItem = findItem(resourceName);
        
        if (resourceItem) {
          const subBreakdown = getDetailedBreakdown(resourceItem, resourceCount);
          // Add sub-breakdown with indentation
          for (const subLine of subBreakdown) {
            breakdown.push(`  ${subLine}`);
          }
        } else {
          // If resource is not found in our items list, just add it directly
          breakdown.push(`  ${resourceCount} ${resourceName}`);
        }
      }
    } else {
      // If no resources, just add the item
      breakdown.push(`${qty} ${item.name}`);
    }
    
    return breakdown;
  };

  const addToQueue = (item, qty = 1) => {
    // Check if item with the same name already exists in the queue
    const existingItemIndex = productionQueue.findIndex(qItem => qItem.name === item.name);
    
    let updatedQueue;
    
    if (existingItemIndex !== -1) {
      // If item already exists, update its quantity
      updatedQueue = [...productionQueue];
      const existingItem = updatedQueue[existingItemIndex];
      updatedQueue[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + qty
      };
    } else {
      // If item doesn't exist, add it as a new item with quantity
      const itemToAdd = { ...item, id: Date.now(), quantity: qty };
      updatedQueue = [...productionQueue, itemToAdd];
    }
    
    setProductionQueue(updatedQueue);
    
    // Update total production with all required resources calculated recursively
    setTotalProductions(prev => {
      const updated = { ...prev };
      
      // Use the new calculation function from uretim-hesaplama.js
      const allResources = cikarToplamUretimler(item.name, qty);
      
      // Add all resources to the total
      for (const [resourceName, count] of Object.entries(allResources)) {
        updated[resourceName] = (updated[resourceName] || 0) + count;
      }
      
      return updated;
    });
    
    // Update production details with new information
    setProductionDetails(prev => {
      const updated = { ...prev };
      
      // Add calculation details for the newly added item
      if (updated[item.name]) {
        // If the item already exists, we need to aggregate the values
        updated[item.name] = {
          totalTime: updated[item.name].totalTime + toplamUretimSuresi(item.name, qty),
          rawMaterials: aggregateRawMaterials(updated[item.name].rawMaterials, cikarHammaddeler(item.name, qty)),
          productionChain: updated[item.name].productionChain // Keep existing chain since it doesn't change by quantity
        };
      } else {
        // If new item, initialize it
        updated[item.name] = {
          totalTime: toplamUretimSuresi(item.name, qty),
          rawMaterials: cikarHammaddeler(item.name, qty),
          productionChain: uretimZinciri(item.name)
        };
      }
      
      return updated;
    });
    
    // Update detailed breakdown by recalculating from the full queue
    setDetailedBreakdown(calculateAllBreakdowns());
  };

  const removeFromQueue = (id) => {
    // Find item in queue by id
    const itemIndex = productionQueue.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const item = productionQueue[itemIndex];
    const updatedQueue = [...productionQueue];
    
    // If the item has a count > 1, decrease the count by 1
    if ((item.quantity || 1) > 1) {
      // Update the quantity of the existing item
      updatedQueue[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };
    } else {
      // Remove the item from the queue if quantity is 1
      updatedQueue.splice(itemIndex, 1);
    }
    
    setProductionQueue(updatedQueue);
    
    // Update total production by subtracting one instance of the item and all its sub-resources
    setTotalProductions(prev => {
      const updated = { ...prev };
      
      // Use the new calculation function from uretim-hesaplama.js
      const allResources = cikarToplamUretimler(item.name, 1);
      
      // Subtract all resources from the total
      for (const [resourceName, count] of Object.entries(allResources)) {
        if (updated[resourceName]) {
          updated[resourceName] = Math.max(0, updated[resourceName] - count);
          if (updated[resourceName] === 0) {
            delete updated[resourceName];
          }
        }
      }
      
      return updated;
    });
    
    // Update production details by recalculating based on the current queue
    setProductionDetails(prev => {
      const updated = {};
      const itemCounts = {};
      
      // Count occurrences of each item in the current queue
      for (const queueItem of updatedQueue) {
        const name = queueItem.name;
        const quantity = queueItem.quantity || 1;
        itemCounts[name] = (itemCounts[name] || 0) + quantity;
      }
      
      // Recalculate details for each unique item in the queue
      for (const [itemName, count] of Object.entries(itemCounts)) {
        updated[itemName] = {
          totalTime: toplamUretimSuresi(itemName, count),
          rawMaterials: cikarHammaddeler(itemName, count),
          productionChain: uretimZinciri(itemName)
        };
      }
      
      return updated;
    });
    
    // Update detailed breakdown by recalculating from the current production queue
    setDetailedBreakdown(calculateAllBreakdowns());
  };
  
  const removeAllFromQueue = (id) => {
    // Find item in queue by id
    const itemIndex = productionQueue.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const item = productionQueue[itemIndex];
    const itemQuantity = item.quantity || 1;
    const updatedQueue = [...productionQueue];
    
    // Remove the item completely from the queue
    updatedQueue.splice(itemIndex, 1);
    
    setProductionQueue(updatedQueue);
    
    // Update total production by subtracting all instances of the item and all its sub-resources
    setTotalProductions(prev => {
      const updated = { ...prev };
      
      // Use the new calculation function from uretim-hesaplama.js
      const allResources = cikarToplamUretimler(item.name, itemQuantity);
      
      // Subtract all resources from the total
      for (const [resourceName, count] of Object.entries(allResources)) {
        if (updated[resourceName]) {
          updated[resourceName] = Math.max(0, updated[resourceName] - count);
          if (updated[resourceName] === 0) {
            delete updated[resourceName];
          }
        }
      }
      
      return updated;
    });
    
    // Update production details by recalculating based on the current queue
    setProductionDetails(prev => {
      const updated = {};
      const itemCounts = {};
      
      // Count occurrences of each item in the current queue
      for (const queueItem of updatedQueue) {
        const name = queueItem.name;
        const quantity = queueItem.quantity || 1;
        itemCounts[name] = (itemCounts[name] || 0) + quantity;
      }
      
      // Recalculate details for each unique item in the queue
      for (const [itemName, count] of Object.entries(itemCounts)) {
        updated[itemName] = {
          totalTime: toplamUretimSuresi(itemName, count),
          rawMaterials: cikarHammaddeler(itemName, count),
          productionChain: uretimZinciri(itemName)
        };
      }
      
      return updated;
    });
    
    // Update detailed breakdown by recalculating from the current production queue
    setDetailedBreakdown(calculateAllBreakdowns());
  };
  
  // Helper function to aggregate raw materials
  const aggregateRawMaterials = (existing, newMaterials) => {
    const result = { ...existing };
    for (const [material, count] of Object.entries(newMaterials)) {
      result[material] = (result[material] || 0) + count;
    }
    return result;
  };
  
  // Calculate all breakdowns from the current production queue
  const calculateAllBreakdowns = () => {
    const allBreakdowns = [];
    
    // Group items by name to calculate totals
    const itemCounts = {};
    for (const item of productionQueue) {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    }
    
    // Calculate breakdown for each unique item
    for (const [itemName, count] of Object.entries(itemCounts)) {
      const item = findItem(itemName);
      if (item) {
        const breakdown = getDetailedBreakdown(item, count);
        // Add a separator or title for each main item
        allBreakdowns.push(`--- ${count}x ${itemName} ---`);
        allBreakdowns.push(...breakdown);
        allBreakdowns.push(''); // Empty line for readability
      }
    }
    
    return allBreakdowns;
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate total time by summing the time for each item in the queue considering their quantities
  const totalTime = useMemo(() => {
    return productionQueue.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + toplamUretimSuresi(item.name, quantity);
    }, 0);
  }, [productionQueue]);

  // Calculate unique items count
  const uniqueItemCount = useMemo(() => {
    return new Set(productionQueue.map(item => item.name)).size;
  }, [productionQueue]);

  const getWorkerColor = (worker) => {
    if (worker.includes('Designer')) return 'bg-purple-500';
    if (worker.includes('Lead Developer')) return 'bg-orange-500';
    if (worker.includes('Sysadmin')) return 'bg-red-500';
    if (worker.includes('Feature')) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getCategoryBadge = (item) => {
    if (item.category === 'module') return 'bg-green-100 text-green-800';
    if (item.category === 'feature') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">🚀 Startup Company</h1>
          <p className="text-purple-200 text-lg leading-relaxed">Production Planner</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Column 1: Category Sidebar (160px = 1/8) */}
          <div className="lg:w-[160px] flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 h-[720px] flex flex-col">
            <div className="mb-4">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-8 py-1.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <label className="flex items-center gap-1 text-xs text-gray-400">
                  <input
                    type="checkbox"
                    checked={searchOptions.exactMatch}
                    onChange={(e) => setSearchOptions(prev => ({ ...prev, exactMatch: e.target.checked }))}
                    className="rounded"
                  />
                  Exact match
                </label>
                <label className="flex items-center gap-1 text-xs text-gray-400">
                  <input
                    type="checkbox"
                    checked={searchOptions.caseSensitive}
                    onChange={(e) => setSearchOptions(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                    className="rounded"
                  />
                  Case sensitive
                </label>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollable-element">
              <div className="space-y-1">
                {['all', 'feature', 'component', 'module', 'designer', 'developer', 'lead', 'sysadmin'].map(cat => {
                  const itemCount = categoryCounts[cat];
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all text-sm flex justify-between ${
                        selectedCategory === cat
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span>
                        {cat === 'all' ? 'All' : 
                         cat === 'feature' ? 'Feature' :
                         cat === 'component' ? 'Component' :
                         cat === 'module' ? 'Module' :
                         cat === 'designer' ? 'Designer' :
                         cat === 'developer' ? 'Developer' :
                         cat === 'lead' ? 'Lead Dev' : 'Sysadmin'}
                      </span>
                      <span className="bg-purple-500/20 text-purple-200 text-xs px-2 py-0.5 rounded-full min-w-[24px] text-center">
                        {itemCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Items List (320px = 2/8) */}
          <div className="lg:w-[320px] flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 h-[720px] flex flex-col">
            <div className="mb-3 sticky top-0 z-10 pb-3">
              <div className="flex items-center gap-2">
                <label className="text-m text-gray-300">Quantity:</label>
                <div className="flex border border-white/20 rounded bg-white/5 flex-1">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-2 py-1 text-white hover:bg-white/10 text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center bg-transparent text-sm text-white"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-2 py-1 text-white hover:bg-white/10 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollable-element">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all cursor-pointer card-hover-effect stagger-item mb-3"
                  style={{ animationDelay: `${idx * 0.02}s` }}
                  onClick={() => addToQueue(item, quantity)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="text-white font-semibold text-sm truncate">
                          {searchTerm && !searchOptions.exactMatch ? (
                            <>
                              {item.name.split(new RegExp(`(${searchTerm})`, searchOptions.caseSensitive ? 'g' : 'gi')).map((part, index) => 
                                searchOptions.caseSensitive 
                                  ? (part === searchTerm ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                                  : (part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                              )}
                            </>
                          ) : item.name}
                        </h3>
                        <span className={`text-xs min-readable px-2 py-1 rounded ${getCategoryBadge(item)}`}>
                          {searchTerm && !searchOptions.exactMatch && 
                           (searchOptions.caseSensitive 
                            ? item.category.includes(searchTerm)
                            : item.category.toLowerCase().includes(searchTerm.toLowerCase())) ? (
                            <>
                              {item.category.split(new RegExp(`(${searchTerm})`, searchOptions.caseSensitive ? 'g' : 'gi')).map((part, index) => 
                                searchOptions.caseSensitive 
                                  ? (part === searchTerm ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                                  : (part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                              )}
                            </>
                          ) : item.category}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs mb-2">
                        <div className="flex items-center gap-1 text-purple-300">
                          <Clock size={12} />
                          <span>{item.time}h</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-300">
                          <User size={12} />
                          <span className="truncate max-w-[120px]">
                            {searchTerm && !searchOptions.exactMatch ? (
                              <>
                                {item.worker.split(new RegExp(`(${searchTerm})`, searchOptions.caseSensitive ? 'g' : 'gi')).map((part, index) => 
                                  searchOptions.caseSensitive 
                                    ? (part === searchTerm ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                                    : (part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} className="bg-yellow-500/30 text-yellow-100">{part}</span> : part)
                                )}
                              </>
                            ) : item.worker}
                          </span>
                        </div>
                      </div>
                      {item.resources.length > 0 && (
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from triggering
                              toggleExpand(idx);
                            }}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                          >
                            {expandedItems[idx] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            <span>Required ({item.resources.length})</span>
                          </button>
                          {expandedItems[idx] && (
                            <div className="mt-2 pl-4 space-y-1">
                              {item.resources.map((res, i) => (
                                <div key={i} className="text-xs text-gray-500 flex items-center gap-1">
                                  <Package size={10} />
                                  <span className="truncate">{res}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Production Queue (480px = 3/8) */}
          <div className="lg:w-[480px] flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 h-[720px] flex flex-col">
            <div className="mb-3 sticky top-0 z-10 pb-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-white text-2xl">📋 Production Queue</h2>
                {productionQueue.length > 0 && (
                  <button
                    onClick={() => {
                      setProductionQueue([]);
                      setTotalProductions({});
                      setProductionDetails({});
                      setDetailedBreakdown([]);
                    }}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4">
                <div className="text-white text-center">
                  <div className="mb-3">
                    <div className="font-semibold text-sm text-gray-300 mb-1">Total Time</div>
                    <div className="font-bold text-2xl">{totalTime}h</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-300 mb-1">Unique Items</div>
                    <div className="font-bold text-2xl">{uniqueItemCount}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollable-element">
              {productionQueue.length === 0 ? (
                <div className="text-center text-gray-400 py-10 flex items-center justify-center h-full">
                  <div className="text-center empty-state-pulse">
                    <Package size={40} className="mx-auto mb-2 opacity-50 text-gray-500" />
                    <p className="text-sm">Add items to start planning</p>
                    <p className="text-xs text-gray-500 mt-1">Search and click items to add to queue</p>
                  </div>
                </div>
              ) : (
                productionQueue.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all card-hover-effect mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{item.icon}</span>
                          <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                          {(item.quantity || 1) > 1 && (
                            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                              {item.quantity || 1}x
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-purple-300">{item.time}h</span>
                          <span className={`px-1.5 py-0.5 rounded text-white text-xs ${getWorkerColor(item.worker)}`}>
                            {item.worker.split('(')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => removeFromQueue(item.id)}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <button
                          onClick={() => addToQueue(item, 1)}
                          className="p-1 bg-green-500 hover:bg-green-600 text-white rounded transition-all"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeAllFromQueue(item.id)}
                          className="p-1 bg-red-500/80 hover:bg-red-600 text-white rounded transition-all ml-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 4: Production Summary (320px = 2/8) */}
          <div className="lg:w-[320px] flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 h-[720px] flex flex-col">
            <div className="mb-3 sticky top-0 z-10 pb-3">
              <h3 className="text-2xl font-bold text-white text-center ">📊 Production Summary</h3>
            </div>
            <div className="flex-1 overflow-y-auto scrollable-element ">
              {Object.keys(totalProductions).length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center empty-state-pulse">
                    <Package size={40} className="mx-auto mb-2 opacity-50 text-gray-500" />
                    <p className="text-sm text-gray-400">No production yet</p>
                    <p className="text-xs text-gray-500 mt-1">Add items to the queue to see summary</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-4 min-h-0">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-shrink-0">
                    <h4 className="font-semibold text-white text-sm mb-2">Total Production:</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                      {Object.entries(totalProductions).map(([item, count]) => (
                        <div key={item} className="flex justify-between text-xs">
                          <span className="text-gray-300 truncate flex-1 mr-2">{item}:</span>
                          <span className="text-white font-medium flex-shrink-0">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-white text-sm">
                        <span>Total Items:</span>
                        <span>{Object.values(totalProductions).reduce((sum, count) => sum + count, 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1 flex flex-col min-h-0">
                    <h4 className="font-semibold text-white text-sm mb-2 flex-shrink-0">Production Details:</h4>
                    <div className="space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                      {Object.entries(productionDetails).map(([itemName, details]) => (
                        <div key={itemName} className="pt-2 border-t border-white/10 first:border-t-0 first:pt-0">
                          <div className="text-xs text-purple-300 font-semibold truncate">{itemName}</div>
                          <div className="text-xs text-gray-300 mt-1">Total Time: <span className="text-white">{details.totalTime} hours</span></div>
                          <div className="text-xs text-gray-300">Raw Materials:</div>
                          <div className="text-xs text-gray-400 ml-2">
                            {Object.entries(details.rawMaterials).map(([material, count], idx) => (
                              <div key={idx} className="truncate">{material}: {count}</div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-300">Production Chain: <span className="text-white">{details.productionChain.join(' → ')}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlanner;