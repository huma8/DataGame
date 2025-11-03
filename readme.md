🔧 Planlanan Çalışma Mantığı
1️⃣ Veri Okuma

malzemeler.txt dosyasındaki her satır bir “recipe” olarak parse edilecek:
<Ürün Adı>: <süre>, <üretici>, <girdiler>
Girdiler varsa + ile ayrılacak (örnek: 1 Backend Component + 1 Network Component).

2️⃣ Task Dictionary Yapısı

Her ürün için şu formatta bir sözlük oluşturulacak:
{
  "isim": "Payment Gateway Module",
  "süre": 76,
  "üretici": "Lead Developer(expert)",
  "gerekenler": [
      {"isim": "Database Layer", "adet": 1},
      {"isim": "API Client Module", "adet": 1},
      {"isim": "Authentication Module", "adet": 1}
  ]
}

3️⃣ Recursive Hesaplama

Fonksiyon hesapla("Payment Gateway Module") çağrıldığında:

Ürün için gereken alt bileşenler bulunur.

Her biri için hesapla() tekrar çağrılır.

En dipte hammaddeye ulaşıldığında (- girdi yoksa) geri döner.

Tüm ağaçtan toplanan:

Toplam süre,

Ham madde adetleri,

Üretici zinciri
döndürülür.

4️⃣ Örnek Sonuç
Üretim: Payment Gateway Module
Toplam Süre: 370 saat
Ham Maddeler:
 - Database Component: 3
 - Backend Component: 5
 - Network Component: 2
 - Compression Component: 3
Üretim Zinciri:
 Designer(beginner) → Developer(beginner) → Lead Developer(expert)


iki fonksiyon kullanılabilecek, örneğin:
çıkar_hammaddeler("Payment Gateway Module")
çıkar_toplam_üretimler("Payment Gateway Module")


🔧 Fonksiyon Mantığı — çıkar_toplam_üretimler(ürün_ismi, adet=1)
Adım Adım İşleyiş

Başlangıçta örneğin "Payment Gateway Module", adet=1 girilir.

Fonksiyon:

Önce bu ürünün alt bileşenlerini inceler:
→ Database Layer:1, API Client Module:1, Authentication Module:1

Her biri için recursive olarak tekrar çalışır.

Her çağrı dönüşünde bir global veya üst dictionary’ye şu şekilde ekleme yapılır:
toplam_üretimler["Database Layer"] += 1
toplam_üretimler["API Client Module"] += 1
toplam_üretimler["Authentication Module"] += 1

Eğer bir alt bileşenin de alt bileşenleri varsa, onlar da aynı şekilde genişletilir.

Sonuç olarak her şeyin ne kadar üretileceği görünür.

Örnek Sonuç
Üretim planı: Payment Gateway Module (1 adet)

Toplam Üretim Listesi:
- Payment Gateway Module: 1
- Database Layer: 1
- API Client Module: 1
- Authentication Module: 1
- Backend Module: 3
- Network Component: 2
- Database Component: 2
- Compression Component: 2
- Encryption Component: 1

Yani bu liste tam üretim sırasını gösterir — her ne kadar alt bileşenlerin bir kısmı ham madde olsa da — “bu zincir boyunca neler üretilecek” sorusuna yanıt verir.



lütfen bu kısıma uyarla bu istediklerimi. kodu optimize et. görüntüyü bozma
<div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"><h2 class="text-2xl font-bold text-white mb-4">📋 Üretim Kuyruğu</h2><div class="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4 mb-4"><div class="text-white"><div class="flex justify-between items-center mb-2"><span class="font-semibold">Toplam Süre:</span><span class="text-2xl font-bold">0h</span></div><div class="flex justify-between items-center"><span class="font-semibold">Malzeme Sayısı:</span><span class="text-xl">0</span></div></div></div><div class="space-y-2 max-h-[400px] overflow-y-auto pr-2"><div class="text-center text-gray-400 py-8"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package mx-auto mb-2 opacity-50"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg><p>Henüz malzeme eklenmedi</p></div></div><div class="mt-6 border-t border-white/20 pt-4"><h3 class="text-lg font-bold text-white mb-3">📊 Toplam Üretim Özeti</h3><div class="bg-white/5 border border-white/10 rounded-lg p-3"><p class="text-gray-400 text-sm">Henüz üretim yapılmadı</p></div></div></div>