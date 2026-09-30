import footer_bg_img from "./img/foooter-bg-img.webp"
import logo from "./img/logo.webp"
import hero_bg from "./img/hero_bg.jpg"
import download_icon from "./icons/DownloadIcon.svg"
import arrow_down from "./icons/eva_arrow-down-fill.svg"
import globe_icon from "./icons/Globe.svg"
import tumbal from './img/tumbal.jpg'

import img1 from './img/game_img_1.webp'
import img2 from './img/game_img_2.webp'
import img3 from './img/game_img_3.webp'
import img4 from './img/game_img_4.webp'
import img5 from './img/game-img-5.webp'
import img6 from './img/game-img6.webp'
import img7 from './img/game_img7.webp'

import hss from './img/hss1.webp'
import jarilo from './img/jarilo.webp'
import luofu from './img/luofu.webp'
import penacony from './img/penacony.webp'
import amphoreus from './img/ampho.webp'
import planacardia from './img/palacardia.webp'

import news from './img/news.jpg'
import news1 from './img/news1.jpg'
import news2 from './img/news2.jpg'
import news3 from './img/news3.jpg'
import news4 from './img/news4.jpg'
import news5 from './img/news5.jpg'
import news6 from './img/news6.jpg'
import newsmain1 from './img/newsmain1.jpg'
import newsmain2 from './img/newsmain2.jpg'

import march from './img/march-7th-swordmaster_full.webp'
import danheng from './img/dan-heng-permansor-terrae_full.webp'
import stelle from './img/trailblazer-remembrance_full.webp'
import sunday from './img/sunday_full.webp'
import himeko from './img/himeko-nova_full.webp'
import welt from './img/welt_full.webp'
import footerbg from './img/foooter-bg-img.webp'

import aventurine from './img/aventurine_full.webp'
import blackswan from './img/black-swan_full.webp'
import blade from './img/blade_full.webp'
import castorice from './img/castorice_full.webp'
import cerydra from './img/cerydra_full.webp'
import cyrene from './img/cyrene_full.webp'
import evanescia from './img/evanescia_full.webp'
import firefly from './img/firefly_full.webp'
import fuxuan from './img/fu-xuan_full.webp'
import huohuo from './img/huohuo_full.webp'
import kafka from './img/kafka_full.webp'
import luocha from './img/luocha_full.webp'
import mydei from './img/mydei_full.webp'
import pearl from './img/pearl_full.webp'
import phainon from './img/phainon_full.webp'
import seele from './img/seele_full.webp'
import theherta from './img/the-herta_full.webp'
import topaz from './img/topaz_full.webp'
import yaoguang from './img/yao-guang_full.webp'

import abundance from './img/path_abundance.webp'
import destruction from './img/path_destruction.webp'
import elation from './img/path_elation.webp'
import erudition from './img/path_erudition.webp'
import harmony from './img/path_harmony.webp'
import remembrance from './img/path_remembrance.webp'
import hunt from './img/path_hunt.webp'
import nihility from './img/path_nihility.webp'
import preservation from './img/path_preservation.webp'

import fire from './img/ele_fire.webp'
import ice from './img/ele_ice.webp'
import imaginary from './img/ele_imaginary.webp'
import physical from './img/ele_physical.webp'
import quantum from './img/ele_quantum.webp'
import wind from './img/ele_wind.webp'
import lightning from './img/ele_lightning.webp'

import video1 from './vid/Gameplayvid1.mp4'
import video2 from './vid/GameplayVid2.mp4'
import video3 from './vid/gameplayvid3.mp4'
import video4 from './vid/gameplayvid4.mp4'
import video5 from './vid/gamevid5.mp4'

export const assets = {
    footer_bg_img,
    logo,
    hero_bg,
    download_icon,
    arrow_down,
    globe_icon,
    tumbal,
    footerbg
}

export const media = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7
]

export const worlds = [
    {image: hss, label: 'Herta Space Station'},
    {image: jarilo, label: 'Jarilo IV'},
    {image: luofu, label: 'Xianzhou Luofu'},
    {image: penacony, label: 'Penacony'},
    {image: amphoreus, label: 'Amphoreus'},
    {image: planacardia, label: 'Planarcadia'}
]

export const newsMedia = {
    news,
    news1,
    news2,
    news3,
    news4,
    news5,
    news6,
    newsmain1,
    newsmain2
}

export type ElementName =
    | 'Fire'
    | 'Ice'
    | 'Imaginary'
    | 'Physical'
    | 'Quantum'
    | 'Wind'
    | 'Lightning'

