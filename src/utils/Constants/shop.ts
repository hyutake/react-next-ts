import { Provisions } from "@/models/expedition"
import { DungeonProvisions, ProvisionToNumber } from "./constants"
import { DungeonLength } from "@/models/darkest"

// costs
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