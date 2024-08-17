import { Dungeon, DungeonLength } from "@/models/darkest";
import { DungeonRecommendation, Provisions, SingleDungeonRec } from "@/models/expedition";

type ProvisionToNumber = Record<keyof Provisions, number>;
type DungeonProvisions = Record<DungeonLength, Provisions>;

const RUINS_SHORT_PROVISIONS: Provisions = {
    aegisScale: 0,
    antivenom: 0,
    bandage: 1,
    curseCure: 0,
    dogTreats: 0,
    food: 12,
    fireWood: 0,
    holyWater: 2,
    laudanum: 0,
    medicinalHerb: 1,
    shovel: 2,
    skeletonKey: 1,
    theBlood: 0,
    torch: 8,
}

const RUINS_MED_PROVISIONS: Provisions = {
    aegisScale: 0,
    antivenom: 0,
    bandage: 2,
    curseCure: 0,
    dogTreats: 0,
    food: 18,
    fireWood: 1,
    holyWater: 3,
    laudanum: 0,
    medicinalHerb: 2,
    shovel: 3,
    skeletonKey: 2,
    theBlood: 0,
    torch: 13, 
}

const RUINS_LONG_PROVISIONS: Provisions = {
    aegisScale: 0,
    antivenom: 0,
    bandage: 3,
    curseCure: 0,
    dogTreats: 0,
    food: 24,
    fireWood: 2,
    holyWater: 4,
    laudanum: 0,
    medicinalHerb: 3,
    shovel: 4,
    skeletonKey: 3,
    theBlood: 0,
    torch: 16,
}

export const RUINS_PROVISIONS: DungeonProvisions = {
    [DungeonLength.SHORT]: RUINS_SHORT_PROVISIONS,
    [DungeonLength.MEDIUM]: RUINS_MED_PROVISIONS,
    [DungeonLength.LONG]: RUINS_LONG_PROVISIONS,
}

export const TEST_RECOMMENDATION: SingleDungeonRec = {
    dungeon: Dungeon.RUINS,
    duration: DungeonLength.SHORT,
    provisions: RUINS_PROVISIONS.short,
    cost: 2000,
    heroes: [4, 7, 9, 10, 15],
    tips: [
        "Majority of enemies here are unholy type",
        "Crusader and Vestal have bonus % dmg against unholy type enemies"
    ]
}

export const PROVISION_COSTS: ProvisionToNumber = {
    aegisScale: 0,
    antivenom: 150,
    bandage: 150,
    curseCure: 0,
    dogTreats: 0,
    food: 75,
    fireWood: 0,
    holyWater: 150,
    laudanum: 100,
    medicinalHerb: 200,
    shovel: 250,
    skeletonKey: 200,
    theBlood: 0,
    torch: 75,
}

// maximum items per inventory slot
export const PROVISION_MAX_STACK: ProvisionToNumber = {
    aegisScale: 4,
    antivenom: 6,
    bandage: 6,
    curseCure: 6,
    dogTreats: 2,
    food: 12,
    fireWood: 1,
    holyWater: 6,
    laudanum: 6,
    medicinalHerb: 6,
    shovel: 4,
    skeletonKey: 6,
    theBlood: 6,
    torch: 8,
}

// shop amounts //
const SHOP_PROVISION_SHORT: Provisions = {
    food: 18,
    shovel: 4,
    antivenom: 6,
    bandage: 6,
    medicinalHerb: 6,
    skeletonKey: 6,
    holyWater: 6,
    laudanum: 6,
    torch: 18,
    aegisScale: 0,
    curseCure: 0,
    dogTreats: 0,
    fireWood: 0,
    theBlood: 0,
}

const SHOP_PROVISION_MED: Provisions = {
    food: 24,
    shovel: 6,
    antivenom: 9,
    bandage: 9,
    medicinalHerb: 9,
    skeletonKey: 9,
    holyWater: 9,
    laudanum: 9,
    torch: 24,
    aegisScale: 0,
    curseCure: 0,
    dogTreats: 0,
    fireWood: 0,
    theBlood: 0,
}

const SHOP_PROVISION_LONG: Provisions = {
    food: 30,
    shovel: 8,
    antivenom: 12,
    bandage: 12,
    medicinalHerb: 12,
    skeletonKey: 12,
    holyWater: 12,
    laudanum: 12,
    torch: 30,
    aegisScale: 0,
    curseCure: 0,
    dogTreats: 0,
    fireWood: 0,
    theBlood: 0,
}

export const SHOP_PROVISIONS: DungeonProvisions = {
    [DungeonLength.SHORT]: SHOP_PROVISION_SHORT,
    [DungeonLength.MEDIUM]: SHOP_PROVISION_MED,
    [DungeonLength.LONG]: SHOP_PROVISION_LONG,
}