// Parse the content from malzemeler.txt into the task dictionary structure
function parseMalzemeData(rawData) {
  const lines = rawData.split('\n');
  const urunler = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines, headers, or separators
    if (!trimmedLine || 
        trimmedLine.includes('İSİM/ÜRETİM SAATİ/ÜRETİCİ/KULLANILAN KAYNAK') || 
        trimmedLine.includes('-------------------------') ||
        trimmedLine.includes('Devamı gelecek') ||
        trimmedLine.includes('----------------------------------------------------------------------------') ||
        trimmedLine.includes('FEATURE/RESEARCH POINT/SOURCES')) {
      continue;
    }

    // Match lines in the format: "Name: time, producer, materials" (for regular items)
    const match = trimmedLine.match(/^([^:]+):\s*(\d+)h?,\s*([^,]+),\s*(.+)$/);
    
    if (match) {
      const [, isim, süreStr, üretici, girdiler] = match;
      
      const süre = parseInt(süreStr, 10);
      const gerekli = [];

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
    
    // Match lines in the format: "Name: Xrp, materials" (for features)
    const featureMatch = trimmedLine.match(/^([^:]+):\s*(\d+)rp,\s*(.+)$/);
    
    if (featureMatch) {
      const [, isim, rpStr, girdiler] = featureMatch;
      
      const süre = 0; // Features have 0 time
      const üretici = 'Feature';
      const gerekli = [];

      // Parse ingredients - handle both "-" (no ingredients) and actual ingredient lists
      if (girdiler.trim() !== '-' && girdiler.trim() !== '' && girdiler.trim() !== '.') {
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
          } else if (malzeme.trim() !== '-') {
            // Handle cases where there's no quantity (implicit 1)
            gerekli.push({
              isim: malzeme.trim(),
              adet: 1
            });
          }
        }
      }

      urunler.push({
        isim: isim.trim(),
        süre,
        üretici,
        gerekli
      });
    }
    
    // Special case for Research Point which has format "Research Point: -,-"
    const specialMatch = trimmedLine.match(/^([^:]+):\s*-,?\s*-$/);
    if (specialMatch) {
      const [, isim] = specialMatch;
      
      urunler.push({
        isim: isim.trim(),
        süre: 0,
        üretici: 'Feature',
        gerekli: []
      });
    }
  }

  return urunler;
}