"use client"

import DungeonRecommendations from "@/components/Darkest/DungeonRecommendations";
import DungeonSelector from "@/components/Darkest/DungeonSelector";
import DurationSelector from "@/components/Darkest/DurationSelector";
import { Dungeon, DungeonLength } from "@/models/darkest";
import { DungeonRecommendation, Provisions, SingleDungeonRec } from "@/models/expedition";
import { calculateProvisionCost } from "@/utils/costCalculator";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const mapDungeonToIndex = (dungeon: Dungeon | undefined) => {
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

const DarkestExpeditionPage = () => {
    const [selectedDungeon, setSelectedDungeon] = useState<Dungeon>(Dungeon.RUINS);
    const [selectedDuration, setSelectedDuration] = useState<DungeonLength>(DungeonLength.SHORT);

    const [recommendations, setRecommendations] = useState<SingleDungeonRec>();

    const handleDungeonClick = (dungeon: Dungeon) => {
        setSelectedDungeon(dungeon);
    }

    const handleDurationClick = (duration: DungeonLength) => {
        setSelectedDuration(duration);
    }

    useEffect(() => {
        // fetch recommendation data
        const fetchData = async() => {
            const response = await fetch(`http://localhost:4002/darkest/expedition/recommendations/${mapDungeonToIndex(selectedDungeon)}`, {
                method: 'GET',
            })
            const result = await response.json();
            return result;
        }
        if(selectedDungeon && selectedDuration) {
            fetchData().then((data: DungeonRecommendation) => {
                console.log(data);

                setRecommendations({
                    dungeon: data.dungeon,
                    duration: selectedDuration,
                    provisions: data.provisions[selectedDuration],
                    cost: calculateProvisionCost(data.provisions[selectedDuration]),
                    heroes: data.heroes,
                    tips: data.tips
                })
            })
        }
    }, [selectedDungeon, selectedDuration])

    const debugText = `DARKEST COMPANION (${selectedDungeon} : ${selectedDuration})`;

    return (
        <Grid sx={{display: 'flex', flexDirection: 'column', padding: '8px'}}>
            <h1 className="font-bold text-xl" style={{marginBottom: "8px"}}>{debugText}</h1>
            {/* Selectors */}
            <Grid sx={{display: 'flex', flexDirection: 'column', rowGap: '16px', justifyContent: 'center', alignItems: 'center', pt: '12px', pb: '24px'}}>
                <DungeonSelector selected={selectedDungeon} handleClick={handleDungeonClick} />
                <DurationSelector selected={selectedDuration} handleClick={handleDurationClick} />
            </Grid>
            {selectedDungeon && <DungeonRecommendations recommendations={recommendations} duration={selectedDuration} />}
        </Grid>
    )
}

export default DarkestExpeditionPage;