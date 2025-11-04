import { Malzeme, GerekliMalzeme } from './malzeme-model';
import { malzemeDB } from './veritabani-model';

interface UretimSiparisi {
  malzeme: string;
  miktar: number;
}

interface UretimSonucu {
  tamamlanan: string[];
  basarisiz: string[];
  toplamSure: number;
}

interface Stok {
  [key: string]: number;
}

// Üretim motoru
class UretimMotoru {
  private stok: Stok = {};

  constructor() {
    // Başlangıç stoklarını ayarla (tüm malzemeler 0 ile başlar)
    const tumMalzemeler = malzemeDB.tumMalzemeler();
    for (const malzeme of tumMalzemeler) {
      this.stok[malzeme.isim] = 0;
    }
  }

  // Malzeme stoğunu artır
  stokEkle(isim: string, miktar: number): void {
    if (this.stok[isim] !== undefined) {
      this.stok[isim] += miktar;
    } else {
      throw new Error(`Bilinmeyen malzeme ismi: ${isim}`);
    }
  }

  // Malzeme stoğunu azalt
  stokAzalt(isim: string, miktar: number): boolean {
    if (this.stok[isim] !== undefined && this.stok[isim] >= miktar) {
      this.stok[isim] -= miktar;
      return true;
    }
    return false;
  }

  // Mevcut stoğu getir
  mevcutStok(isim: string): number {
    return this.stok[isim] || 0;
  }

  // Belirli bir malzeme üretimi için gerekli üretim sırasını oluştur (topolojik sıralama)
  uretimSirasi(malzeme: string, miktar: number = 1): UretimSiparisi[] {
    const sonuc: UretimSiparisi[] = [];
    const ziyaretEdilen = new Set<string>();
    const malzemeNesnesi = malzemeDB.bul(malzeme);
    
    if (!malzemeNesnesi) {
      throw new Error(`Bilinmeyen malzeme ismi: ${malzeme}`);
    }

    const gez = (isim: string, miktar: number) => {
      if (ziyaretEdilen.has(isim)) return;
      ziyaretEdilen.add(isim);

      // Gerekli malzemeleri gez
      for (const gerekli of malzemeNesnesi.gerekliMalzemeler) {
        gez(gerekli.isim, gerekli.miktar * miktar);
      }

      // Bu malzeme için üretim emrini ekle
      sonuc.push({ malzeme: isim, miktar: miktar });
    };

    gez(malzeme, miktar);
    
    return sonuc;
  }

  // Gerçek üretim işlemini gerçekleştir
  uret(malzeme: string, miktar: number = 1): UretimSonucu {
    // Gerekli malzemeleri kontrol et ve stoğu güncelle
    const uretimEmirleri = this.uretimSirasi(malzeme, miktar);
    const tamamlanan: string[] = [];
    const basarisiz: string[] = [];
    let toplamSure = 0;

    for (const emir of uretimEmirleri) {
      const malzemeNesnesi = malzemeDB.bul(emir.malzeme);
      if (!malzemeNesnesi) {
        basarisiz.push(emir.malzeme);
        continue;
      }

      // Gerekli malzemeleri kontrol et
      let yeterliMalzeme = true;
      for (const gerekli of malzemeNesnesi.gerekliMalzemeler) {
        const gerekliToplam = gerekli.miktar * emir.miktar;
        if (this.mevcutStok(gerekli.isim) < gerekliToplam) {
          yeterliMalzeme = false;
          break;
        }
      }

      if (yeterliMalzeme) {
        // Gerekli malzemeleri kullan
        for (const gerekli of malzemeNesnesi.gerekliMalzemeler) {
          this.stokAzalt(gerekli.isim, gerekli.miktar * emir.miktar);
        }

        // Yeni malzemeyi üret
        this.stokEkle(emir.malzeme, emir.miktar);
        tamamlanan.push(emir.malzeme);
        toplamSure += malzemeNesnesi.uretimSuresi * emir.miktar;
      } else {
        basarisiz.push(emir.malzeme);
      }
    }

    return {
      tamamlanan,
      basarisiz,
      toplamSure
    };
  }

  // Toplu üretim
  topluUret(siparisler: UretimSiparisi[]): UretimSonucu {
    const tamamlanan: string[] = [];
    const basarisiz: string[] = [];
    let toplamSure = 0;

    for (const siparis of siparisler) {
      const sonuc = this.uret(siparis.malzeme, siparis.miktar);
      tamamlanan.push(...sonuc.tamamlanan);
      basarisiz.push(...sonuc.basarisiz);
      toplamSure += sonuc.toplamSure;
    }

    return {
      tamamlanan: Array.from(new Set(tamamlanan)), // Tekrar edenleri kaldır
      basarisiz: Array.from(new Set(basarisiz)), // Tekrar edenleri kaldır
      toplamSure
    };
  }

  // Tüm stokları getir
  tumStoklariGetir(): Stok {
    return { ...this.stok };
  }

  // Belirli malzeme türlerine göre stokları topluca getir
  kategoriyeGoreStok(uretici: string): Stok {
    const sonuc: Stok = {};
    const tumMalzemeler = malzemeDB.tumMalzemeler().filter(m => m.uretici === uretici);
    
    for (const malzeme of tumMalzemeler) {
      if (this.stok[malzeme.isim] > 0) {
        sonuc[malzeme.isim] = this.stok[malzeme.isim];
      }
    }
    
    return sonuc;
  }
}

// Genel üretim fonksiyonları
const uretimFonksiyonlari = {
  // Belirli bir malzemenin üretim grafiğini oluştur
  uretimGrafigi(malzeme: string): Malzeme[] {
    const graf: Malzeme[] = [];
    const ziyaretEdilen = new Set<string>();
    
    const gez = (isim: string) => {
      if (ziyaretEdilen.has(isim)) return;
      ziyaretEdilen.add(isim);

      const malzemeNesnesi = malzemeDB.bul(isim);
      if (malzemeNesnesi) {
        graf.push(malzemeNesnesi);
        
        for (const gerekli of malzemeNesnesi.gerekliMalzemeler) {
          gez(gerekli.isim);
        }
      }
    };

    gez(malzeme);
    return graf;
  },

  // Bir malzemenin üretimindeki toplam adım sayısını döndür
  uretimAdimSayisi(malzeme: string): number {
    const graf = uretimFonksiyonlari.uretimGrafigi(malzeme);
    return graf.length;
  },

  // En uzun üretim zinciri boyunca geçen toplam süreyi hesapla
  enUzunUretimSuresi(malzeme: string): number {
    return malzemeDB.toplamUretimSuresi(malzeme);
  }
};

// Singleton desen ile üretim motoru örneği
const uretimMotoru = new UretimMotoru();

export { UretimMotoru, uretimFonksiyonlari, uretimMotoru, Stok, UretimSiparisi, UretimSonucu };