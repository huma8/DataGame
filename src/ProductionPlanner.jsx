import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Clock, User, Package, ChevronDown, ChevronUp } from 'lucide-react';

const ProductionPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productionQueue, setProductionQueue] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [quantity, setQuantity] = useState(1);

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
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'component' && item.category === 'component') ||
                             (selectedCategory === 'module' && item.category === 'module') ||
                             (selectedCategory === 'designer' && item.type === 'designer') ||
                             (selectedCategory === 'developer' && item.type === 'developer') ||
                             (selectedCategory === 'lead' && item.type === 'lead');
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToQueue = (item) => {
    setProductionQueue([...productionQueue, { ...item, id: Date.now() }]);
  };

  const removeFromQueue = (id) => {
    setProductionQueue(productionQueue.filter(item => item.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalTime = productionQueue.reduce((sum, item) => sum + item.time, 0);

  const getWorkerColor = (worker) => {
    if (worker.includes('Designer')) return 'bg-purple-500';
    if (worker.includes('Lead Developer')) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const getCategoryBadge = (item) => {
    if (item.category === 'module') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Startup Company</h1>
          <p className="text-purple-200">Üretim Planlayıcı</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Panel - Malzeme Listesi */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Malzeme ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'component', 'module', 'designer', 'developer', 'lead'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'Tümü' : 
                     cat === 'component' ? 'Component' :
                     cat === 'module' ? 'Module' :
                     cat === 'designer' ? 'Designer' :
                     cat === 'developer' ? 'Developer' : 'Lead Dev'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryBadge(item)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-purple-300">
                          <Clock size={14} />
                          <span>{item.time}h</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-300">
                          <User size={14} />
                          <span>{item.worker}</span>
                        </div>
                      </div>
                      {item.resources.length > 0 && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleExpand(idx)}
                            className="flex items-center gap-1 text-xs text-gray-300 hover:text-white"
                          >
                            {expandedItems[idx] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            Gerekli Kaynaklar ({item.resources.length})
                          </button>
                          {expandedItems[idx] && (
                            <div className="mt-2 pl-4 space-y-1">
                              {item.resources.map((res, i) => (
                                <div key={i} className="text-xs text-gray-400 flex items-center gap-1">
                                  <Package size={12} />
                                  {res}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => addToQueue(item)}
                      className="ml-4 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Panel - Üretim Kuyruğu */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">📋 Üretim Kuyruğu</h2>
            
            <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4 mb-4">
              <div className="text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Toplam Süre:</span>
                  <span className="text-2xl font-bold">{totalTime}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Malzeme Sayısı:</span>
                  <span className="text-xl">{productionQueue.length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {productionQueue.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <Package size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Henüz malzeme eklenmedi</p>
                </div>
              ) : (
                productionQueue.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{item.icon}</span>
                          <h4 className="text-white text-sm font-medium">{item.name}</h4>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-purple-300">{item.time}h</span>
                          <span className={`px-2 py-0.5 rounded text-white text-xs ${getWorkerColor(item.worker)}`}>
                            {item.worker.split('(')[0]}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromQueue(item.id)}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlanner;