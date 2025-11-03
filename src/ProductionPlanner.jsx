import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, Clock, User, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { initializeData, cikarHammaddeler, cikarToplamUretimler, toplamUretimSuresi, uretimZinciri } from './uretim-hesaplama.js';

const ProductionPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productionQueue, setProductionQueue] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [totalProductions, setTotalProductions] = useState({});
  const [detailedBreakdown, setDetailedBreakdown] = useState([]);
  const [productionDetails, setProductionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
  }, [searchTerm, selectedCategory]);

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
    const newItems = [];
    for (let i = 0; i < qty; i++) {
      newItems.push({ ...item, id: Date.now() + i });
    }
    setProductionQueue([...productionQueue, ...newItems]);
    
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
    const removedItem = productionQueue.find(item => item.id === id);
    if (removedItem) {
      // Update the queue by filtering out the removed item
      const updatedQueue = productionQueue.filter(item => item.id !== id);
      setProductionQueue(updatedQueue);
      
      // Update total production by subtracting the removed item and all its sub-resources
      setTotalProductions(prev => {
        const updated = { ...prev };
        
        // Use the new calculation function from uretim-hesaplama.js
        const allResources = cikarToplamUretimler(removedItem.name, 1);
        
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
        for (const item of updatedQueue) {
          itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
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
    }
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

  // Calculate total time by summing the time for each unique item in the queue
  const totalTime = (() => {
    const itemCounts = {};
    for (const item of productionQueue) {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    }
    
    let total = 0;
    for (const [itemName, count] of Object.entries(itemCounts)) {
      total += toplamUretimSuresi(itemName, count);
    }
    return total;
  })();

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Startup Company</h1>
          <p className="text-purple-200 text-lg">Production Planner</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Search and Filter */}
          <div className="lg:w-56 flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="mb-4">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                />
              </div>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-1 scrollable-element">
              <div className="space-y-1">
                {['all', 'feature', 'component', 'module', 'designer', 'developer', 'lead', 'sysadmin'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all text-base ${
                      selectedCategory === cat
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'All' : 
                     cat === 'feature' ? 'Feature' :
                     cat === 'component' ? 'Component' :
                     cat === 'module' ? 'Module' :
                     cat === 'designer' ? 'Designer' :
                     cat === 'developer' ? 'Developer' :
                     cat === 'lead' ? 'Lead Dev' : 'Sysadmin'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Item List */}
          <div className="flex-1 min-w-0 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollable-element">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer card-hover-effect stagger-item"
                  style={{ animationDelay: `${idx * 0.02}s` }}
                  onClick={() => addToQueue(item, 1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="text-white font-semibold text-base truncate">{item.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryBadge(item)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <div className="flex items-center gap-1 text-purple-300">
                          <Clock size={14} />
                          <span>{item.time}h</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-300">
                          <User size={14} />
                          <span className="truncate max-w-[120px]">{item.worker}</span>
                        </div>
                      </div>
                      {item.resources.length > 0 && (
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from triggering
                              toggleExpand(idx);
                            }}
                            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                          >
                            {expandedItems[idx] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            <span>Required ({item.resources.length})</span>
                          </button>
                          {expandedItems[idx] && (
                            <div className="mt-2 pl-4 space-y-1">
                              {item.resources.map((res, i) => (
                                <div key={i} className="text-sm text-gray-500 flex items-center gap-1">
                                  <Package size={12} />
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

          {/* Right Panel - Production Queue and Summary */}
          <div className="flex flex-col gap-6 min-w-[360px] w-[360px] flex-shrink-0">
            {/* Production Queue */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 h-[340px] flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-4">📋 Production Queue</h2>
              
              <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4 mb-4 flex-shrink-0">
                <div className="text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg">Total Time:</span>
                    <span className="text-2xl font-bold">{totalTime}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Item Count:</span>
                    <span className="text-xl">{productionQueue.length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1 min-h-0 overflow-y-auto pr-2 scrollable-element">
                {productionQueue.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <Package size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-lg">No items added yet</p>
                  </div>
                ) : (
                  productionQueue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all card-hover-effect"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{item.icon}</span>
                            <h4 className="text-white font-medium text-lg truncate">{item.name}</h4>
                          </div>
                          <div className="flex gap-3 text-base">
                            <span className="text-purple-300">{item.time}h</span>
                            <span className={`px-2 py-1 rounded text-white text-base ${getWorkerColor(item.worker)}`}>
                              {item.worker.split('(')[0]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromQueue(item.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total Production Summary */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 h-[340px] flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3">📊 Production Summary</h3>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex-1 min-h-0 overflow-y-auto scrollable-element">
                {Object.keys(totalProductions).length === 0 ? (
                  <p className="text-gray-400 text-lg">No production yet</p>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white text-lg">Total Production:</h4>
                    <div className="space-y-2">
                      {Object.entries(totalProductions).map(([item, count]) => (
                        <div key={item} className="flex justify-between text-lg">
                          <span className="text-gray-300 truncate flex-1 mr-2">{item}:</span>
                          <span className="text-white font-medium flex-shrink-0">{count}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-white text-lg">
                        <span>Total Items:</span>
                        <span>{Object.values(totalProductions).reduce((sum, count) => sum + count, 0)}</span>
                      </div>
                    </div>
                    
                    {/* Additional Production Details */}
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <h4 className="font-semibold text-white text-lg">Production Details:</h4>
                      <div className="space-y-2 mt-2">
                        {Object.entries(productionDetails).map(([itemName, details]) => (
                          <div key={itemName} className="mt-3">
                            <div className="text-base text-purple-300 font-semibold truncate">{itemName}</div>
                            <div className="text-base text-gray-300">Total Time: <span className="text-white">{details.totalTime} hours</span></div>
                            <div className="text-base text-gray-300">Raw Materials:</div>
                            <div className="text-base text-gray-400 ml-3">
                              {Object.entries(details.rawMaterials).map(([material, count], idx) => (
                                <div key={idx} className="truncate">{material}: {count}</div>
                              ))}
                            </div>
                            <div className="text-base text-gray-300">Production Chain: <span className="text-white">{details.productionChain.join(' → ')}</span></div>
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
    </div>
  );
};

export default ProductionPlanner;