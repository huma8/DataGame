import { Malzeme, GerekliMalzeme, malzemeler } from './malzeme-model';

// Veritabanı modeli
class MalzemeVeritabani {
  private malzemeListesi: Malzeme[] = [];

  constructor() {
    // Başlangıçta tüm malzemeleri yükle
    this.malzemeListesi = [...malzemeler];
  }

  // Belirli bir malzeme ismine göre malzeme bul
  bul(isim: string): Malzeme | undefined {
    return this.malzemeListesi.find(m => m.isim === isim);
  }

  // Tüm malzemeleri getir
  tumMalzemeler(): Malzeme[] {
    return [...this.malzemeListesi];
  }

  // Belirli bir üreticiye göre malzemeleri filtrele
  ureticiyeGoreFiltrele(uretici: string): Malzeme[] {
    return this.malzemeListesi.filter(m => m.uretici === uretici);
  }

  // Gerekli malzemesi olmayan (temel) malzemeleri getir
  temelMalzemeleriGetir(): Malzeme[] {
    return this.malzemeListesi.filter(m => m.gerekliMalzemeler.length === 0);
  }

  // Belirli bir malzemenin üretimini gerçekleştirebilir mi kontrol et
  uretimYapilabilirMi(isim: string, stoklar: { [key: string]: number }): boolean {
    const malzeme = this.bul(isim);
    if (!malzeme) return false;

    // Gerekli tüm malzemelerin yeterli miktarda stokta olup olmadığını kontrol et
    for (const gerekli of malzeme.gerekliMalzemeler) {
      const stoktaMiktar = stoklar[gerekli.isim] || 0;
      if (stoktaMiktar < gerekli.miktar) {
        return false;
      }
    }

    return true;
  }

  // Belirli bir malzeme için gerekli olan toplam temel malzeme miktarını hesapla (rekürsif)
  gerekliTemelMalzemeMiktarlari(isim: string, miktar: number = 1): { [key: string]: number } {
    const sonuc: { [key: string]: number } = {};
    const malzeme = this.bul(isim);

    if (!malzeme) return sonuc;

    // Eğer temel malzeme ise doğrudan miktarı ekle
    if (malzeme.gerekliMalzemeler.length === 0) {
      sonuc[isim] = miktar;
      return sonuc;
    }

    // Gerekli malzemeleri gez ve toplam miktarları hesapla
    for (const gerekli of malzeme.gerekliMalzemeler) {
      const gerekliTotalMiktar = gerekli.miktar * miktar;
      const altMalzemeMiktarlari = this.gerekliTemelMalzemeMiktarlari(gerekli.isim, gerekliTotalMiktar);

      for (const [altMalzemeIsim, altMiktar] of Object.entries(altMalzemeMiktarlari)) {
        if (sonuc[altMalzemeIsim]) {
          sonuc[altMalzemeIsim] += altMiktar;
        } else {
          sonuc[altMalzemeIsim] = altMiktar;
        }
      }
    }

    return sonuc;
  }

  // Belirli bir malzemenin üretimindeki toplam zamanı hesapla (rekürsif)
  toplamUretimSuresi(isim: string, miktar: number = 1): number {
    const malzeme = this.bul(isim);
    if (!malzeme) return 0;

    let sure = malzeme.uretimSuresi * miktar;

    // Gerekli malzemelerin üretim sürelerini ekle
    for (const gerekli of malzeme.gerekliMalzemeler) {
      sure += this.toplamUretimSuresi(gerekli.isim, gerekli.miktar * miktar);
    }

    return sure;
  }

  // Yeni malzeme ekle (dinamik olarak)
  ekle(yeniMalzeme: Malzeme): void {
    // Aynı isimde başka bir malzeme var mı kontrol et
    const varMi = this.bul(yeniMalzeme.isim);
    if (varMi) {
      throw new Error(`Bu isimde zaten bir malzeme var: ${yeniMalzeme.isim}`);
    }
    
    this.malzemeListesi.push(yeniMalzeme);
  }

  // Var olan malzeme güncelle
  guncelle(guncellenenMalzeme: Malzeme): void {
    const index = this.malzemeListesi.findIndex(m => m.isim === guncellenenMalzeme.isim);
    if (index === -1) {
      throw new Error(`Güncellenmek istenen malzeme bulunamadı: ${guncellenenMalzeme.isim}`);
    }
    
    this.malzemeListesi[index] = guncellenenMalzeme;
  }

  // Malzeme sil
  sil(isim: string): void {
    const index = this.malzemeListesi.findIndex(m => m.isim === isim);
    if (index === -1) {
      throw new Error(`Silinecek malzeme bulunamadı: ${isim}`);
    }
    
    this.malzemeListesi.splice(index, 1);
  }
}

// Singleton desen ile veritabanı örneği
const malzemeDB = new MalzemeVeritabani();

export { MalzemeVeritabani, malzemeDB };