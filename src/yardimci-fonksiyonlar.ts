import { Malzeme, GerekliMalzeme } from './malzeme-model';
import { malzemeDB } from './veritabani-model';
import { uretimMotoru, UretimSiparisi, uretimFonksiyonlari } from './uretim-fonksiyonlari';

// Yardımcı fonksiyonlar
const yardimciFonksiyonlar = {
  // Belirli bir üretici seviyesine göre malzeme listesi getir
  seviyeyeGoreMalzemeler: (seviye: 'beginner' | 'intermediate' | 'expert'): Malzeme[] => {
    return malzemeDB.tumMalzemeler().filter(m => 
      m.uretici.includes(`(${seviye})`)
    );
  },

  // En çok kullanılan malzemeleri listele
  enCokKullanilanMalzemeler: (): { isim: string; kullanilmaSayisi: number }[] => {
    const kullanilmaSayilari: { [key: string]: number } = {};

    // Tüm malzemelerin gerekli malzeme listelerini gez
    for (const malzeme of malzemeDB.tumMalzemeler()) {
      for (const gerekli of malzeme.gerekliMalzemeler) {
        if (kullanilmaSayilari[gerekli.isim]) {
          kullanilmaSayilari[gerekli.isim] += gerekli.miktar;
        } else {
          kullanilmaSayilari[gerekli.isim] = gerekli.miktar;
        }
      }
    }

    // Sonuçları sırala
    return Object.entries(kullanilmaSayilari)
      .map(([isim, kullanilmaSayisi]) => ({ isim, kullanilmaSayisi }))
      .sort((a, b) => b.kullanilmaSayisi - a.kullanilmaSayisi);
  },

  // En uzun üretim süresine sahip malzemeleri listele
  enUzunUretimSurenMalzemeler: (sinir: number = 10): Malzeme[] => {
    return malzemeDB.tumMalzemeler()
      .map(m => ({ ...m, toplamSure: malzemeDB.toplamUretimSuresi(m.isim) }))
      .sort((a, b) => b.toplamSure - a.toplamSure)
      .slice(0, sinir)
      .map(({ toplamSure, ...m }) => m); // toplamSure alanını kaldır
  },

  // Belirli bir malzeme ile üretilebilecek tüm ürünleri bul
  kullanildigiTumUrunler: (malzeme: string): string[] => {
    return malzemeDB.tumMalzemeler()
      .filter(m => m.gerekliMalzemeler.some(g => g.isim === malzeme))
      .map(m => m.isim);
  },

  // Belirli bir kategorideki (üretici) toplam üretim süresini hesapla
  kategoriToplamSure: (uretici: string): number => {
    return malzemeDB.tumMalzemeler()
      .filter(m => m.uretici === uretici)
      .reduce((toplam, m) => toplam + m.uretimSuresi, 0);
  },

  // Bir malzemenin üretim derinliğini (kaç seviye girdiğini) hesapla
  uretimDerinligi: (malzeme: string): number => {
    const gez = (isim: string, ziyaretEdilen: Set<string>): number => {
      if (ziyaretEdilen.has(isim)) return 0;
      ziyaretEdilen.add(isim);
      
      const m = malzemeDB.bul(isim);
      if (!m || m.gerekliMalzemeler.length === 0) {
        return 0;
      }
      
      return 1 + Math.max(...m.gerekliMalzemeler.map(g => gez(g.isim, new Set(ziyaretEdilen))));
    };
    
    return gez(malzeme, new Set());
  },

  // Üretim öncesi kontrol: bir malzeme üretimi için gerekli tüm girdilerin stoğu yeterli mi?
  uretimOncesiKontrol: (siparis: UretimSiparisi): { uygun: boolean; eksikler: { isim: string; eksikMiktar: number }[] } => {
    const eksikler: { isim: string; eksikMiktar: number }[] = [];
    const uygun = true;

    // Gerekli temel malzeme miktarlarını hesapla
    const gerekliTemelMalzemeler = malzemeDB.gerekliTemelMalzemeMiktarlari(siparis.malzeme, siparis.miktar);

    for (const [malzeme, miktar] of Object.entries(gerekliTemelMalzemeler)) {
      const stok = uretimMotoru.mevcutStok(malzeme);
      if (stok < miktar) {
        eksikler.push({ isim: malzeme, eksikMiktar: miktar - stok });
      }
    }

    return {
      uygun: eksikler.length === 0,
      eksikler
    };
  },

  // Malzeme üretim planı oluştur (tüm gerekli malzemelerin üretim sırası)
  uretimPlani: (hedefMalzeme: string, miktar: number = 1): UretimSiparisi[] => {
    return uretimMotoru.uretimSirasi(hedefMalzeme, miktar);
  },

  // Sistem istatistikleri
  sistemIstatistikleri: () => {
    const tumMalzemeler = malzemeDB.tumMalzemeler();
    const temelMalzemeler = malzemeDB.temelMalzemeleriGetir();

    return {
      toplamMalzemeSayisi: tumMalzemeler.length,
      temelMalzemeSayisi: temelMalzemeler.length,
      uretilebilirMalzemeSayisi: tumMalzemeler.length - temelMalzemeler.length,
      ortalamaUretimSuresi: tumMalzemeler.reduce((toplam, m) => toplam + m.uretimSuresi, 0) / tumMalzemeler.length,
      enUzunUretimSuresi: Math.max(...tumMalzemeler.map(m => m.uretimSuresi)),
      enKisaUretimSuresi: Math.min(...tumMalzemeler.map(m => m.uretimSuresi)),
      enCokKullanilan: yardimciFonksiyonlar.enCokKullanilanMalzemeler()[0]?.isim || 'Yok',
      enFazlaUretimDerinligi: Math.max(...tumMalzemeler.map(m => yardimciFonksiyonlar.uretimDerinligi(m.isim)))
    };
  }
};

// Sistem durumu raporu
const sistemRaporu = () => {
  const istatistikler = yardimciFonksiyonlar.sistemIstatistikleri();
  const stoklar = uretimMotoru.tumStoklariGetir();
  const sifirOlanStoklar = Object.entries(stoklar).filter(([_, miktar]) => miktar === 0).length;
  
  return {
    istatistikler,
    stokDurumu: {
      toplamFarkliMalzeme: Object.keys(stoklar).length,
      toplamStokAdedi: Object.values(stoklar).reduce((toplam, miktar) => toplam + miktar, 0),
      sifirStokAdedi: sifirOlanStoklar,
      doluStokAdedi: Object.keys(stoklar).length - sifirOlanStoklar
    },
    enCokStoklanan: Object.entries(stoklar).sort(([,a], [,b]) => b - a)[0] || ['Yok', 0]
  };
};

export { yardimciFonksiyonlar, sistemRaporu };