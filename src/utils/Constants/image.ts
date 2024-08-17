import { Loot, Provisions } from "@/models/expedition";

type ProvisionImgStrings = Record<keyof Provisions, string>;
type LootImgStrings = Record<keyof Loot, string>;

export const PROVISION_IMG_SRC: ProvisionImgStrings = {
    aegisScale: "/darkest/provisions/Snake_scale.webp",
    antivenom: "/darkest/provisions/Antivenom.webp",
    bandage: "/darkest/provisions/Bandage.webp",
    curseCure: "/darkest/provisions/Curse_Cure.webp",
    dogTreats: "/darkest/provisions/Dog_Treats.webp",
    food: "/darkest/provisions/Food_high.webp",
    fireWood: "/darkest/provisions/Firewood.webp",
    holyWater: "/darkest/provisions/Holy_Water.webp",
    laudanum: "/darkest/provisions/Laudanum.webp",
    medicinalHerb: "/darkest/provisions/Medicinal_Herbs.webp",
    shovel: "/darkest/provisions/Shovel.webp",
    skeletonKey: "/darkest/provisions/Skeleton_Key.webp",
    theBlood: "/darkest/provisions/The_Blood.webp",
    torch: "/darkest/provisions/Torch.webp",
}

export const FOOD_IMG_SRC = {
    foodLow: "/darkest/provisions/Food_low.webp",
    foodMed: "/darkest/provisions/Food_med.webp",
    foodHigh: "/darkest/provisions/Food_high.webp",
}

export const GOLD_IMG_SRC = {
    coin: "/darkest/loot/Coin.png",
    gold_1: "/darkest/loot/Gold_1.png",
    gold_2: "/darkest/loot/Gold_2.png",
    gold_3: "/darkest/loot/Gold_3.png",
    gold_4: "/darkest/loot/Gold_4.png",
}

export const LOOT_STRINGS: LootImgStrings = {
    gold: "/darkest/loot/Gold_1.png",
    bust: "/darkest/provisions/Bust.webp",
    crest: "/darkest/provisions/Crest.webp",
    deed: "/darkest/provisions/Deed.webp",
    portrait: "/darkest/provisions/Portrait.webp",
    citrine: "/darkest/provisions/Citrine.webp",
    onyx: "/darkest/provisions/Onyx.webp",
    emerald: "/darkest/provisions/Emerald.webp",
    jade: "/darkest/provisions/Jade.webp",
    sapphire: "/darkest/provisions/Sapphire.webp",
    ruby: "/darkest/provisions/SRuby.webp",
    tapestry: "/darkest/provisions/Jute_Tapestry.webp",
    minorAntique: "/darkest/provisions/Minor_Antique.webp",
    rareAntique: "/darkest/provisions/Rare_Antique.webp",
    pewRelic: "/darkest/provisions/Pewrelic.webp",
    trapezohedron: "/darkest/provisions/Trapezohedron.webp",
    shard: "/darkest/provisions/Shard.webp",
}