export const elementIcons: Record<ElementName, string> = {
    Fire: fire,
    Ice: ice,
    Imaginary: imaginary,
    Physical: physical,
    Quantum: quantum,
    Wind: wind,
    Lightning: lightning
}

export type Trailblazer = {
    image: string
    name: string
    title?: string
    element: ElementName
    path: string
    story: string
    quote: string
}

export const trailblazers: Trailblazer[] = [
    {image: march, name: 'March 7th', title: 'The Swordmaster', element: 'Ice', path: 'Hunt', 
    story: "A spirited, quirky young girl who is into all the things girls her age should be interested in, for example, taking photos. She was awakened from a piece of drifting eternal ice only to find out that she knows nothing about herself or her past. While initially in low spirits due to her lack of identity, she decided to name herself after the date she came into this new life.And thus, on that day March 7th was born.", 
    quote: 'Well would you listen to that! I saved everyone without causing any trouble! Youre pretty awesome, March 7th!'},

    {image: danheng, name: 'Dan Heng', title: 'Permansor Terrae', element: 'Imaginary', path: 'Destruction',
    story: "A cold and reserved young man who wields a spear known as Cloud-Piercer. He acts as the train's guard on its long Trailblaze journey. He carefully observes the changes in everything around him, albeit with a calm demeanor that may appear to be indifference. He faithfully records everything they encounter on the Trailblaze path in the Express's archives. Danheng never talks much about his past. In fact, he joined the crew of the Express to escape from it.But will the Express really be able to take him far away from his past?",
    quote: "Even as we speak, farewells are happening troughout the universe. The grief that we share is real, but there's nothing special about it."},

    {image: stelle, name: 'Trailblazer', title: 'Remembrance', element: 'Ice', path: 'Remembrance',
    story: "The one and only, the most powerful being of the whole universe, the savior of Jarilo IV, Xianzhou Luofu, Penacony, and Amphoreus, the obliterator of all evil, the conqueror of all Aeon, the collector of friends, the trashcan kicker, the one and only trailblazer who boarded the Astral Express. They chose to travel with the Astral Express to eliminate the dangers posed by the Stellaron.", 
    quote: "Shortly after i was born i once asked my mother what should i do if i ever faced any hardships, she then answered kill' em all!"},

    {image: sunday, name: 'Sunday', element: 'Imaginary', path: 'Harmony', 
    story: "The traveler whose wings were clipped... where to shall his footsteps lead?", 
    quote: "There's always a paradise that needs to built. That vow is like the sun in the sky, perhaps i'll melt and fall away before reaching it... But some hardships i must endure."},

    {image: himeko, name: 'Himeko', title: 'Nova', element: 'Fire', path: 'Erudition', 
    story: "An adventurous scientist who encountered the Astral Express as a child when it got stranded in her home world. At that time, some existence in the Express revealed to this young girl a whole world outside of her own — the universe. Years later, Himeko finally repaired the train and began her journey to the stars, but she realized that this was only the beginning. On the Trailblaze path, she would need many more companions... Even though such companions may have different destinations in mind, they all gaze at the same starry sky.", 
    quote: "I'am Himeko, Navigator of Astral Express, and your family, always looking out at the same horizon as you."},

    {image: welt, name: 'Welt', element: 'Imaginary', path: 'Nihility', 
    story: "The wise and sophisticated former Anti-Entropy Sovereign who inherits the name of the world — Welt. He has saved Earth from annihilation time and time again. After the calamity ended, the heavy burden ordained by fate to Welt had been removed for a time, and he became an animation storyboard artist. However, after the conspiracy with St. Fountain came to a close, Welt had no choice but to venture with the initiator of the incident to the other side of the space portal.Perhaps even he didn't expect the new journey and companions that awaited him.", 
    quote: "The galaxy is vast beyond compare, containing an infinite number of possibilities. An individual's fate shouldn't be limited to a single path ordained by heaven."}
]

export const path = [
    abundance,
    destruction,
    elation,
    erudition,
    harmony,
    preservation
]

export const pathIcons = {
    'The Abundance': abundance,
    'The Destruction': destruction,
    'The Elation': elation,
    'The Erudition': erudition,
    'The Harmony': harmony,
    'The Hunt': hunt,
    'The Nihility': nihility,
    'The Preservation': preservation,
    'The Remembrance': remembrance
}

export type Character = {
    image: string
    name: string
    title?: string
    element: ElementName
    path: string
    story: string
    quote: string
}

