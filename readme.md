🎨 AI Prompt: Startup Company Production Planner UI Enhancement
Layout Structure (CRITICAL - ÇOK ÖNEMLİ)
Grid System:

Container genişliği: MAX 1280px
Container yüksekliği: MAX 720px
4 Sütun düzeni: 1 + 2 + 3 + 2 = 8 birim (toplam 1280px)

Sütun 1 (Sidebar): 160px (1/8 × 1280)
Sütun 2 (Items): 320px (2/8 × 1280)
Sütun 3 (Queue): 480px (3/8 × 1280)
Sütun 4 (Summary): 320px (2/8 × 1280)


Sütunlar arası gap hesaba kat (her sütundan biraz düş)
HER SÜTUN SABİT YÜKSEKLİK: 720px - içerik taşarsa scroll
Sütunlar asla genişlemez veya uzamaz
Mobile'da dikey stack olabilir (responsive)

Column 1: Category Sidebar (160px)

Yükseklik: 720px (sabit)
Search input üstte
Kategori listesi (scroll)
Overflow-y: auto

Column 2: Items List (320px)

Yükseklik: 720px (sabit)
Search + Quantity input üstte (sticky)
Item kartları (scroll)
Overflow-y: auto

Column 3: Production Queue (480px) - EN GENİŞ

Yükseklik: 720px (sabit)
Header + Stats üstte (sticky)
Queue items (scroll)
Overflow-y: auto

Column 4: Production Summary (320px)

Yükseklik: 720px (sabit)
Header üstte
Production details (scroll)
Overflow-y: auto


Visual Enhancements
Animations:

Buton hover: scale(1.05) + mor glow
Kart hover: translateY(-2px) + shadow artışı
Item eklenirken: fade-in + slide-in (300ms)
Item silinirken: fade-out + scale(0.95) (200ms)
Quantity badge değişiminde: pulse animasyon
Tüm transition: 200-300ms ease

Typography:

Başlıklar: font-bold, proper hierarchy
Body text: minimum 12px
Line-height: 1.5 (body), 1.2 (headings)
Sayılar için: font-bold, daha büyük

Color & Contrast:

Mor gradient tema koru
Text contrast: WCAG AA minimum
Badge'ler: daha canlı, saturated renkler
Hover: %10-15 daha açık
Status: yeşil (complete), mavi (progress)

Spacing (4px grid):

Card padding: p-3 veya p-4
Gap between items: gap-3
Section margins: mb-4, mt-4
Consistent spacing her yerde

Component Polish:

Border radius: rounded-lg (cards), rounded-full (badges)
Shadows: subtle default, enhanced hover
Borders: 1px solid white/10 veya purple/20
Glassmorphism: backdrop-blur-lg

Interactive Elements:

Quantity input'a +/- stepper butonlar ekle
Production Queue'da "Clear All" butonu ekle
Search input'ta X (clear) butonu ekle
Kategori badge'lerinde item sayısı göster: "Module (15)"
Hover tooltip'ler (opsiyonel, düşük öncelik)

Empty States:

Center-aligned icon + text
"Add items to start planning" gibi yardımcı mesaj
Subtle fade pulse animasyon

Technical Requirements

Tailwind CSS kullan
React hooks (useState, useMemo)
CSS transitions (transition-all duration-200)
localStorage KULLANMA (sadece memory)
Lucide React icons
Mevcut fonksiyonaliteyi koru
Re-render optimizasyonu

Priority Order

Sütun genişlikleri düzelt (1:2:3:2) + 720px max height (İLK ÖNCE BU)
Scrollbar styling (custom, güzel görünümlü)
Animasyonlar ve micro-interactions
Typography ve spacing iyileştirme
Interactive özellikler (+/- buttons, clear all)