import { useLanguage } from './languageContext'
import type { Language } from './types'

/**
 * English is the source of truth: `id` is typed against it, so a missing or
 * misspelled key fails the build instead of silently falling back.
 *
 * Deliberately left in English on the Indonesian side:
 *   - the ScrollExpand hero tagline (lives in Hero.tsx, not here)
 *   - game terminology and proper nouns (Trailblazer, Astral Express, Stellaron,
 *     world names, Light Cones, Memory of Chaos, …)
 *   - Path and element names (they come from assets.ts and are rendered as-is)
 *   - anything inside double quotes in a news headline
 *   - the word "gameplay"
 */
const en = {
  common: {
    downloadNow: 'Download now',
    readMore: 'Read more',
    showLess: 'Show less',
    seeMore: 'See more',
    view: 'View',
    backToHome: 'Back to home',
  },

  language: {
    trigger: 'Change language',
    heading: 'Language',
  },

  nav: {
    items: {
      home: 'HOME',
      gameplay: 'GAMEPLAY',
      characters: 'CHARACTERS',
      news: 'NEWS',
      faq: 'FAQ',
    },
    homeAria: 'Honkai: Star Rail home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    downloadHeading: 'Download',
  },

  intro: {
    heading: 'Honkai: star rail',
    lead:
      'Honkai: Star Rail is a free-to-play space fantasy tactical role-playing game Set in a vast universe, you step into the shoes of the Trailblazer, ' +
      "an amnesiac carrying a world-ending seed known as a Stellaron. Together with the crew of the Astral Express, you travel across distinct planets to seal these cosmic threats and uncover the galaxy's " +
      'deep secrets.',
    bullets: [
      'Experience one-of-a-kind gameplay, featuring tactical combat where elements, weaknesses, and flashy ultimate abilities dictate the flow of battle.',
      'Explore unique locations ranging from high-tech Herta Space Station, to the frozen, nineteenth-century-inspired Belobog, to the immense silkpunk flagship fleet of the Xianzhou Luofu, and the jazz-age dreamscape of Penacony.',
      'Collect a vast roster of unique 4-star and 5-star characters, balancing team compositions to tackle challenging endgame content.',
    ],
  },

  media: {
    heading: 'Media',
    tabsLabel: 'Media type',
    tabs: {
      screenshots: 'Screenshots',
      shortvideos: 'shortvideos',
    },
    screenshotGallery: 'Screenshot gallery, drag or use arrow keys to scroll',
    clipGallery: 'Gameplay clip gallery, drag or use arrow keys to scroll',
    screenshotAlt: (index: number) => `Game screenshot ${index}`,
    clipAlt: (index: number) => `Gameplay clip ${index}`,
  },

  worlds: {
    heading: 'Worlds',
    galleryLabel: 'Worlds gallery',
  },

  characters: {
    heading: 'Characters',
    viewDetails: (name: string) => `View ${name} details`,
    elementLabel: (element: string) => `${element} element`,
  },

  promotion: {
    freeToPlay: 'Free to play',
    playNow: 'Play now',
    seeMore: 'See More',
    note: 'hardware requirements can be seen in FAQ page.',
  },

  footer: {
    newsletterHighlight: 'Sign up',
    newsletterTail: ' to our official newsletter',
    subscribe: 'Subscribe',
    brandBlurb:
      'A game of strategy, exploration, and combat. Forge your legacy in the universe, one world at a time.',
    navigationHeading: 'Navigation',
    downloadHeading: 'Download',
    nav: {
      gameplay: 'Gameplay',
      characters: 'Characters',
      news: 'News',
      faq: 'FAQ',
    },
    copyright: '© 2026 Hoyoverse Studios. All rights reserved.',
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookie: 'Cookie Policy',
    },
  },

  faq: {
    heading: 'FAQ',
    items: [
      {
        question: 'Is Honkai: Star Rail free to play?',
        answer:
          'Yes. The game is free to download and play on all supported platforms, with optional in-game purchases.',
      },
      {
        question: 'Which platforms are supported?',
        answer:
          'Windows, macOS, iOS, Android and PlayStation 5. Progress is shared across platforms through your account.',
      },
      {
        question: 'Do I need to play Honkai Impact 3rd first?',
        answer:
          'No. Star Rail tells a self-contained story, though returning players will recognise a few familiar faces.',
      },
      {
        question: 'Can I transfer my progress between devices?',
        answer:
          'Sign in with the same account and your progress follows you. PlayStation accounts can be linked in the settings menu.',
      },
    ],
  },

  systemRequirements: {
    pcTitle: 'PC System Requirements',
    mobileTitle: 'Mobile System Requirements',
    pcCaption: 'Minimum and recommended PC requirements for Honkai: Star Rail',
    mobileCaption: 'Minimum and recommended mobile requirements for Honkai: Star Rail',
    spec: 'Spec',
    minimum: 'Minimum',
    recommended: 'Recommended',
    bestExperience: 'Best Experience',
    swipeHint: 'Swipe the table sideways to see every column.',
    pcRows: [
      {
        label: 'OS',
        minimum: ['Windows 10 64-bit'],
        recommended: ['Windows 10 64-bit', 'Windows 11 64-bit'],
      },
      {
        label: 'CPU',
        minimum: ['Intel Core i5'],
        recommended: ['Intel Core i7', 'or equivalent AMD Ryzen'],
      },
      {
        label: 'GPU',
        minimum: ['Nvidia GeForce GTX 1050', 'or better'],
        recommended: ['Nvidia GeForce GTX 1060', 'or higher'],
      },
      {
        label: 'RAM',
        minimum: ['8 GB RAM'],
        recommended: ['16 GB RAM'],
      },
      {
        label: 'Storage',
        minimum: [
          'Around 100 GB to 110 GB of free space',
          '(newer major updates may require more storage)',
        ],
        recommended: ['SSD with sufficient free space', 'for optimal loading speeds'],
      },
    ],
    mobileRows: [
      {
        label: 'OS',
        minimum: ['Android 9.0 or higher'],
        recommended: ['Android 9.0 or higher'],
      },
      {
        label: 'SoC',
        minimum: ['Snapdragon 835, Dimensity 720,', 'Kirin 810, or better'],
        recommended: ['Snapdragon 870, Dimensity 1300,', 'Kirin 9000, or better'],
      },
      {
        label: 'RAM',
        minimum: ['4 GB or more'],
        recommended: ['6 GB or more'],
      },
      {
        label: 'Storage',
        minimum: [
          '8 GB to 10 GB initial space',
          '(up to 27 GB with all language packs and updates)',
        ],
        recommended: [
          '8 GB to 10 GB initial space',
          '(up to 27 GB with all language packs and updates)',
        ],
      },
    ],
  },

  news: {
    heading: 'news',
    latest: 'Latest News',
    seeMore: 'see more',
    featured: [
      {
        date: 'September 27, 2026',
        title: 'Pearl Character Trailer: "The Way to Paint a Form of Hope" | Honkai: Star Rail',
      },
      {
        date: 'September 22, 2026',
        title:
          'Keeping Up With Star Rail — Pearl: Deep Learning in Progress | Honkai: Star Rail',
      },
    ],
    cards: [
      {
        date: 'September 20, 2026',
        title:
          'Version 4.6 Trailer: "Dance With the Beast Before Moonrise" | Honkai: Star Rail',
      },
      {
        date: 'September 10, 2026',
        title:
          'Aventurine • Waveflair Character Trailer: "Exclusive Scoop" | Honkai: Star Rail',
      },
      {
        date: 'September 4, 2026',
        title:
          'Keeping Up With Star Rail — Aventurine • Waveflair: How Much Did SoulGlad Pay? | Honkai: Star Rail',
      },
      {
        date: 'August 26, 2026',
        title: 'Version 4.5 "To Roll the Stars in Astropolis" Update Details',
      },
      {
        date: 'August 25, 2026',
        title:
          'Robin • Summeretto Character Trailer: "Chasing the Wind" | Honkai: Star Rail',
      },
      {
        date: 'August 21, 2026',
        title: 'Myriad Celestia Trailer: "Beyond the Chorus" | Honkai: Star Rail',
      },
      {
        date: 'August 14, 2026',
        title:
          'Version 4.5 Trailer: "To Roll the Stars in Astropolis" | Honkai: Star Rail',
      },
    ],
  },

  gameplay: {
    heading: 'Gameplay',
    features: [
      {
        label: 'explore 6 different worlds',
        description:
          'Board the Astral Express and set course for six worlds that share nothing but the rails between them — the derelict corridors of the Herta Space Station, the frostbitten city of Belobog on Jarilo IV, the silkpunk flagship fleet of the Xianzhou Luofu, the endless dream of Penacony, the myth-bound shores of Amphoreus, and the neon carnival of Planarcadia. Each one carries its own history, its own people, and its own reason to make you stay a little longer.',
      },
      {
        label: 'Engage in an intense combat',
        description:
          "Combat is turn-based, but it never sits still. Read each enemy's weakness, chain the right elements to shatter their Toughness bar, and bank your Skill Points for the moment a well-timed Ultimate flips the fight. Action order, weakness coverage, and who you break first decide how the battle ends.",
      },
      {
        label: 'Collect characters that you met on your journey',
        description:
          'Almost everyone you meet along the way can end up fighting beside you. Warp for 4-star and 5-star characters spread across seven elements and nine Paths, then raise their Traces, Light Cones, and Relics until they fill the gap your team has been carrying. No two rosters ever end up looking the same.',
      },
      {
        label: 'Many end game content to play',
        description:
          'When the story goes quiet, the real testing begins. Memory of Chaos, Pure Fiction, and Apocalyptic Shadow each reward a completely different kind of team, while the Simulated Universe rolls a fresh set of Blessings and Curses on every run. The rotations refresh on a cycle, so there is always another puzzle waiting on your roster.',
      },
      {
        label: 'New events every month with unique gameplay',
        description:
          'Every version update brings events that play by their own rules, from rhythm challenges and tower defense to card duels and full side stories with their own cast. They run for a limited time, pay out Stellar Jade and upgrade materials, and rarely repeat the same idea twice.',
      },
    ],
  },

  characterPage: {
    heading: 'characters',
    rosterLabel: 'Character roster',
    pathsLabel: 'Character paths',
    previousPaths: 'Show previous paths',
    morePaths: 'Show more paths',
    railLabel: (path: string) => `The ${path} characters`,
    storyHeading: 'Story',
    closeDetails: 'Close character details',
  },

  notFound: {
    code: 'Error 404',
    heading: 'Lost in the stars',
    body: "This stop is not on the Astral Express route. Let's get you back on track.",
  },
}