export const characters: Character[] = [
    {image: aventurine, name: 'Aventurine', title: '', element: 'Imaginary', path: 'Preservation', 
    story: "A senior manager in the IPC Strategic Investment Department and one of the Ten Stonehearts. His Cornerstone is 'Aventurine of stratagems.' He possesses an air of frivolity and doesn't shy away from taking risks. His constant smile makes it difficult for people to discern his true feelings. He won his current position by wagering against fate itself. He views life as a high-stakes, high-return investment, and he plays this particular gamble with masterful ease.", 
    quote: "Go ahead, use me as you wish, even stab me in the back if you see fit. Exploitation and treachery are simply tools of the trade. But remember, i don't make deals that don't pay off... So, i hope you don't disappoint me."},

    {image: blackswan, name: 'Black Swan', title: '', element: 'Wind', path: 'Nihility', 
    story: "A Memokeeper of the Garden of Recollection. A mysterious and elegant soothsayer. Bears a warm smile and is willing to patiently heed the words of another, and thus uses such means as a pretext to enter 'memories' and gain a comprehension over the flow of all information. Feels strongly about collecting unique memories, yet the thoughts that guide her are hard to glean.", 
    quote: "If i can identify and encapsulate a fragment of memory before it's unveiled to the world, those solitary moments of delight are my most favored and unique memories."},

    {image: blade, name: 'Blade', title: '', element: 'Wind', path: 'Destruction', 
    story: "A swordsman who abandoned his body to become a blade. Birth name unknown. He pledges loyalty to Destiny's Slave, and possesses a terrifying self-healing ability. Blade wields an ancient sword riddled with cracks, just like his body and his mind.", 
    quote: "When will death come for me? My patience is wearing thin"},

    {image: castorice, name: 'Castorice', title: '', element: 'Quantum', path: 'Remembrance', 
    story: "'Servant of Death' Castorice The land that reveres death, Aidonia, where snow falls endlessly, has today drifted into a sweet slumber. Castorice, daughter of the River of Souls, Chrysos Heir in search of 'Death' Coreflame, sets forth. You must guard the lament of souls and embrace the solitude of destiny. Life and death are but a journey. When butterfly alights on the branch, what withers will bloom anew.", 
    quote: "Welcome to Okhema, I am Castorice. Apologies, it is my habit to keep my distance from others... I can get closer if you wish, however."},

    {image: cerydra, name: 'Cerydra', title: '', element: 'Wind', path: 'Harmony', 
    story: "The Northern Empire, a lost dynasty, where frozen lands burn with ambitions of conquest. Sovereign Cerydra, Chrysos Heir who wields the Coreflame of 'Law', you shall set your pieces, challenge the gods, pass judgment upon the faithless, and carve the path of Flame-Chase into the fate of this world. 'This is no end. The path of Amphoreus shall blaze across the stars!'", 
    quote: "Flamebearer, 'Tyrant', 'Empress', 'Supreme Commander', 'Imperator'... The world has given me countless titles, but you may simply call me by my true name, Cerydra"},

    {image: cyrene, name: 'Cyrene', title: '', element: 'Ice', path: 'Remembrance', 
    story: "A meteor streaks across the night sky, sending ripples through the river of life, gleaming in thirteen hues. Daughter of Aedes Elysiae, Chrysos Heir who nourishes '██,' sow the Seed of Memory, so that flowers of the past may bloom in tomorrow. — 'And together, we shall write a verse unlike any before ♪'", 
    quote: "Is this a meeting ordained by fate, or... a long overdue reunion? It's making my heart beat faster. Then... please once again call me 'Cyrene', just like when we met the first time, okay?"},

    {image: evanescia, name: 'Evanescia', title: '', element: 'Physical', path: 'Elation', 
    story: "One season of Phantasmoon waxing full, one season of mortal ephemerality: the mysterious lady has appeared in Planarcadia once more! Fallen petals scatter with ease, and her stay was but a fleeting instant. Everything about this new era enthralls her, and she will not allow anyone to bring it to ruin... A cutter adjudicates right and wrong, but who can say how much good or evil lies within oneself?", 
    quote: "Congrats, you've hit the jackpot! I'm Evanescia. Nice to meet you, Main Character Little Raccoon. Usually, amidst all this revelry, I just make sure the Phantasmoon Games run smoothly... But this time? Sharing the stage with you doesn't sound half bad!"},

    {image: firefly, name: 'Firefly', title: '', element: 'Fire', path: 'Destruction', 
    story: "A member of the Stellaron Hunters and a young girl clad in a mechanical armor 'SAM.' Born as a weapon, she's afflicted with the agony of Entropy Loss Syndrome due to genetic modification. She joined the Stellaron Hunters in search of the meaning of life, relentlessly pursuing ways to defy fate.", 
    quote: "Fireflies are such magical creatures, aren't they? They may throw themselves at a flame or suddenly grow old, but every night before that, they will shine brighter than the stars."},

    {image: fuxuan, name: 'Fu Xuan', title: '', element: 'Quantum', path: 'Preservation', 
    story: "The head of the Xianzhou Luofu's Divination Commission. A confident and blunt sage. Using her third eye and the Matrix of Prescience, Fu Xuan calculates the Xianzhou's route and predicts the fortune of future events. She firmly believes that everything she does is the 'best solution' for the situation. Fu Xuan is waiting for the general's promised 'abdication.' However, that day still seems... very far away.", 
    quote: "Knowledge exchanged with pain"},

    {image: huohuo, name: 'Huohuo', title: '', element: 'Wind', path: 'Abundance', 
    story: "A trainee Ten-Lords Commission Judge of the Xianzhou Luofu, she is a young Foxian girl possessed by a heliobus. She is a timid and weak girl who is afraid of all kinds of strange things, but is responsible for luring and subduing evil spirits.", 
    quote: "I can use this banner to dispel demons... but it also comes in handy when signaling my surrender..."},

    {image: kafka, name: 'Kafka', title: '', element: 'Lightning', path: 'Nihility', 
    story: "On the Interastral Peace Corporation's wanted list, Kafka's only has two things — her name, and a single sentence: 'Likes collecting coats.' Little is known about this Stellaron Hunter, other than that she is one of Destiny's Slave Elio's most trusted members. In order to achieve Elio's envisioned future, Kafka gets to work.", 
    quote: "You won't remember a thing except me."},

    {image: luocha, name: 'Luocha', title: '', element: 'Imaginary', path: 'Abundance', 
    story: "A blond-haired handsome young man who carries a coffin on his back. As a member of the intergalactic merchant guild, he was unfortunately caught in the Xianzhou Luofu's Stellaron crisis. Somehow, his superb medical skills are sure to be of use.", 
    quote: "This coffin isn't mine, I was merely entrusted to take the body back to the Luofu."},

    {image: mydei, name: 'Mydei', title: '', element: 'Imaginary', path: 'Destruction', 
    story: "Kremnos, swallowed by mist! City riven between chaos and war! The blood of patricide flows through its royal line, and its god bears the title of calamity.The undying Mydeimos, the lion apart from the rest. O Chrysos Heir that seeks the Coreflame of Strife, you must suffer a thousand deaths, be bathed in blood on the path home, and bear the madness of fate alone, for one must slay a god to become one. Iron-hooves pound across the wilderness for the campaign, and must eventually soak in the blood of their homeland.", 
    quote: "I am the crown prince of Kremnos 'Mydeimos', and also the warrior of Okhema 'Mydei'. If you want to know me better, observe me in battle or fight me yourself."},

    {image: pearl, name: 'Pearl', title: '', element: 'Ice', path: 'Elation', 
    story: "Color the stars, trace the myriad phenomena, and the lost pearls of civilization regain their luster. Born from the art of analysis, she pursues the pinnacle of beauty, yet has never lost her underlying hue of the Preservation: After her trial by fire, what kind of 'Pearl' will she harvest?", 
    quote: "Welcome, I'am Pearl, an artwork investment specialist working for the IPC's Strategic Investment Departement, and Planarcadia's current CEO. My calculated outcome: we can start with my artwork to get to know each other better."},

    {image: phainon, name: 'Phainon', title: '', element: 'Physical', path: 'Destruction', 
    story: "Aedes Elysiae, a remote frontier village isolated from the world, now lives on only in cryptic legends. Nameless hero █████, the Chrysos Heir carrying the Coreflame of 'Worldbearing', you must memorize the ideals of all worlds, carry the fate of multitudes, and bring the first light of dawn to the new world —'But should dawn have never existed, let the fires of rage burn this body to ashes and transform into the blazing sun of tomorrow!'", 
    quote: "I'am Phainon of Aedes Elysiae. Greetings. As fellow outlanders in Okhema, our meeting is surely fate's design. Come. Maybe we'll even have a chance to fight alongside each other in the future."},

    {image: seele, name: 'Seele', title: '', element: 'Quantum', path: 'Hunt', 
    story: "A spirited and valiant member of Wildfire who grew up in the perilous Underworld of Belobog. She is accustomed to being on her own. As someone who once relied on others for protection, she now pursues strength. For the truth of the underground and her family's name, Seele can endure any kind of adversity. The protectors and the protected, the oppressors and the oppressed... The world Seele grew up knowing was just a simple dichotomy...That is, until that young girl appeared.", 
    quote: "To use our strength to create a fair society... Isn't that the obvious goal?"},

    {image: theherta, name: 'The Herta', title: '', element: 'Ice', path: 'Erudition', 
    story: "Esteemed member #83 of the Genius Society, human, female, young, beautiful, attractive. It's said that she lives in the far edge of the Cosmos, almost never leaving. Sounds like her appearance this time... must be to deal with an issue that has to be handled herself, right?", 
    quote: "The writers from the Intelligentsia Guild wanted to give me an extra title. Something like 'Herta Prime' to separate me from my puppets. How banal. Are the puppets not 'me' as well? So, I gave them a suggestion — if they dared to write that, then I would call myself THE Herta. It's short, simple, straight to the point, and elegant."},

    {image: topaz, name: 'Topaz', title: '', element: 'Fire', path: 'Hunt', 
    story: "Topaz is the Leader of the Special Debts Picket Team and high-level manager of the Strategic Investment Department under the Interastral Peace Corporation. A member of the 'Ten Stonehearts' at a young age, Topaz's foundational expertise is 'debt retrieval.' Her partner, the Warp Trotter 'Numby', is also capable of keenly perceiving where 'riches' are located, ensuring that jobs based in security, debt collection, and actuarial varieties are of no great challenge. At presently they are traveling the cosmos together, seeking all manner of liability disputes that might be affecting the stable progression of the IPC's businesses.", 
    quote: "Money is a means, not an end. Work should make you happy... That's the most fundamental principle"},

    {image: yaoguang, name: 'Yao Guang', title: '', element: 'Physical', path: 'Elation', 
    story: "Her mysterious, bold, and radical actions were so revolutionary that they left everyone stunned. She saw all fortune, good and ill, through the 'eye' of The Hunt. Yet, knowing that fate is not to be defied, the Seer Strategist still faced the danger alone. To be dealt such a cursed fortune... How can one ever hope to alter their fate?", 
    quote: "I'am General Yao Guang, Seer Strategist aboard the Xianzhou Yuque. Like everyone else, you may simply call me Madam Yao. It's true, i could have divined the finer details of this encounter, but where's the fun in that? Being here in person has turned up spme rather pleasant surprises."},
    
]

