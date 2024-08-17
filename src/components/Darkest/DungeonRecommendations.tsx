import { DungeonLength } from "@/models/darkest";
import { Provisions, SingleDungeonRec } from "@/models/expedition";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Bag from "./Bag";
import { SHOP_PROVISIONS } from "@/utils/constants";
import Button from "../UI/Button";
import { calculateProvisionCost } from "@/utils/costCalculator";

interface DungeonRecommendationsProps {
    recommendations: SingleDungeonRec | undefined;
    duration: DungeonLength;
}

// Need a 'normal' view and a 'edit' view
const DungeonRecommendations: React.FC<DungeonRecommendationsProps> = ({
    recommendations, duration
}) => {
    const [showShop, setShowShop] = useState<boolean>(false);

    const [shopProvisions, setShopProvisions] = useState<Provisions>();
    const [inventory, setInventory] = useState<Provisions>();

    const [inventoryCost, setInventoryCost] = useState<number>();

    // [WIP]: to update the provisions displayed based on the selected dungeon type + duration
    useEffect(() => {
        setInventory(recommendations?.provisions);
        updateShopProvisions(recommendations?.provisions);

        setInventoryCost(calculateProvisionCost(recommendations?.provisions));
    }, [recommendations, inventory])

    const onShopItemClick = (item: keyof Provisions) => {
        setShopProvisions((prevState) => {
            if(prevState == undefined) return;
            return {
                ...prevState,
                [item]: prevState[item] - 1
            }
        })
        setInventory((prevState) => {
            if(prevState == undefined) return;
            return {
                ...prevState,
                [item]: prevState[item] + 1
            }
        })
    }

    const onInventoryItemClick = (item: keyof Provisions) => {
        setInventory((prevState) => {
            if(prevState == undefined) return;
            return {
                ...prevState,
                [item]: prevState[item] - 1
            }
        })
        setShopProvisions((prevState) => {
            if(prevState == undefined) return;
            return {
                ...prevState,
                [item]: prevState[item] + 1
            }
        })
    }

    const updateShopProvisions = (prov: Provisions | undefined) => {
        if(prov == undefined) setShopProvisions(SHOP_PROVISIONS[duration]);
        else {
            const baseShopProvisions: Provisions = SHOP_PROVISIONS[duration];
            setShopProvisions({
                aegisScale: 0,
                curseCure: 0,
                dogTreats: 0,
                fireWood: 0,
                theBlood: 0,
                antivenom: baseShopProvisions.antivenom - prov.antivenom,
                bandage: baseShopProvisions.bandage - prov.bandage,
                food: baseShopProvisions.food - prov.food,
                holyWater: baseShopProvisions.holyWater - prov.holyWater,
                laudanum: baseShopProvisions.laudanum - prov.laudanum,
                medicinalHerb: baseShopProvisions.medicinalHerb - prov.medicinalHerb,
                shovel: baseShopProvisions.shovel - prov.shovel,
                skeletonKey: baseShopProvisions.skeletonKey - prov.skeletonKey,
                torch: baseShopProvisions.torch - prov.torch
            })
        }
    };

    // should display shop AND bag view if true, else just the bag view
    const toggleView = () => {
        setShowShop(prevState => !prevState);
    }

    return <Grid sx={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', rowGap: '12px'}}>
        {showShop && <Grid sx={{display: "flex", flexDirection: "column", rowGap: "12px"}}>
            <label style={{fontSize: '24px', lineHeight: '18px'}}>SHOP</label>
            <Bag items={shopProvisions} onItemClick={onShopItemClick} enableMaxStacks={false}/>
        </Grid>} 
        <Grid sx={{display: "flex", flexDirection: "column", rowGap: "12px"}}>
            <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <label style={{fontSize: '24px', lineHeight: '18px'}}>INVENTORY <span style={{color: 'yellow'}}>({inventoryCost})</span></label>
                <Button label={"Edit"} onClick={toggleView} />
            </Grid>
            <Bag items={inventory} onItemClick={onInventoryItemClick}/>
        </Grid>
    </Grid>
}

export default DungeonRecommendations;