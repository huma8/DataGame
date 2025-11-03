// Utility functions for production calculations based on malzemeler.txt

interface GerekliMalzeme {
  isim: string;
  adet: number;
}

interface Urun {
  isim: string;
  süre: number;
  üretici: string;
  gerekli: GerekliMalzeme[];
}

// Parse the content from malzemeler.txt into the task dictionary structure
export function parseMalzemeData(rawData: string): Urun[] {
  const lines = rawData.split('\n');
  const urunler: Urun[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines, headers, or separators
    if (!trimmedLine || 
        trimmedLine.includes('İSİM/ÜRETİM SAATİ/ÜRETİCİ/KULLANILAN KAYNAK') || 
        trimmedLine.includes('-------------------------') ||
        trimmedLine.includes('Devamı gelecek') ||
        trimmedLine.includes('----------------------------------------------------------------------------')) {
      continue;
    }

    // Match lines in the format: "Name: time, producer, materials"
    const match = trimmedLine.match(/^([^:]+):\s*(\d+)h?,\s*([^,]+),\s*(.+)$/);
    
    if (match) {
      const [, isim, süreStr, üretici, girdiler] = match;
      
      const süre = parseInt(süreStr, 10);
      const gerekli: GerekliMalzeme[] = [];

      // Parse ingredients - handle both "-" (no ingredients) and actual ingredient lists
      if (girdiler.trim() !== '-' && girdiler.trim() !== '') {
        // Split by '+' to get individual ingredients
        const malzemeList = girdiler.split('+').map(m => m.trim());
        
        for (const malzeme of malzemeList) {
          // Extract quantity and name (e.g., "1 Database Component")
          const malzemeMatch = malzeme.trim().match(/^(\d+)\s+(.+)$/);
          if (malzemeMatch) {
            const [, adetStr, isim] = malzemeMatch;
            gerekli.push({
              isim: isim.trim(),
              adet: parseInt(adetStr, 10)
            });
          }
        }
      }

      urunler.push({
        isim: isim.trim(),
        süre,
        üretici: üretici.trim(),
        gerekli
      });
    }
  }

  return urunler;
}

// Global variable to store the parsed data
let urunlerData: Urun[] = [];

// Function to initialize the data
export function initializeData(rawData: string) {
  urunlerData = parseMalzemeData(rawData);
}

// Find a product by name in the database
function bulUrun(isim: string): Urun | undefined {
  return urunlerData.find(u => u.isim === isim);
}

// Recursive function to calculate total raw materials needed
export function cikarHammaddeler(ürünIsmi: string, adet: number = 1): { [key: string]: number } {
  const sonuç: { [key: string]: number } = {};
  const ürün = bulUrun(ürünIsmi);

  if (!ürün) {
    console.error(`Ürün bulunamadı: ${ürünIsmi}`);
    return sonuç;
  }

  // If it's a basic material (no ingredients), return itself
  if (ürün.gerekli.length === 0) {
    sonuç[ürünIsmi] = (sonuç[ürünIsmi] || 0) + adet;
    return sonuç;
  }

  // Calculate for each required component
  for (const gerekli of ürün.gerekli) {
    const toplamGerekliMiktar = gerekli.adet * adet;
    const altMalzemeMiktarlari = cikarHammaddeler(gerekli.isim, toplamGerekliMiktar);

    for (const [altMalzemeIsim, altMiktar] of Object.entries(altMalzemeMiktarlari)) {
      if (sonuç[altMalzemeIsim]) {
        sonuç[altMalzemeIsim] += altMiktar;
      } else {
        sonuç[altMalzemeIsim] = altMiktar;
      }
    }
  }

  return sonuç;
}

// Function to calculate all production steps needed
export function cikarToplamUretimler(ürünIsmi: string, adet: number = 1): { [key: string]: number } {
  const toplamUretimler: { [key: string]: number } = {};
  
  // Add this product to the count
  toplamUretimler[ürünIsmi] = (toplamUretimler[ürünIsmi] || 0) + adet;
  
  const ürün = bulUrun(ürünIsmi);
  if (!ürün) {
    console.error(`Ürün bulunamadı: ${ürünIsmi}`);
    return toplamUretimler;
  }

  // If it's a basic material (no ingredients), return
  if (ürün.gerekli.length === 0) {
    return toplamUretimler;
  }

  // Process each required component
  for (const gerekli of ürün.gerekli) {
    const toplamGerekliMiktar = gerekli.adet * adet;
    const altUretimler = cikarToplamUretimler(gerekli.isim, toplamGerekliMiktar);

    for (const [altUrunIsim, altMiktar] of Object.entries(altUretimler)) {
      if (toplamUretimler[altUrunIsim]) {
        toplamUretimler[altUrunIsim] += altMiktar;
      } else {
        toplamUretimler[altUrunIsim] = altMiktar;
      }
    }
  }

  return toplamUretimler;
}

// Function to calculate total production time
export function toplamUretimSuresi(ürünIsmi: string, adet: number = 1): number {
  const ürün = bulUrun(ürünIsmi);
  if (!ürün) {
    console.error(`Ürün bulunamadı: ${ürünIsmi}`);
    return 0;
  }

  let sure = ürün.süre * adet;

  // Add time for required components
  for (const gerekli of ürün.gerekli) {
    sure += toplamUretimSuresi(gerekli.isim, gerekli.adet * adet);
  }

  return sure;
}

// Function to get the production chain (types of workers needed)
export function uretimZinciri(ürünIsmi: string): string[] {
  const zincir: string[] = [];
  const ürün = bulUrun(ürünIsmi);
  
  if (!ürün) {
    console.error(`Ürün bulunamadı: ${ürünIsmi}`);
    return zincir;
  }

  // Add this product's producer to the chain
  if (!zincir.includes(ürün.üretici)) {
    zincir.push(ürün.üretici);
  }

  // If it's a basic material (no ingredients), return
  if (ürün.gerekli.length === 0) {
    return zincir;
  }

  // Process each required component
  for (const gerekli of ürün.gerekli) {
    const altZincir = uretimZinciri(gerekli.isim);
    for (const üretici of altZincir) {
      if (!zincir.includes(üretici)) {
        zincir.push(üretici);
      }
    }
  }

  return zincir;
}