export type Strings = typeof en

const id: Strings = {
  common: {
    downloadNow: 'Unduh sekarang',
    readMore: 'Baca selengkapnya',
    showLess: 'Tampilkan lebih sedikit',
    seeMore: 'Lihat lainnya',
    view: 'Lihat',
    backToHome: 'Kembali ke beranda',
  },

  language: {
    trigger: 'Ubah bahasa',
    heading: 'Bahasa',
  },

  nav: {
    items: {
      home: 'BERANDA',
      gameplay: 'GAMEPLAY',
      characters: 'KARAKTER',
      news: 'BERITA',
      faq: 'FAQ',
    },
    homeAria: 'Beranda Honkai: Star Rail',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    downloadHeading: 'Unduh',
  },

  intro: {
    heading: 'Honkai: star rail',
    lead:
      'Honkai: Star Rail adalah gim RPG taktis bertema fantasi antariksa yang gratis dimainkan. Berlatar semesta yang begitu luas, kamu berperan sebagai Trailblazer, ' +
      'sosok yang kehilangan ingatan dan membawa benih penghancur dunia bernama Stellaron. Bersama kru Astral Express, kamu menempuh berbagai planet untuk menyegel ancaman kosmik itu dan menyingkap ' +
      'rahasia terdalam galaksi.',
    bullets: [
      'Rasakan gameplay yang tak ada duanya, dengan pertarungan taktis di mana elemen, kelemahan, dan kemampuan ultimate yang memukau menentukan jalannya pertempuran.',
      'Jelajahi lokasi-lokasi unik, mulai dari Herta Space Station yang serba canggih, Belobog yang membeku dengan nuansa abad kesembilan belas, armada silkpunk raksasa Xianzhou Luofu, hingga dunia mimpi beraroma era jazz di Penacony.',
      'Kumpulkan jajaran karakter 4-bintang dan 5-bintang yang khas, lalu seimbangkan komposisi tim untuk menaklukkan konten endgame yang menantang.',
    ],
  },

  media: {
    heading: 'Media',
    tabsLabel: 'Jenis media',
    tabs: {
      screenshots: 'Tangkapan layar',
      shortvideos: 'video pendek',
    },
    screenshotGallery:
      'Galeri tangkapan layar, geser atau gunakan tombol panah untuk menjelajah',
    clipGallery: 'Galeri klip gameplay, geser atau gunakan tombol panah untuk menjelajah',
    screenshotAlt: (index: number) => `Tangkapan layar gim ${index}`,
    clipAlt: (index: number) => `Klip gameplay ${index}`,
  },

  worlds: {
    heading: 'Dunia',
    galleryLabel: 'Galeri dunia',
  },

  characters: {
    heading: 'Karakter',
    viewDetails: (name: string) => `Lihat detail ${name}`,
    elementLabel: (element: string) => `Elemen ${element}`,
  },

  promotion: {
    freeToPlay: 'Gratis dimainkan',
    playNow: 'Mainkan sekarang',
    seeMore: 'Lihat Selengkapnya',
    note: 'persyaratan perangkat dapat dilihat di halaman FAQ.',
  },

  footer: {
    newsletterHighlight: 'Daftar',
    newsletterTail: ' ke buletin resmi kami',
    subscribe: 'Berlangganan',
    brandBlurb:
      'Gim tentang strategi, penjelajahan, dan pertarungan. Ukir warisanmu di semesta, satu dunia demi satu dunia.',
    navigationHeading: 'Navigasi',
    downloadHeading: 'Unduh',
    nav: {
      gameplay: 'Gameplay',
      characters: 'Karakter',
      news: 'Berita',
      faq: 'FAQ',
    },
    copyright: '© 2026 Hoyoverse Studios. Seluruh hak cipta dilindungi.',
    legal: {
      privacy: 'Kebijakan Privasi',
      terms: 'Ketentuan Layanan',
      cookie: 'Kebijakan Cookie',
    },
  },

  faq: {
    heading: 'FAQ',
    items: [
      {
        question: 'Apakah Honkai: Star Rail gratis dimainkan?',
        answer:
          'Ya. Gim ini gratis diunduh dan dimainkan di semua platform yang didukung, dengan pembelian dalam gim yang bersifat opsional.',
      },
      {
        question: 'Platform apa saja yang didukung?',
        answer:
          'Windows, macOS, iOS, Android, dan PlayStation 5. Progres tersinkron di semua platform melalui akunmu.',
      },
      {
        question: 'Apakah saya perlu memainkan Honkai Impact 3rd lebih dahulu?',
        answer:
          'Tidak. Star Rail punya cerita yang berdiri sendiri, meski pemain lama akan menemukan beberapa wajah yang familier.',
      },
      {
        question: 'Bisakah saya memindahkan progres antar perangkat?',
        answer:
          'Masuk dengan akun yang sama dan progresmu akan ikut berpindah. Akun PlayStation bisa ditautkan dari menu pengaturan.',
      },
    ],
  },

  systemRequirements: {
    pcTitle: 'Persyaratan Sistem PC',
    mobileTitle: 'Persyaratan Sistem Mobile',
    pcCaption: 'Persyaratan PC minimum dan rekomendasi untuk Honkai: Star Rail',
    mobileCaption: 'Persyaratan mobile minimum dan rekomendasi untuk Honkai: Star Rail',
    spec: 'Spesifikasi',
    minimum: 'Minimum',
    recommended: 'Rekomendasi',
    bestExperience: 'Pengalaman Terbaik',
    swipeHint: 'Geser tabel ke samping untuk melihat semua kolom.',
    pcRows: [
      {
        label: 'OS',
        minimum: ['Windows 10 64-bit'],
        recommended: ['Windows 10 64-bit', 'Windows 11 64-bit'],
      },
      {
        label: 'CPU',
        minimum: ['Intel Core i5'],
        recommended: ['Intel Core i7', 'atau AMD Ryzen setara'],
      },
      {
        label: 'GPU',
        minimum: ['Nvidia GeForce GTX 1050', 'atau lebih baik'],
        recommended: ['Nvidia GeForce GTX 1060', 'atau lebih tinggi'],
      },
      {
        label: 'RAM',
        minimum: ['RAM 8 GB'],
        recommended: ['RAM 16 GB'],
      },
      {
        label: 'Penyimpanan',
        minimum: [
          'Sekitar 100 GB hingga 110 GB ruang kosong',
          '(pembaruan besar berikutnya bisa butuh ruang lebih)',
        ],
        recommended: ['SSD dengan ruang kosong memadai', 'untuk kecepatan muat optimal'],
      },
    ],
    mobileRows: [
      {
        label: 'OS',
        minimum: ['Android 9.0 atau lebih tinggi'],
        recommended: ['Android 9.0 atau lebih tinggi'],
      },
      {
        label: 'SoC',
        minimum: ['Snapdragon 835, Dimensity 720,', 'Kirin 810, atau lebih baik'],
        recommended: ['Snapdragon 870, Dimensity 1300,', 'Kirin 9000, atau lebih baik'],
      },
      {
        label: 'RAM',
        minimum: ['4 GB atau lebih'],
        recommended: ['6 GB atau lebih'],
      },
      {
        label: 'Penyimpanan',
        minimum: [
          'Ruang awal 8 GB hingga 10 GB',
          '(hingga 27 GB dengan semua paket bahasa dan pembaruan)',
        ],
        recommended: [
          'Ruang awal 8 GB hingga 10 GB',
          '(hingga 27 GB dengan semua paket bahasa dan pembaruan)',
        ],
      },
    ],
  },

  news: {
    heading: 'berita',
    latest: 'Berita Terbaru',
    seeMore: 'lihat lainnya',
    featured: [
      {
        date: '27 September 2026',
        title: 'Trailer Karakter Pearl: "The Way to Paint a Form of Hope" | Honkai: Star Rail',
      },
      {
        date: '22 September 2026',
        title:
          'Keeping Up With Star Rail — Pearl: Deep Learning in Progress | Honkai: Star Rail',
      },
    ],
    cards: [
      {
        date: '20 September 2026',
        title:
          'Trailer Versi 4.6: "Dance With the Beast Before Moonrise" | Honkai: Star Rail',
      },
      {
        date: '10 September 2026',
        title:
          'Trailer Karakter Aventurine • Waveflair: "Exclusive Scoop" | Honkai: Star Rail',
      },
      {
        date: '4 September 2026',
        title:
          'Keeping Up With Star Rail — Aventurine • Waveflair: How Much Did SoulGlad Pay? | Honkai: Star Rail',
      },
      {
        date: '26 Agustus 2026',
        title: 'Detail Pembaruan Versi 4.5 "To Roll the Stars in Astropolis"',
      },
      {
        date: '25 Agustus 2026',
        title:
          'Trailer Karakter Robin • Summeretto: "Chasing the Wind" | Honkai: Star Rail',
      },
      {
        date: '21 Agustus 2026',
        title: 'Trailer Myriad Celestia: "Beyond the Chorus" | Honkai: Star Rail',
      },
      {
        date: '14 Agustus 2026',
        title:
          'Trailer Versi 4.5: "To Roll the Stars in Astropolis" | Honkai: Star Rail',
      },
    ],
  },

  gameplay: {
    heading: 'Gameplay',
    features: [
      {
        label: 'jelajahi 6 dunia yang berbeda',
        description:
          'Naiki Astral Express dan tetapkan arah ke enam dunia yang tak punya kesamaan selain rel yang menghubungkannya — koridor terbengkalai Herta Space Station, kota beku Belobog di Jarilo IV, armada silkpunk Xianzhou Luofu, mimpi tanpa akhir Penacony, pesisir penuh mitos Amphoreus, dan karnaval neon Planarcadia. Masing-masing menyimpan sejarahnya sendiri, penduduknya sendiri, dan alasannya sendiri untuk membuatmu tinggal sedikit lebih lama.',
      },
      {
        label: 'Hadapi pertarungan yang intens',
        description:
          'Pertarungannya berbasis giliran, tetapi tak pernah terasa diam. Baca kelemahan setiap musuh, rangkai elemen yang tepat untuk meremukkan bar Toughness mereka, dan simpan Skill Point untuk saat sebuah Ultimate yang tepat waktu membalikkan keadaan. Urutan aksi, cakupan kelemahan, dan siapa yang kamu break lebih dulu menentukan bagaimana pertempuran berakhir.',
      },
      {
        label: 'Kumpulkan karakter yang kamu temui dalam perjalanan',
        description:
          'Hampir semua orang yang kamu temui di sepanjang jalan bisa berakhir bertarung di sisimu. Lakukan Warp untuk karakter 4-bintang dan 5-bintang yang tersebar di tujuh elemen dan sembilan Path, lalu tingkatkan Trace, Light Cone, dan Relic mereka sampai menutup celah yang selama ini dipikul timmu. Tidak ada dua susunan karakter yang berakhir sama.',
      },
      {
        label: 'Banyak konten endgame untuk dimainkan',
        description:
          'Saat ceritanya mereda, ujian yang sebenarnya baru dimulai. Memory of Chaos, Pure Fiction, dan Apocalyptic Shadow masing-masing menuntut jenis tim yang sama sekali berbeda, sementara Simulated Universe mengacak Blessing dan Curse baru di setiap percobaan. Rotasinya berganti secara berkala, jadi selalu ada teka-teki lain yang menanti susunan karaktermu.',
      },
      {
        label: 'Event baru setiap bulan dengan gameplay yang unik',
        description:
          'Setiap pembaruan versi menghadirkan event dengan aturannya sendiri, dari tantangan ritme dan tower defense hingga duel kartu dan cerita sampingan lengkap dengan para pemerannya. Event berjalan dalam waktu terbatas, memberi Stellar Jade dan materi peningkatan, serta jarang mengulang ide yang sama dua kali.',
      },
    ],
  },

  characterPage: {
    heading: 'karakter',
    rosterLabel: 'Daftar karakter',
    pathsLabel: 'Path karakter',
    previousPaths: 'Tampilkan path sebelumnya',
    morePaths: 'Tampilkan path lainnya',
    railLabel: (path: string) => `Karakter ${path}`,
    storyHeading: 'Cerita',
    closeDetails: 'Tutup detail karakter',
  },

  notFound: {
    code: 'Error 404',
    heading: 'Tersesat di antara bintang',
    body: 'Perhentian ini tidak ada dalam rute Astral Express. Mari kembali ke jalurnya.',
  },
}

export const STRINGS: Record<Language, Strings> = { en, id }

export const useStrings = (): Strings => STRINGS[useLanguage().language]
