// Malzeme veri modeli
interface Malzeme {
  isim: string;
  uretimSuresi: number; // saat cinsinden
  uretici: string;
  gerekliMalzemeler: GerekliMalzeme[];
}

interface GerekliMalzeme {
  isim: string;
  miktar: number;
}

// Malzeme verileri
const malzemeler: Malzeme[] = [
  {
    isim: "Blueprint Component",
    uretimSuresi: 2,
    uretici: "Designer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Wireframe Component",
    uretimSuresi: 3,
    uretici: "Designer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Graphics Component",
    uretimSuresi: 4,
    uretici: "Designer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "UI Element",
    uretimSuresi: 6,
    uretici: "Designer(beginner)",
    gerekliMalzemeler: [
      { isim: "Blueprint Component", miktar: 1 },
      { isim: "Graphics Component", miktar: 1 }
    ]
  },
  {
    isim: "UI Set",
    uretimSuresi: 18,
    uretici: "Designer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Wireframe Component", miktar: 2 },
      { isim: "UI Element", miktar: 2 }
    ]
  },
  {
    isim: "Responsive UI",
    uretimSuresi: 18,
    uretici: "Designer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Wireframe Component", miktar: 2 },
      { isim: "UI Element", miktar: 2 }
    ]
  },
  {
    isim: "Documentation Component",
    uretimSuresi: 12,
    uretici: "Designer(expert)",
    gerekliMalzemeler: []
  },
  {
    isim: "Design Guidelines",
    uretimSuresi: 90,
    uretici: "Designer(expert)",
    gerekliMalzemeler: [
      { isim: "Documentation Component", miktar: 3 },
      { isim: "Responsive UI", miktar: 3 }
    ]
  },
  {
    isim: "UI Component",
    uretimSuresi: 2,
    uretici: "Developer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Backend Component",
    uretimSuresi: 4,
    uretici: "Developer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Network Component",
    uretimSuresi: 6,
    uretici: "Developer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Database Component",
    uretimSuresi: 4,
    uretici: "Developer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Video Component",
    uretimSuresi: 14,
    uretici: "Developer(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Semantic Component",
    uretimSuresi: 3,
    uretici: "Developer(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Encryption Component",
    uretimSuresi: 8,
    uretici: "Developer(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Filesystem Component",
    uretimSuresi: 4,
    uretici: "Developer(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Smtp Component",
    uretimSuresi: 8,
    uretici: "Developer(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "i18n Component",
    uretimSuresi: 4,
    uretici: "Developer(expert)",
    gerekliMalzemeler: []
  },
  {
    isim: "Search Algorithm Component",
    uretimSuresi: 12,
    uretici: "Developer(expert)",
    gerekliMalzemeler: []
  },
  {
    isim: "Compression Component",
    uretimSuresi: 8,
    uretici: "Developer(expert)",
    gerekliMalzemeler: []
  },
  {
    isim: "Interface Module",
    uretimSuresi: 15,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "UI Element", miktar: 2 },
      { isim: "Wireframe Component", miktar: 1 }
    ]
  },
  {
    isim: "Frontend Module",
    uretimSuresi: 21,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "UI Element", miktar: 1 },
      { isim: "Interface Module", miktar: 1 }
    ]
  },
  {
    isim: "Backend Module",
    uretimSuresi: 10,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "Backend Component", miktar: 1 },
      { isim: "Network Component", miktar: 1 }
    ]
  },
  {
    isim: "Input Module",
    uretimSuresi: 6,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "UI Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 }
    ]
  },
  {
    isim: "Storage Module",
    uretimSuresi: 8,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "Filesystem Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 }
    ]
  },
  {
    isim: "Content Management Module",
    uretimSuresi: 37,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Input Module", miktar: 1 },
      { isim: "Backend Module", miktar: 1 }
    ]
  },
  {
    isim: "Video Playback Module",
    uretimSuresi: 45,
    uretici: "Lead Developer(beginner)",
    gerekliMalzemeler: [
      { isim: "Video Component", miktar: 1 },
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Backend Module", miktar: 1 }
    ]
  },
  {
    isim: "Seo Module",
    uretimSuresi: 24,
    uretici: "Lead Developer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Semantic Component", miktar: 1 }
    ]
  },
  {
    isim: "Authentication Module",
    uretimSuresi: 22,
    uretici: "Lead Developer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Database Component", miktar: 1 },
      { isim: "Encryption Component", miktar: 1 },
      { isim: "Backend Module", miktar: 1 }
    ]
  },
  {
    isim: "Email Module",
    uretimSuresi: 12,
    uretici: "Lead Developer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Smtp Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 }
    ]
  },
  {
    isim: "Database Layer",
    uretimSuresi: 14,
    uretici: "Lead Developer(intermediate)",
    gerekliMalzemeler: [
      { isim: "Database Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 },
      { isim: "Network Component", miktar: 1 }
    ]
  },
  {
    isim: "Notification Module",
    uretimSuresi: 18,
    uretici: "Lead Developer(intermediate)",
    gerekliMalzemeler: [
      { isim: "UI Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 },
      { isim: "Email Module", miktar: 1 }
    ]
  },
  {
    isim: "Payment Gateway Module",
    uretimSuresi: 76,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "Database Layer", miktar: 1 },
      { isim: "API Client Module", miktar: 1 },
      { isim: "Authentication Module", miktar: 1 }
    ]
  },
  {
    isim: "Localization Module",
    uretimSuresi: 25,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "i18n Component", miktar: 1 },
      { isim: "Frontend Module", miktar: 1 }
    ]
  },
  {
    isim: "Search Module",
    uretimSuresi: 20,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "Database Component", miktar: 1 },
      { isim: "Search Algorithm Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 }
    ]
  },
  {
    isim: "Bandwith Compression Module",
    uretimSuresi: 18,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "Compression Component", miktar: 1 },
      { isim: "Network Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 }
    ]
  },
  {
    isim: "API Client Module",
    uretimSuresi: 40,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "Backend Module", miktar: 1 },
      { isim: "Database Layer", miktar: 1 },
      { isim: "Compression Component", miktar: 2 }
    ]
  },
  {
    isim: "Code Optimization Module",
    uretimSuresi: 90,
    uretici: "Lead Developer(expert)",
    gerekliMalzemeler: [
      { isim: "Backend Module", miktar: 2 },
      { isim: "Database Layer", miktar: 2 },
      { isim: "Frontend Module", miktar: 2 }
    ]
  },
  {
    isim: "Virtual Hardware",
    uretimSuresi: 4,
    uretici: "Sysadmin(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Operating System",
    uretimSuresi: 4,
    uretici: "Sysadmin(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Firewall",
    uretimSuresi: 4,
    uretici: "Sysadmin(beginner)",
    gerekliMalzemeler: []
  },
  {
    isim: "Process Management",
    uretimSuresi: 6,
    uretici: "Sysadmin(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Continuous Integration",
    uretimSuresi: 8,
    uretici: "Sysadmin(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Cron Job",
    uretimSuresi: 3,
    uretici: "Sysadmin(intermediate)",
    gerekliMalzemeler: []
  },
  {
    isim: "Virtual Container",
    uretimSuresi: 25,
    uretici: "Sysadmin(expert)",
    gerekliMalzemeler: [
      { isim: "Virtual Hardware", miktar: 1 },
      { isim: "Operating System", miktar: 1 },
      { isim: "Process Management", miktar: 1 },
      { isim: "Continuous Integration", miktar: 1 },
      { isim: "Cron Job", miktar: 1 }
    ]
  },
  {
    isim: "Cluster",
    uretimSuresi: 115,
    uretici: "Sysadmin(expert)",
    gerekliMalzemeler: [
      { isim: "Virtual Container", miktar: 3 },
      { isim: "Firewall", miktar: 10 }
    ]
  },
  {
    isim: "Swarm Management",
    uretimSuresi: 140,
    uretici: "Sysadmin(expert)",
    gerekliMalzemeler: [
      { isim: "Cluster", miktar: 1 },
      { isim: "Virtual Container", miktar: 1 }
    ]
  },
  {
    isim: "Research Point",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: []
  },
  {
    isim: "Landing Page",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "UI Component", miktar: 1 },
      { isim: "Backend Component", miktar: 1 },
      { isim: "Blueprint Component", miktar: 1 },
      { isim: "Graphics Component", miktar: 1 }
    ]
  },
  {
    isim: "Video Functionality",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Video Playback Module", miktar: 1 }
    ]
  },
  {
    isim: "Item Listing",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Backend Module", miktar: 1 },
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Content Management Module", miktar: 1 }
    ]
  },
  {
    isim: "Text Ads",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: []
  },
  {
    isim: "Sharing Functionality",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Backend Module", miktar: 2 },
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Input Module", miktar: 1 },
      { isim: "Email Module", miktar: 2 },
      { isim: "UI Set", miktar: 1 }
    ]
  },
  {
    isim: "Offline Content",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Backend Module", miktar: 2 },
      { isim: "Frontend Module", miktar: 1 },
      { isim: "Storage Module", miktar: 2 },
      { isim: "Database Layer", miktar: 2 },
      { isim: "UI Set", miktar: 1 }
    ]
  },
  {
    isim: "Profile Page",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Input Module", miktar: 4 },
      { isim: "Frontend Module", miktar: 3 },
      { isim: "Backend Module", miktar: 3 },
      { isim: "UI Set", miktar: 2 },
      { isim: "Authentication Module", miktar: 1 }
    ]
  },
  {
    isim: "Subscription",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: []
  },
  {
    isim: "Banner Ads",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: []
  },
  {
    isim: "Video Ads",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: []
  },
  {
    isim: "Ad_Block_Obfuscator",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Code Optimization Module", miktar: 2 },
      { isim: "UI Set", miktar: 4 },
      { isim: "API Client Module", miktar: 2 },
      { isim: "Research Point", miktar: 200 }
    ]
  },
  {
    isim: "DDos Protection",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Code Optimization Module", miktar: 1 },
      { isim: "API Client Module", miktar: 2 },
      { isim: "Research Point", miktar: 200 },
      { isim: "Swarm Management", miktar: 1 },
      { isim: "Firewall", miktar: 5 }
    ]
  },
  {
    isim: "Help System",
    uretimSuresi: 0,
    uretici: "Feature",
    gerekliMalzemeler: [
      { isim: "Content Management Module", miktar: 4 },
      { isim: "Input Module", miktar: 4 },
      { isim: "Frontend Module", miktar: 3 },
      { isim: "Backend Module", miktar: 3 },
      { isim: "UI Set", miktar: 2 }
    ]
  }
];

export { Malzeme, GerekliMalzeme, malzemeler };