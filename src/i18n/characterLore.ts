import type { Language } from './types'

type Lore = {
  story: string
  quote: string
}

const LORE_ID: Record<string, Lore> = {
  'March 7th': {
    story:
      'Gadis muda yang bersemangat dan sedikit eksentrik, menyukai segala hal yang biasa digemari anak seusianya, misalnya memotret. Ia terbangun dari sebongkah es abadi yang melayang, hanya untuk menemukan bahwa ia tak tahu apa pun tentang dirinya maupun masa lalunya. Meski awalnya murung karena tak punya jati diri, ia memutuskan menamai dirinya sesuai tanggal saat ia memasuki kehidupan barunya. Dan begitulah, pada hari itu March 7th lahir.',
    quote:
      'Dengar itu! Aku menyelamatkan semua orang tanpa membuat satu pun masalah! Kamu hebat juga, March 7th!',
  },

  'Dan Heng': {
    story:
      'Pemuda dingin dan tertutup yang memegang tombak bernama Cloud-Piercer. Ia bertugas sebagai penjaga kereta dalam perjalanan Trailblaze yang panjang. Ia mengamati dengan cermat setiap perubahan di sekelilingnya, meski dengan sikap tenang yang mudah disalahartikan sebagai ketidakpedulian. Dengan setia ia mencatat semua yang mereka temui di jalan Trailblaze ke dalam arsip Express. Dan Heng hampir tak pernah bicara tentang masa lalunya. Justru ia bergabung dengan kru Express untuk melarikan diri darinya. Tapi apakah Express benar-benar mampu membawanya jauh dari masa lalu itu?',
    quote:
      'Bahkan saat kita berbicara, perpisahan sedang terjadi di seluruh semesta. Duka yang kita rasakan itu nyata, tapi tak ada yang istimewa darinya.',
  },

  Trailblazer: {
    story:
      'Satu-satunya, sosok terkuat di seluruh semesta, penyelamat Jarilo IV, Xianzhou Luofu, Penacony, dan Amphoreus, pemusnah segala kejahatan, penakluk semua Aeon, pengumpul kawan, penendang tong sampah, satu-satunya Trailblazer yang menaiki Astral Express. Mereka memilih berkelana bersama Astral Express untuk melenyapkan bahaya yang ditimbulkan Stellaron.',
    quote:
      'Tak lama setelah aku lahir, aku pernah bertanya kepada ibuku apa yang harus kulakukan jika suatu hari menghadapi kesulitan, lalu ia menjawab, habisi semuanya!',
  },

  Sunday: {
    story: 'Pengembara yang sayapnya telah dipotong... ke mana langkahnya akan membawanya?',
    quote:
      'Selalu ada firdaus yang harus dibangun. Janji itu seperti matahari di langit; mungkin aku akan meleleh dan jatuh sebelum mencapainya... Tapi ada penderitaan yang memang harus kutanggung.',
  },

  Himeko: {
    story:
      'Ilmuwan berjiwa petualang yang bertemu Astral Express sewaktu kecil, ketika kereta itu terdampar di dunia asalnya. Saat itu, suatu keberadaan di dalam Express memperlihatkan kepada gadis kecil ini sebuah dunia di luar dunianya sendiri — semesta. Bertahun-tahun kemudian, Himeko akhirnya berhasil memperbaiki kereta itu dan memulai perjalanannya menuju bintang-bintang, tetapi ia menyadari bahwa itu baru permulaan. Di jalan Trailblaze, ia akan membutuhkan jauh lebih banyak rekan... Meski para rekan itu mungkin punya tujuan yang berbeda, mereka semua menatap langit berbintang yang sama.',
    quote:
      'Aku Himeko, Navigator Astral Express, dan keluargamu, yang selalu memandang horizon yang sama denganmu.',
  },

  Welt: {
    story:
      'Mantan Sovereign Anti-Entropy yang bijak dan berwibawa, pewaris nama dunia — Welt. Ia telah menyelamatkan Bumi dari kemusnahan berkali-kali. Setelah bencana itu berakhir, beban berat yang ditakdirkan kepada Welt sempat terangkat, dan ia menjadi seniman storyboard animasi. Namun, setelah konspirasi di St. Fountain berakhir, Welt tak punya pilihan selain melangkah bersama pemicu insiden itu ke seberang portal ruang. Mungkin bahkan ia sendiri tak menduga perjalanan dan rekan-rekan baru yang telah menantinya.',
    quote:
      'Galaksi ini luas tak terbandingkan, menyimpan kemungkinan yang tak terhingga. Takdir seseorang tak seharusnya dibatasi pada satu jalan yang ditentukan langit.',
  },

  Aventurine: {
    story:
      "Manajer senior di IPC Strategic Investment Department dan salah satu dari Ten Stonehearts. Cornerstone miliknya adalah 'Aventurine of stratagems.' Ia membawa kesan ringan dan tak pernah gentar mengambil risiko. Senyumnya yang tak pernah lepas membuat orang sulit membaca perasaannya yang sebenarnya. Posisinya saat ini ia rebut dengan bertaruh melawan takdir itu sendiri. Ia memandang hidup sebagai investasi berisiko tinggi dengan imbal hasil tinggi, dan ia memainkan pertaruhan itu dengan kemahiran yang santai.",
    quote:
      'Silakan, manfaatkan aku sesukamu, bahkan tikam aku dari belakang kalau kau anggap perlu. Eksploitasi dan pengkhianatan hanyalah alat dalam bisnis ini. Tapi ingat, aku tak pernah membuat kesepakatan yang tak menguntungkan... Jadi, kuharap kau tak mengecewakanku.',
  },

  'Black Swan': {
    story:
      "Seorang Memokeeper dari Garden of Recollection. Peramal yang misterius dan elegan. Ia membawa senyum hangat dan bersedia menyimak perkataan orang lain dengan sabar, lalu memakai cara itu sebagai dalih untuk memasuki 'memori' dan memahami aliran segala informasi. Ia begitu gemar mengumpulkan memori yang unik, namun pikiran yang menuntunnya sulit ditebak.",
    quote:
      'Jika aku bisa mengenali dan merangkum sepotong memori sebelum ia tersingkap ke dunia, momen-momen sunyi penuh kegembiraan itulah memori favorit dan paling unik milikku.',
  },

  Blade: {
    story:
      "Pendekar yang merelakan tubuhnya untuk menjadi sebilah pedang. Nama aslinya tak diketahui. Ia bersumpah setia kepada Destiny's Slave dan memiliki kemampuan penyembuhan diri yang mengerikan. Blade mengayunkan pedang kuno yang dipenuhi keretakan, sama seperti tubuh dan batinnya.",
    quote: 'Kapan kematian akan datang menjemputku? Kesabaranku mulai menipis',
  },

  Castorice: {
    story:
      "'Servant of Death' Castorice. Tanah yang memuliakan kematian, Aidonia, tempat salju turun tanpa henti, hari ini terbuai dalam tidur yang manis. Castorice, putri dari River of Souls, Chrysos Heir yang mencari Coreflame 'Death', mulai melangkah. Kau harus menjaga ratapan jiwa-jiwa dan merangkul kesunyian takdir. Hidup dan mati hanyalah sebuah perjalanan. Ketika kupu-kupu hinggap di dahan, yang layu akan berkembang kembali.",
    quote:
      'Selamat datang di Okhema, aku Castorice. Maaf, sudah menjadi kebiasaanku menjaga jarak dari orang lain... Tapi aku bisa mendekat jika kau mau.',
  },

  Cerydra: {
    story:
      "Northern Empire, dinasti yang telah hilang, tempat tanah-tanah beku membara oleh ambisi penaklukan. Sovereign Cerydra, Chrysos Heir yang menggenggam Coreflame 'Law', kau akan menata bidak-bidakmu, menantang para dewa, menjatuhkan penghakiman atas mereka yang tak beriman, dan mengukir jalan Flame-Chase ke dalam takdir dunia ini. 'Ini bukan akhir. Jalan Amphoreus akan berkobar melintasi bintang-bintang!'",
    quote:
      "Flamebearer, 'Tyrant', 'Empress', 'Supreme Commander', 'Imperator'... Dunia telah memberiku gelar yang tak terhitung, tapi kau cukup memanggilku dengan nama sejatiku, Cerydra",
  },

  Cyrene: {
    story:
      "Sebuah meteor melesat di langit malam, mengirim riak ke sungai kehidupan, berkilau dalam tiga belas warna. Putri Aedes Elysiae, Chrysos Heir yang merawat '██,' tebarkan Seed of Memory, agar bunga-bunga masa lalu dapat berkembang di hari esok. — 'Dan bersama-sama, kita akan menulis bait yang tak pernah ada sebelumnya ♪'",
    quote:
      "Apakah ini pertemuan yang ditakdirkan, atau... reuni yang terlalu lama tertunda? Jantungku jadi berdebar lebih cepat. Kalau begitu... tolong panggil aku 'Cyrene' sekali lagi, seperti saat kita pertama bertemu, ya?",
  },

  Evanescia: {
    story:
      'Satu musim saat Phantasmoon menuju purnama, satu musim kefanaan manusia: sang nyonya misterius muncul kembali di Planarcadia! Kelopak yang jatuh berserak dengan mudah, dan persinggahannya hanyalah sekejap. Segala hal tentang era baru ini memikatnya, dan ia tak akan membiarkan siapa pun meruntuhkannya... Sebilah pemotong memutuskan benar dan salah, tetapi siapa yang bisa mengukur seberapa banyak kebaikan atau kejahatan di dalam diri sendiri?',
    quote:
      'Selamat, kau dapat jackpot! Aku Evanescia. Senang berkenalan, Rakun Kecil Tokoh Utama. Biasanya, di tengah semua pesta ini, aku hanya memastikan Phantasmoon Games berjalan lancar... Tapi kali ini? Berbagi panggung denganmu kedengarannya tidak buruk juga!',
  },

  Firefly: {
    story:
      "Anggota Stellaron Hunters dan seorang gadis muda yang berbalut armor mekanis 'SAM.' Dilahirkan sebagai senjata, ia menanggung derita Entropy Loss Syndrome akibat modifikasi genetik. Ia bergabung dengan Stellaron Hunters untuk mencari makna hidup, tanpa henti memburu cara untuk menentang takdir.",
    quote:
      'Kunang-kunang itu makhluk yang ajaib, bukan? Mereka bisa menjatuhkan diri ke dalam api atau tiba-tiba menua, tapi setiap malam sebelum itu, mereka bersinar lebih terang daripada bintang.',
  },

  'Fu Xuan': {
    story:
      "Kepala Divination Commission di Xianzhou Luofu. Seorang bijak yang percaya diri dan berterus terang. Dengan mata ketiganya dan Matrix of Prescience, Fu Xuan menghitung rute Xianzhou dan meramal keberuntungan peristiwa yang akan datang. Ia yakin sepenuhnya bahwa semua yang ia lakukan adalah 'solusi terbaik' bagi situasi yang ada. Fu Xuan menanti 'pengunduran diri' yang dijanjikan sang jenderal. Namun, hari itu sepertinya masih... sangat jauh.",
    quote: 'Pengetahuan yang ditukar dengan rasa sakit',
  },

  Huohuo: {
    story:
      'Calon Judge di Ten-Lords Commission Xianzhou Luofu, seorang gadis Foxian muda yang dirasuki heliobus. Ia gadis penakut dan lemah yang ngeri pada segala macam hal aneh, tetapi justru bertanggung jawab memancing dan menaklukkan roh-roh jahat.',
    quote:
      'Panji ini bisa kupakai untuk mengusir iblis... tapi berguna juga untuk memberi tanda bahwa aku menyerah...',
  },

  Kafka: {
    story:
      "Di daftar pencarian Interastral Peace Corporation, berkas Kafka hanya memuat dua hal — namanya, dan satu kalimat: 'Suka mengoleksi mantel.' Sedikit yang diketahui tentang Stellaron Hunter ini, selain bahwa ia salah satu anggota yang paling dipercaya oleh Destiny's Slave, Elio. Demi mewujudkan masa depan yang dibayangkan Elio, Kafka pun mulai bekerja.",
    quote: 'Kau tak akan mengingat apa pun kecuali aku.',
  },

  Luocha: {
    story:
      'Pemuda tampan berambut pirang yang memikul peti mati di punggungnya. Sebagai anggota serikat pedagang antargalaksi, ia sayangnya terjebak dalam krisis Stellaron di Xianzhou Luofu. Bagaimanapun, keahlian medisnya yang luar biasa pasti akan berguna.',
    quote:
      'Peti mati ini bukan milikku, aku hanya dipercaya untuk membawa jasadnya kembali ke Luofu.',
  },

  Mydei: {
    story:
      'Kremnos, yang ditelan kabut! Kota yang terbelah antara kekacauan dan perang! Darah pembunuhan ayah mengalir dalam garis rajanya, dan dewanya menyandang gelar malapetaka. Mydeimos yang tak bisa mati, singa yang berbeda dari yang lain. O Chrysos Heir yang mencari Coreflame of Strife, kau harus menanggung seribu kematian, bermandikan darah di jalan pulang, dan memikul kegilaan takdir sendirian, sebab seseorang harus membunuh dewa untuk menjadi dewa. Tapal besi menghentak melintasi belantara demi penaklukan, dan akhirnya harus basah oleh darah tanah kelahirannya sendiri.',
    quote:
      "Aku putra mahkota Kremnos, 'Mydeimos', dan juga pejuang Okhema, 'Mydei'. Jika kau ingin mengenalku lebih baik, amati aku dalam pertempuran atau lawan aku sendiri.",
  },

  Pearl: {
    story:
      "Warnai bintang-bintang, telusuri aneka fenomena, dan mutiara-mutiara peradaban yang hilang akan kembali berkilau. Lahir dari seni analisis, ia mengejar puncak keindahan, namun tak pernah kehilangan warna dasar Preservation dalam dirinya: setelah ujian apinya, 'Pearl' macam apa yang akan ia panen?",
    quote:
      "Selamat datang, aku Pearl, spesialis investasi karya seni yang bekerja untuk IPC's Strategic Investment Department, dan CEO Planarcadia saat ini. Hasil perhitunganku: kita bisa mulai dari karya seniku untuk saling mengenal lebih baik.",
  },

  Phainon: {
    story:
      "Aedes Elysiae, desa perbatasan terpencil yang terasing dari dunia, kini hidup hanya dalam legenda yang samar. Pahlawan tanpa nama █████, Chrysos Heir yang membawa Coreflame 'Worldbearing', kau harus mengingat cita-cita semua dunia, memikul takdir orang banyak, dan membawa cahaya pertama fajar ke dunia yang baru — 'Namun jika fajar itu memang tak pernah ada, biarkan api amarah membakar tubuh ini menjadi abu dan berubah menjadi matahari yang membara di hari esok!'",
    quote:
      'Aku Phainon dari Aedes Elysiae. Salam. Sebagai sesama pendatang di Okhema, pertemuan kita pasti rancangan takdir. Mari. Mungkin kita bahkan akan punya kesempatan bertarung berdampingan di masa depan.',
  },

  Seele: {
    story:
      'Anggota Wildfire yang bersemangat dan pemberani, tumbuh di Underworld Belobog yang penuh bahaya. Ia terbiasa berjuang sendiri. Sebagai seseorang yang dahulu bergantung pada perlindungan orang lain, kini ia mengejar kekuatan. Demi kebenaran tentang dunia bawah tanah dan nama keluarganya, Seele sanggup menanggung kesulitan apa pun. Pelindung dan yang dilindungi, penindas dan yang ditindas... Dunia yang Seele kenal sejak kecil hanyalah dikotomi sederhana... Setidaknya, sampai gadis itu muncul.',
    quote:
      'Menggunakan kekuatan kita untuk menciptakan masyarakat yang adil... Bukankah itu tujuan yang sudah jelas?',
  },

  'The Herta': {
    story:
      'Anggota terhormat #83 dari Genius Society; manusia, perempuan, muda, cantik, menarik. Katanya ia tinggal di tepi terjauh Cosmos dan hampir tak pernah beranjak. Kalau begitu, kemunculannya kali ini... pasti untuk menangani persoalan yang harus ia urus sendiri, bukan?',
    quote:
      "Para penulis dari Intelligentsia Guild ingin memberiku gelar tambahan. Semacam 'Herta Prime' untuk memisahkanku dari boneka-bonekaku. Dangkal sekali. Bukankah boneka-boneka itu juga 'aku'? Jadi, kuberi mereka satu saran — jika mereka berani menulis itu, maka aku akan menyebut diriku THE Herta. Singkat, sederhana, langsung ke intinya, dan elegan.",
  },

  Topaz: {
    story:
      "Topaz adalah Pemimpin Special Debts Picket Team dan manajer tingkat tinggi di Strategic Investment Department di bawah Interastral Peace Corporation. Menjadi anggota 'Ten Stonehearts' di usia muda, keahlian dasar Topaz adalah 'penagihan utang.' Rekannya, Warp Trotter bernama 'Numby', juga mampu mengendus dengan tajam di mana 'kekayaan' berada, sehingga pekerjaan di bidang keamanan, penagihan utang, dan aktuaria bukanlah tantangan berarti. Saat ini keduanya berkeliling kosmos bersama, mencari segala bentuk sengketa tanggung jawab yang mungkin mengganggu kelancaran bisnis IPC.",
    quote:
      'Uang itu sarana, bukan tujuan. Pekerjaan seharusnya membuatmu bahagia... Itulah prinsip yang paling mendasar',
  },

  'Yao Guang': {
    story:
      "Tindakannya yang misterius, berani, dan radikal begitu revolusioner hingga membuat semua orang tertegun. Ia melihat segala nasib, baik maupun buruk, melalui 'mata' The Hunt. Namun, meski tahu takdir bukanlah sesuatu yang bisa dilawan, Seer Strategist itu tetap menghadapi bahaya sendirian. Diberi nasib yang begitu terkutuk... bagaimana seseorang bisa berharap mengubah takdirnya?",
    quote:
      'Aku General Yao Guang, Seer Strategist di atas Xianzhou Yuque. Seperti yang lain, kau cukup memanggilku Madam Yao. Benar, aku bisa saja meramalkan detail pertemuan ini, tapi di mana serunya? Hadir langsung di sini justru memunculkan beberapa kejutan yang menyenangkan.',
  },
}

export const localizeCharacter = <T extends { name: string; story: string; quote: string }>(
  entry: T,
  language: Language,
): T => {
  if (language === 'en') return entry

  const lore = LORE_ID[entry.name]
  return lore ? { ...entry, ...lore } : entry
}