export type GameplayEntry = {
    video: string
    label: string
    description: string
}

export const gameplay: GameplayEntry[] = [
    {video: video1, label: "explore 6 different worlds",
    description: "Board the Astral Express and set course for six worlds that share nothing but the rails between them — the derelict corridors of the Herta Space Station, the frostbitten city of Belobog on Jarilo IV, the silkpunk flagship fleet of the Xianzhou Luofu, the endless dream of Penacony, the myth-bound shores of Amphoreus, and the neon carnival of Planarcadia. Each one carries its own history, its own people, and its own reason to make you stay a little longer."},

    {video: video2, label: "Engage in an intense combat",
    description: "Combat is turn-based, but it never sits still. Read each enemy's weakness, chain the right elements to shatter their Toughness bar, and bank your Skill Points for the moment a well-timed Ultimate flips the fight. Action order, weakness coverage, and who you break first decide how the battle ends."},

    {video: video3, label: "Collect characters that you met on your journey",
    description: "Almost everyone you meet along the way can end up fighting beside you. Warp for 4-star and 5-star characters spread across seven elements and nine Paths, then raise their Traces, Light Cones, and Relics until they fill the gap your team has been carrying. No two rosters ever end up looking the same."},

    {video: video4, label: "Many end game content to play",
    description: "When the story goes quiet, the real testing begins. Memory of Chaos, Pure Fiction, and Apocalyptic Shadow each reward a completely different kind of team, while the Simulated Universe rolls a fresh set of Blessings and Curses on every run. The rotations refresh on a cycle, so there is always another puzzle waiting on your roster."},

    {video: video5, label: "New events every month with unique gameplay",
    description: "Every version update brings events that play by their own rules, from rhythm challenges and tower defense to card duels and full side stories with their own cast. They run for a limited time, pay out Stellar Jade and upgrade materials, and rarely repeat the same idea twice."},
]

export const shortvideo = {
    video1,
    video2,
    video3,
    video4,
    video5
}

    
