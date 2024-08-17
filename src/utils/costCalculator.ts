import { Provisions } from "@/models/expedition";
import { PROVISION_COSTS } from "./Constants/shop";

export const calculateProvisionCost = (provisions: Provisions | undefined): number => {
    if(provisions) {
        let cost = 0;
        Object.entries(provisions).forEach(([key, value]) => {
            cost += (PROVISION_COSTS[key as keyof Provisions] * value);
        })
        return cost;
    }
    return 0;
}