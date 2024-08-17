import { DungeonLength } from "@/models/darkest";
import { Provisions, SingleDungeonRec } from "@/models/expedition";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Bag from "./Bag";
import { PROVISION_COSTS, SHOP_PROVISIONS } from "@/utils/Constants/shop";
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
    }, [recommendations])

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
            const newState = {
                ...prevState,
                [item]: prevState[item] + 1
            }
            setInventoryCost((prevState) => {
                if(prevState) return prevState + PROVISION_COSTS[item];
                return;
            });
            return newState
        })
    }

    const onInventoryItemClick = (item: keyof Provisions) => {
        setInventory((prevState) => {
            if(prevState == undefined) return;
            const newState = {
                ...prevState,
                [item]: prevState[item] - 1
            }
            setInventoryCost((prevState) => {
                if(prevState) return prevState - PROVISION_COSTS[item];
                return;
            });
            return newState
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
                food: baseShopProvisions.food - prov.food,
                shovel: baseShopProvisions.shovel - prov.shovel,
                antivenom: baseShopProvisions.antivenom - prov.antivenom,
                bandage: baseShopProvisions.bandage - prov.bandage,
                medicinalHerb: baseShopProvisions.medicinalHerb - prov.medicinalHerb,
                skeletonKey: baseShopProvisions.skeletonKey - prov.skeletonKey,
                holyWater: baseShopProvisions.holyWater - prov.holyWater,
                laudanum: baseShopProvisions.laudanum - prov.laudanum,
                torch: baseShopProvisions.torch - prov.torch,
                aegisScale: 0,
                curseCure: 0,
                dogTreats: 0,
                fireWood: 0,
                theBlood: 0,
            })
        }
    };

    // should display shop AND bag view if true, else just the bag view
    const toggleView = () => {
        setShowShop(prevState => !prevState);
    }

    const saveInventory = () => {
        console.log("saveInventory WIP!");
    }

    return <Grid sx={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', rowGap: '24px'}}>
        {showShop && <Grid sx={{display: "flex", flexDirection: "column", rowGap: "12px"}}>
            <label style={{fontSize: '24px', lineHeight: '18px'}}>SHOP</label>
            <Bag items={shopProvisions} onItemClick={onShopItemClick} isShop={true}/>
        </Grid>} 
        <Grid sx={{display: "flex", flexDirection: "column", rowGap: "12px"}}>
            <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <label style={{fontSize: '24px', lineHeight: '18px'}}>INVENTORY <span style={{color: 'gold'}}>({inventoryCost})</span></label>
                <Grid sx={{display: 'flex', columnGap: '12px'}}>
                    <Button label={showShop ? "Cancel" : "Edit"} onClick={toggleView} />
                    {showShop && <Button label={"Save"} onClick={saveInventory}/>}
                </Grid>
            </Grid>
            <Bag items={inventory} onItemClick={onInventoryItemClick}/>
        </Grid>
    </Grid>
}

export default DungeonRecommendations;