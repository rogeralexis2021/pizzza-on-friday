/* ANDARA — all copy, prices and market rules for both site versions.
   Edit text here; app.js only renders it. */
window.ANDARA = (function () {
  const products = [
    { id: 'trail', name: 'Frailejón Trail', img: 'trail', rating: 4.9, reviews: { nz: 38, hu: 21 }, price: { nz: 289, hu: 49990 }, bestseller: true },
    { id: 'chelsea', name: 'Andes Chelsea', img: 'chelsea', rating: 4.8, reviews: { nz: 27, hu: 16 }, price: { nz: 259, hu: 42990 } },
    { id: 'ciudad', name: 'Ciudad Sneaker', img: 'ciudad', rating: 4.7, reviews: { nz: 44, hu: 29 }, price: { nz: 219, hu: 34990 } }
  ];

  const nz = {
    code: 'nz', htmlLang: 'en-NZ', label: 'NZ · English', short: 'NZ · EN',
    currency: 'NZD', sizeSystem: 'UK',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    defaultSize: 9,
    announce: ['Tracked shipping to New Zealand in 8–12 days', 'Free size exchange within 30 days', 'Afterpay available'],
    nav: { home: 'Home', ai: 'AI Proposal', strategy: 'Strategy', market: 'Our market today' },
    menu: 'Menu', close: 'Close',
    bag: 'Bag', marketSwitch: 'Choose your country',
    footerText: 'Handmade leather shoes from Bucaramanga, Colombia, shipped direct to New Zealand and Hungary.',
    footerHelp: 'Help & legal', footerContact: 'Contact', footerPay: 'We accept',
    legalLinks: { terms: 'Terms & Conditions', disclaimer: 'Disclaimer', refund: 'Refund Policy', privacy: 'Privacy Policy' },
    copyright: '© 2026 ANDARA · Bucaramanga, Colombia · E-Business final project, Universidad de Medellín',
    credits: 'Photography: Unsplash (unsplash.com/license).',
    payments: ['Visa', 'Mastercard', 'Afterpay', 'PayPal', 'Apple Pay', 'Google Pay'],

    product: {
      trail: { type: 'Lace-up leather boot, lug sole', color: 'Cognac, full-grain' },
      chelsea: { type: 'Pull-on Chelsea boot', color: 'Dark brown, forest-green elastic' },
      ciudad: { type: 'Low-top leather sneaker', color: 'Tan, stitched cupsole' }
    },
    sizeRange: 'UK 6–12 · half sizes on request',
    reviewsWord: 'reviews',

    home: {
      title: 'Handmade in Colombia. <em>Made to walk</em> the world.',
      sub: 'Leather boots and sneakers cut and stitched by Andean artisans, sized right the first time with AI.',
      ctaShop: 'Shop the collection', ctaSize: 'Find my size',
      facts: ['Made in Bucaramanga', 'Ships to New Zealand'],
      gridTitle: 'The collection', gridNote: 'Sizes shown in UK / AU',
      bestseller: 'Bestseller', hover: 'Find my size',
      stats: [['120+', 'hand steps in every pair'], ['3 mm', 'full-grain Colombian leather'], ['UK 6–12', 'half sizes on request'], ['30 days', 'free size exchange']],
      aboutKicker: 'Who we are',
      aboutTitle: 'From the Andes to your door',
      about: [
        'ANDARA is a Colombian footwear brand. Every pair is cut and stitched by hand from Colombian leather by artisans in Bucaramanga, one of the country\'s oldest shoemaking towns, then shipped straight to you with no middlemen.',
        'Our name joins <em>andar</em>, to walk, with the Andes, where we come from. We use AI so you can buy leather boots online from the other side of the world and get the size right the first time.',
        'We work with two family tanneries in Santander and a workshop of eleven shoemakers. Each pair takes about two days to make.'
      ]
    },

    pdp: { size: 'Size (UK / AU)', add: 'Add to bag', added: 'Added to bag', findSize: 'Not sure? Find my size', pick: 'Select a size', payNote: (p) => `or 4 interest-free payments of ${p} with Afterpay`, made: 'Handmade to order in Bucaramanga · ships in 8–12 days' },

    bagPanel: {
      title: 'Your bag', empty: 'Your bag is empty.', remove: 'Remove', subtotal: 'Subtotal',
      duties: 'GST and import duties calculated at checkout.', checkout: 'Checkout',
      payWith: 'Pay with', place: 'Place order', back: 'Back to bag',
      done: 'Thank you. This is a demo store, so no payment was taken. In a live order you would now get tracked updates by email and WhatsApp.',
      afterpay: 'Afterpay: 4 interest-free payments of'
    },

    ai: {
      kicker: 'AI Proposal',
      title: '<em>Shoes that fit,</em> ordered from the other side of the world.',
      intro: 'Wrong size is the main reason people return shoes bought online, and a return from New Zealand to Colombia is slow and expensive. Our two AI tools tackle that worry before checkout. Both work live on this page.',
      tool: 'Tool',
      ff: {
        title: 'FitFinder', desc: 'Tell us a shoe you already own and FitFinder maps it to the ANDARA last.',
        mode: 'Start from', modeShoe: 'A shoe I own', modeFoot: 'My foot length',
        fit: 'Fit', men: "Men's", women: "Women's",
        brand: 'Brand you wear', other: 'Other',
        system: 'Sizing', size: 'Your size', foot: 'Foot length (cm)',
        pref: 'How do you like it to fit?', snug: 'Snug', regular: 'Regular', roomy: 'Roomy',
        width: 'Foot width', narrow: 'Narrow', wide: 'Wide',
        product: 'Shoe',
        result: 'Your ANDARA size',
        range: 'Outside our standard UK 6–12 range: message us on WhatsApp for a made-to-order pair.',
        confidence: '% of customers like you kept this size',
        add: (p, s) => `Add to cart · ${p}, ${s}`,
        notes: {
          normal: 'True to size for your profile. Wear it with normal socks.',
          wide: 'Wide foot: go for the Ciudad Sneaker or Andes Chelsea, they have a roomier toe box.',
          snug: 'You like a snug fit: leather softens and moulds to your foot within two weeks.',
          roomy: 'You like room: this size leaves space for thick hiking socks.'
        }
      },
      frai: {
        title: 'Frai, your shoe assistant', desc: 'Ask about shipping, returns, sizing or leather care, any time of day.',
        notice: 'You are chatting with Frai, ANDARA\'s AI assistant. Answers can be wrong; for orders, message our team on WhatsApp.',
        greeting: 'Kia ora! I\'m Frai. I can help with sizes, shipping to New Zealand, returns and leather care. What would you like to know?',
        quick: ['How long is shipping?', 'How do returns work?', 'How do I care for leather?', 'Which payment methods?'],
        placeholder: 'Type your question…', send: 'Send',
        metaAi: 'Frai · AI', metaKb: 'Frai · quick answer', typing: 'Frai is typing'
      },
      flowTitle: 'The customer journey', flowNote: 'A New Zealand customer, start to finish.',
      flow: [
        'Picks New Zealand and English with the flag switch',
        'Opens the Frailejón Trail from the home page',
        'Taps Find my size: FitFinder suggests UK 9',
        'Asks Frai how long shipping to Wellington takes',
        'Adds UK 9 to the cart and pays with Afterpay',
        'Gets tracked delivery updates by email and WhatsApp'
      ],
      buildTitle: 'How we would build it',
      build: [
        ['Data', 'Size, fit and return reasons from every order'],
        ['Model', 'Size model trained on returns plus a language model for Frai'],
        ['Platform', 'Shopify store, Afterpay and PayPal, WhatsApp Business'],
        ['Monitoring', 'Return rate, chat resolution rate, conversion']
      ]
    },

    strategy: {
      kicker: 'Strategy',
      title: '<em>One plan,</em> two markets.',
      intro: 'New Zealand buys premium and adventure. Hungary buys trust and good value for European-standard quality. Goals and budget are planning assumptions.',
      heads: ['New Zealand · developed', 'Hungary · emerging'],
      rows: [
        ['Objective (12 months)', '1,200 pairs sold, 3% site conversion', '1,500 pairs sold, 2% site conversion'],
        ['SEO', 'English content: "leather walking boots NZ", trail guides', 'Hungarian content: "bőrcipő", size and leather-care guides'],
        ['SEM', 'Google Ads on high-intent searches, larger budget', 'Google Ads on price and offer keywords, lower CPC'],
        ['SGE (AI search)', 'FAQ blocks and structured data on every product so AI answers cite us', 'Same in Hungarian, where local competition is thin'],
        ['UX', 'Fast site, two-step checkout, express wallets', 'Light mobile site, cash on delivery shown up front'],
        ['CX', 'Tracked express shipping, easy exchanges', 'Trust seals, reviews, support in Hungarian'],
        ['Business model', 'Premium direct-to-consumer (D2C)', 'D2C plus a local marketplace listing to build trust'],
        ['Marketing mix', 'Full range · premium price · web + international shipping · Instagram and outdoor creators', 'Entry models · accessible price · web + pick-up points · Facebook, Instagram, launch discounts'],
        ['Monthly budget', 'USD 1,500: 60% ads, 25% content, 15% tools', 'USD 800: 50% ads, 30% content, 20% tools'],
        ['Risks', 'Shipping cost and time; Australian brands', 'Distrust of foreign shops; cash habit; forint exchange rate'],
        ['Key success factors', 'Right size first time, reliable delivery, strong brand story', 'Cash on delivery, flawless Hungarian, reviews'],
        ['KPIs', 'Conversion, ROAS, return rate under 8%, NPS', 'Conversion, cost per acquisition, refused COD orders, NPS']
      ]
    },

    market: {
      kicker: 'Our market today',
      title: '<em>How each market</em> pays, talks and buys.',
      intro: 'The biggest difference is at checkout: New Zealand pays by card and buy-now-pay-later, while Hungary still prefers cash on delivery.',
      charts: [
        {
          title: 'New Zealand: share of online stores offering each method (2023)',
          bars: [['Visa', 97.9], ['Mastercard', 97.9], ['Afterpay', 54.2], ['PayPal', 46.2]],
          source: 'Source: ECDB, Top 5 Payment Providers Offered by New Zealand Online Stores 2023',
          url: 'https://ecommercedb.com/insights/top-5-payment-providers-offered-by-new-zealand-online-stores-2023/1006954'
        },
        {
          title: 'Hungary: how orders were paid at one large Hungarian webshop (Pepita.hu)',
          bars: [['Cash on delivery', 68], ['Card', 30], ['Bank transfer', 2]],
          source: 'Source: Trade Magazin',
          url: 'https://trademagazin.hu/en/a-magyar-vasarlok-egyre-tudatosabba'
        }
      ]
    },

    legal: {
      terms: {
        title: 'Terms & Conditions',
        body: [
          'These terms apply to orders placed on andara.co by customers in New Zealand. ANDARA is a brand based in Bucaramanga, Colombia.',
          'Prices are shown in New Zealand dollars. GST and any import duties are calculated and shown before you pay, so there is nothing to pay on delivery.',
          'Every pair is handmade, so small differences in grain and colour are part of the product, not a fault.',
          'Orders ship tracked in 8–12 business days. If a parcel is lost, we resend it or refund you in full.',
          'Nothing in these terms limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.'
        ]
      },
      disclaimer: {
        title: 'Disclaimer',
        body: [
          'This website is an E-Business final project for Universidad de Medellín. Products, prices, reviews and goals are illustrative, and no real orders or payments are processed.',
          'FitFinder gives a size suggestion based on the information you enter. It is a guide, not a guarantee.',
          'Frai is an AI assistant. Its answers can be wrong. For anything about an order, message our team on WhatsApp.',
          'Market data on this site comes from the public sources cited next to each chart.'
        ]
      },
      refund: {
        title: 'Refund Policy',
        body: [
          'Free size exchange: send back unworn shoes within 30 days of delivery and we send another size at no cost.',
          'Change of mind: unworn shoes can be returned within 30 days for a refund, minus return shipping.',
          'Faulty products: under the Consumer Guarantees Act you are entitled to a repair, replacement or refund. We cover all shipping costs.',
          'Refunds go back to the original payment method, including Afterpay, within 10 business days of us receiving the return.'
        ]
      },
      privacy: {
        title: 'Privacy Policy',
        body: [
          'We follow the New Zealand Privacy Act 2020.',
          'We collect only what we need to deliver your order: name, address, email, phone and the sizes you choose. FitFinder answers are used to improve size suggestions.',
          'Payments are handled by our payment providers (card, Afterpay, PayPal). We never see or store your full card number.',
          'Frai chat messages may be processed by an AI provider to generate answers. Do not share payment details in the chat.',
          'You can ask to see, correct or delete your data at any time: hola@andara.co.'
        ]
      }
    }
  };

  const hu = {
    code: 'hu', htmlLang: 'hu', label: 'HU · Magyar', short: 'HU · HU',
    currency: 'HUF', sizeSystem: 'EU',
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    defaultSize: 43,
    announce: ['Nyomon követett szállítás 7–10 nap alatt', 'Utánvétes fizetés', '14 napos elállási jog'],
    nav: { home: 'Főoldal', ai: 'MI-javaslat', strategy: 'Stratégia', market: 'Piacunk ma' },
    menu: 'Menü', close: 'Bezárás',
    bag: 'Kosár', marketSwitch: 'Válassz országot',
    footerText: 'Kézzel készült bőrcipők Bucaramangából, Kolumbiából, közvetlenül Új-Zélandra és Magyarországra.',
    footerHelp: 'Segítség és jogi információk', footerContact: 'Kapcsolat', footerPay: 'Fizetési módok',
    legalLinks: { terms: 'ÁSZF', disclaimer: 'Jogi nyilatkozat', refund: 'Visszaküldési szabályzat', privacy: 'Adatvédelem' },
    copyright: '© 2026 ANDARA · Bucaramanga, Kolumbia · E-Business záróprojekt, Universidad de Medellín',
    credits: 'Fotók: Unsplash (unsplash.com/license).',
    payments: ['Utánvét', 'Bankkártya', 'Barion', 'SimplePay'],

    product: {
      trail: { type: 'Fűzős bőrbakancs, profilos talp', color: 'Konyak, színbőr' },
      chelsea: { type: 'Belebújós Chelsea csizma', color: 'Sötétbarna, erdőzöld gumibetét' },
      ciudad: { type: 'Alacsony szárú bőr sneaker', color: 'Világosbarna, varrott talp' }
    },
    sizeRange: 'EU 39–46',
    reviewsWord: 'vélemény',

    home: {
      title: 'Kézzel készült Kolumbiában. <em>A világ minden</em> útjára.',
      sub: 'Andoki mesterek által szabott és varrt bőrcipők, mesterséges intelligenciával elsőre jó méretben.',
      ctaShop: 'A kollekció', ctaSize: 'Találd meg a méreted',
      facts: ['Bucaramangában készül', 'Szállítás Magyarországra'],
      gridTitle: 'A kollekció', gridNote: 'A méretek EU-méretben',
      bestseller: 'Legnépszerűbb', hover: 'Találd meg a méreted',
      stats: [['120+', 'kézi munkafázis minden párban'], ['3 mm', 'kolumbiai színbőr'], ['EU 39–46', 'fél méretek kérésre'], ['30 nap', 'ingyenes méretcsere']],
      aboutKicker: 'Rólunk',
      aboutTitle: 'Az Andokból egyenesen hozzád',
      about: [
        'Az ANDARA egy kolumbiai cipőmárka. Minden párat kolumbiai bőrből, kézzel szabnak és varrnak Bucaramanga mesterei, az ország egyik legrégebbi cipészvárosában, majd közvetítők nélkül, egyenesen hozzád szállítjuk.',
        'A nevünk az <em>andar</em> (járni) és az Andok szavakból született. Mesterséges intelligenciával segítünk, hogy online is elsőre eltaláld a méretedet.',
        'Két santanderi családi cserzőüzemmel és egy tizenegy cipészből álló műhellyel dolgozunk. Egy pár elkészítése körülbelül két nap.'
      ]
    },

    pdp: { size: 'Méret (EU)', add: 'Kosárba', added: 'Kosárba téve', findSize: 'Bizonytalan vagy? Találd meg a méreted', pick: 'Válassz méretet', payNote: () => 'Utánvéttel is fizethetsz a futárnál', made: 'Kézzel készül Bucaramangában · szállítás 7–10 nap' },

    bagPanel: {
      title: 'Kosarad', empty: 'A kosarad üres.', remove: 'Törlés', subtotal: 'Részösszeg',
      duties: 'A vámot és az áfát a pénztárnál kiszámoljuk.', checkout: 'Tovább a pénztárhoz',
      payWith: 'Fizetési mód', place: 'Megrendelem', back: 'Vissza a kosárhoz',
      done: 'Köszönjük! Ez egy bemutató áruház, így nem történt fizetés. Éles rendelésnél most nyomon követési értesítéseket kapnál e-mailben.',
      afterpay: ''
    },

    ai: {
      kicker: 'MI-javaslat',
      title: '<em>Tökéletes cipő,</em> a világ másik végéről.',
      intro: 'Az online vett cipők visszaküldésének fő oka a rossz méret, Kolumbiába pedig a visszaküldés lassú és drága. Két MI-eszközünk még a fizetés előtt megoldja ezt. Mindkettő élőben működik ezen az oldalon.',
      tool: 'Eszköz',
      ff: {
        title: 'FitFinder', desc: 'Add meg egy cipődet, és a FitFinder átszámolja az ANDARA kaptafájára.',
        mode: 'Kiindulás', modeShoe: 'Meglévő cipőm', modeFoot: 'Lábhosszam',
        fit: 'Fazon', men: 'Férfi', women: 'Női',
        brand: 'Milyen márkát hordasz?', other: 'Egyéb',
        system: 'Méretrendszer', size: 'Méreted', foot: 'Lábhossz (cm)',
        pref: 'Milyen illeszkedést szeretsz?', snug: 'Szoros', regular: 'Normál', roomy: 'Laza',
        width: 'Lábszélesség', narrow: 'Keskeny', wide: 'Széles',
        product: 'Cipő',
        result: 'Az ANDARA-méreted',
        range: 'Ez kívül esik az EU 39–46 mérettartományunkon: írj WhatsAppon egyedi rendelésért.',
        confidence: '% — a hozzád hasonló vásárlók közül ennyien tartották meg ezt a méretet',
        add: (p, s) => `Kosárba · ${p}, ${s}`,
        notes: {
          normal: 'A profilod alapján méretre pontos. Normál zoknival viseld.',
          wide: 'Széles lábfej: válaszd a Ciudad Sneakert vagy az Andes Chelsea-t, ezeknek tágasabb az orra.',
          snug: 'Szoros illeszkedést szeretsz: a bőr két héten belül felveszi a lábad formáját.',
          roomy: 'Lazább illeszkedést szeretsz: ez a méret vastag túrazoknihoz is elég.'
        }
      },
      frai: {
        title: 'Frai, a cipőasszisztensed', desc: 'Kérdezz szállításról, visszaküldésről, méretről vagy bőrápolásról, a nap bármely szakában.',
        notice: 'Egy MI-asszisztenssel, Fraival beszélsz. A válaszok tévedhetnek; rendeléssel kapcsolatban írj csapatunknak WhatsAppon.',
        greeting: 'Szia! Frai vagyok. Segítek a méretben, a magyarországi szállításban, a visszaküldésben és a bőrápolásban. Miben segíthetek?',
        quick: ['Mennyi idő a szállítás?', 'Hogyan küldhetem vissza?', 'Hogyan ápoljam a bőrt?', 'Fizethetek utánvéttel?'],
        placeholder: 'Írd ide a kérdésed…', send: 'Küldés',
        metaAi: 'Frai · MI', metaKb: 'Frai · gyors válasz', typing: 'Frai ír'
      },
      flowTitle: 'A vásárlói út', flowNote: 'Egy magyar vásárló, az elejétől a végéig.',
      flow: [
        'A zászlóval kiválasztja Magyarországot és a magyar nyelvet',
        'A főoldalon megnyitja a Frailejón Trailt',
        'A Találd meg a méreted gombra a FitFinder EU 43-at ajánl',
        'Megkérdezi Fraitól, fizethet-e utánvéttel',
        'EU 43-ban kosárba teszi, és utánvéttel rendel',
        'Nyomon követési értesítéseket kap e-mailben'
      ],
      buildTitle: 'Hogyan építenénk fel',
      build: [
        ['Adatok', 'Méret, illeszkedés és visszaküldési okok minden rendelésből'],
        ['Modell', 'Visszaküldéseken tanított méretmodell és egy nyelvi modell Fraihoz'],
        ['Platform', 'Shopify áruház, Barion és SimplePay, utánvét a futárcégen át'],
        ['Monitorozás', 'Visszaküldési arány, chat-megoldási arány, konverzió']
      ]
    },

    strategy: {
      kicker: 'Stratégia',
      title: '<em>Egy terv,</em> két piac.',
      intro: 'Új-Zélandon a prémium élményt és a kalandot adjuk el, Magyarországon a bizalmat és az európai minőséget jó áron. A célok és a költségvetés tervezési feltételezések.',
      heads: ['Új-Zéland · fejlett piac', 'Magyarország · feltörekvő piac'],
      rows: [
        ['Cél (12 hónap)', '1200 eladott pár, 3%-os konverzió', '1500 eladott pár, 2%-os konverzió'],
        ['SEO', 'Angol tartalom: „leather walking boots NZ”, túraútmutatók', 'Magyar tartalom: „bőrcipő”, méret- és bőrápolási útmutatók'],
        ['SEM', 'Google Ads magas szándékú keresésekre, nagyobb kerettel', 'Google Ads ár- és akciós kulcsszavakra, alacsonyabb CPC'],
        ['SGE (MI-alapú keresés)', 'GYIK-blokkok és strukturált adatok minden terméknél, hogy az MI-válaszok minket idézzenek', 'Ugyanez magyarul, ahol kevés a helyi verseny'],
        ['UX', 'Gyors oldal, kétlépéses fizetés, gyors pénztárcák', 'Könnyű mobiloldal, az utánvét jól látható helyen'],
        ['CX', 'Nyomon követett expressz szállítás, egyszerű csere', 'Bizalmi jelvények, vélemények, magyar nyelvű ügyfélszolgálat'],
        ['Üzleti modell', 'Prémium, közvetlen értékesítés (D2C)', 'D2C és egy hazai piactér a bizalomépítéshez'],
        ['Marketingmix', 'Teljes kínálat · prémium ár · web + nemzetközi szállítás · Instagram és outdoor alkotók', 'Belépő modellek · elérhető ár · web + átvevőpontok · Facebook, Instagram, bevezető kedvezmények'],
        ['Havi költségvetés', '1500 USD: 60% hirdetés, 25% tartalom, 15% eszközök', '800 USD: 50% hirdetés, 30% tartalom, 20% eszközök'],
        ['Kockázatok', 'Szállítási költség és idő; ausztrál márkák', 'Bizalmatlanság a külföldi boltokkal; készpénzes szokások; forintárfolyam'],
        ['Kulcsfontosságú sikertényezők', 'Elsőre jó méret, megbízható szállítás, erős márkatörténet', 'Utánvét, hibátlan magyar nyelv, vélemények'],
        ['KPI-ok', 'Konverzió, ROAS, 8% alatti visszaküldési arány, NPS', 'Konverzió, ügyfélszerzési költség, át nem vett utánvétes csomagok, NPS']
      ]
    },

    market: {
      kicker: 'Piacunk ma',
      title: '<em>Hogyan fizet,</em> kommunikál és vásárol a két piac.',
      intro: 'A legnagyobb különbség a pénztárnál van: Új-Zélandon kártyával és részletre fizetnek, Magyarországon még az utánvét a kedvenc.',
      charts: [
        {
          title: 'Új-Zéland: az egyes fizetési módokat kínáló webáruházak aránya (2023)',
          bars: [['Visa', 97.9], ['Mastercard', 97.9], ['Afterpay', 54.2], ['PayPal', 46.2]],
          source: 'Forrás: ECDB, Top 5 Payment Providers Offered by New Zealand Online Stores 2023',
          url: 'https://ecommercedb.com/insights/top-5-payment-providers-offered-by-new-zealand-online-stores-2023/1006954'
        },
        {
          title: 'Magyarország: a fizetési módok megoszlása egy nagy magyar webáruháznál (Pepita.hu)',
          bars: [['Utánvét', 68], ['Bankkártya', 30], ['Átutalás', 2]],
          source: 'Forrás: Trade Magazin',
          url: 'https://trademagazin.hu/en/a-magyar-vasarlok-egyre-tudatosabba'
        }
      ]
    },

    legal: {
      terms: {
        title: 'Általános Szerződési Feltételek (ÁSZF)',
        body: [
          'Ez az ÁSZF a magyarországi vásárlók andara.co oldalon leadott rendeléseire vonatkozik. Az ANDARA székhelye Bucaramanga, Kolumbia.',
          'Az árak forintban, áfával értendők. A vámot és az esetleges díjakat a fizetés előtt kiszámoljuk és megmutatjuk.',
          'Fizethetsz utánvéttel a futárnál, bankkártyával, Barionnal vagy SimplePayjel.',
          'Minden pár kézzel készül, ezért a bőr erezetében és színében lévő apró eltérések nem hibák.',
          'A szállítás nyomon követhető, 7–10 munkanap. Az ÁSZF nem korlátozza a Ptk. és a 45/2014. (II. 26.) Korm. rendelet szerinti fogyasztói jogaidat.'
        ]
      },
      disclaimer: {
        title: 'Jogi nyilatkozat',
        body: [
          'Ez a weboldal a Universidad de Medellín E-Business záróprojektje. A termékek, árak, vélemények és célok szemléltető jellegűek; valódi rendelés vagy fizetés nem történik.',
          'A FitFinder a megadott adatok alapján méretjavaslatot ad. Ez iránymutatás, nem garancia.',
          'Frai egy MI-asszisztens (az EU MI-rendelete szerint ezt jelezzük). A válaszai tévedhetnek; rendeléssel kapcsolatban írj csapatunknak WhatsAppon.',
          'A piaci adatok forrását minden diagram alatt feltüntetjük.'
        ]
      },
      refund: {
        title: 'Visszaküldési szabályzat',
        body: [
          'Elállási jog: a kézhezvételtől számított 14 napon belül indoklás nélkül elállhatsz a vásárlástól. A vételárat 14 napon belül visszautaljuk.',
          'Ingyenes méretcsere: a viseletlen cipőt 30 napon belül ingyen becseréljük másik méretre.',
          'Hibás termék esetén szavatossági és jótállási jogaid alapján javítást, cserét vagy visszatérítést kérhetsz.',
          'Utánvétes rendelésnél a visszatérítés banki átutalással történik.'
        ]
      },
      privacy: {
        title: 'Adatvédelmi tájékoztató',
        body: [
          'Adataidat az EU általános adatvédelmi rendelete (GDPR) szerint kezeljük.',
          'Csak a rendelés teljesítéséhez szükséges adatokat gyűjtjük: név, cím, e-mail, telefonszám és a választott méret. A FitFinder válaszait a méretjavaslatok javítására használjuk.',
          'A kártyás fizetést a Barion és a SimplePay kezeli; a teljes kártyaszámodat nem látjuk és nem tároljuk.',
          'A Fraival folytatott beszélgetést egy MI-szolgáltató dolgozhatja fel a válaszhoz. Ne ossz meg fizetési adatokat a chatben.',
          'Bármikor kérheted adataid megtekintését, helyesbítését vagy törlését: hola@andara.co. Panasszal a NAIH-hoz fordulhatsz.'
        ]
      }
    }
  };

  /* Frai keyword fallback. Keywords are matched on lowercase, accent-free text. */
  const frai = {
    topics: [
      { id: 'pay', keys: ['pay', 'afterpay', 'card', 'cash', 'paypal', 'visa', 'mastercard', 'apple', 'google pay', 'fizet', 'utanvet', 'kartya', 'barion', 'simplepay', 'keszpenz'] },
      { id: 'returns', keys: ['return', 'refund', 'exchange', 'send back', 'vissza', 'csere', 'elall'] },
      { id: 'size', keys: ['size', 'fit', 'small', 'tight', 'big', 'meret', 'szuk', 'kicsi', 'nagy'] },
      { id: 'care', keys: ['care', 'clean', 'leather', 'polish', 'wet', 'rain', 'apol', 'tisztit', 'bort', 'bor '] },
      { id: 'ship', keys: ['ship', 'deliver', 'long', 'wellington', 'auckland', 'christchurch', 'courier', 'track', 'arrive', 'szallit', 'mennyi ido', 'kiszallit', 'futar', 'budapest', 'mikor'] }
    ],
    answers: {
      nz: {
        ship: 'Orders ship tracked from Colombia to New Zealand in 8–12 business days. Import GST and duties are calculated at checkout, so nothing surprises you at the door.',
        returns: 'You can exchange unworn shoes for another size within 30 days, free. If a product is faulty, you get a repair, replacement or refund under the Consumer Guarantees Act.',
        care: 'Wipe the leather with a damp cloth, let it dry away from heaters, and use a leather conditioner every 2–3 months.',
        pay: 'We accept Visa, Mastercard, Afterpay (4 interest-free payments), PayPal, Apple Pay and Google Pay.',
        size: 'Try FitFinder: pick a shoe you own and its size, and it suggests your ANDARA size in UK/AU sizing.',
        other: 'I can\'t answer that one yet. Message our team on WhatsApp and a person will reply within one business day.'
      },
      hu: {
        ship: 'A rendeléseket nyomon követhetően szállítjuk Kolumbiából Magyarországra, 7–10 munkanap alatt. A vámot és az áfát a pénztárnál kiszámoljuk, így nem ér meglepetés.',
        returns: 'Online vásárlástól 14 napon belül indoklás nélkül elállhatsz, a viseletlen cipőt pedig 30 napon belül ingyen becseréljük másik méretre.',
        care: 'Nedves ruhával töröld át a bőrt, hőforrástól távol szárítsd, és 2–3 havonta használj bőrápolót.',
        pay: 'Igen! Fizethetsz utánvéttel a futárnál, bankkártyával, Barionnal vagy SimplePayjel.',
        size: 'Próbáld ki a FitFindert: add meg egy meglévő cipődet és a méretét, és megmutatja az ANDARA-méretedet EU-méretben.',
        other: 'Erre most nem tudok válaszolni. Írj csapatunknak WhatsAppon, egy munkanapon belül válaszolunk.'
      }
    }
  };

  return { products, markets: { nz, hu }, frai, contact: { email: 'hola@andara.co', whatsapp: '+57 300 000 0000', whatsappLink: 'https://wa.me/573000000000', city: { nz: 'Bucaramanga, Colombia', hu: 'Bucaramanga, Colombia' } } };
})();
