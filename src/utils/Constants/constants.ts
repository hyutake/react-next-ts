import { Dungeon, DungeonLength } from "@/models/darkest";
import { DungeonRecommendation, Provisions, SingleDungeonRec } from "@/models/expedition";

export type ProvisionToNumber = Record<keyof Provisions, number>;
export type DungeonProvisions = Record<DungeonLength, Provisions>;

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

export const mapDungeonToIndex = (dungeon: Dungeon | undefined) => {
    if(!dungeon) return 0;
    switch(dungeon) {
        case Dungeon.RUINS:
            return 0;
        case Dungeon.WARRENS:
            return 1;
        case Dungeon.WEALD:
            return 2;
        case Dungeon.COVE:
            return 3;
        case Dungeon.COURTYARD:
            return 4;
        case Dungeon.FARMSTEAD:
            return 5;
        case Dungeon.DARKEST_DUNGEON:
            return 6;
    }
}