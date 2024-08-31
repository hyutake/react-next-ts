"use client"

import DungeonRecommendations from "@/components/Darkest/DungeonRecommendations";
import DungeonSelector from "@/components/Darkest/DungeonSelector";
import DurationSelector from "@/components/Darkest/DurationSelector";
import useHttp from "@/hooks/use-http";
import { Dungeon, DungeonLength } from "@/models/darkest";
import { DungeonRecommendation, Provisions, SingleDungeonRec } from "@/models/expedition";
import { mapDungeonToIndex } from "@/utils/Constants/constants";
import { calculateProvisionCost } from "@/utils/costCalculator";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const DarkestExpeditionPage = () => {
    const [selectedDungeon, setSelectedDungeon] = useState<Dungeon>(Dungeon.RUINS);
    const [selectedDuration, setSelectedDuration] = useState<DungeonLength>(DungeonLength.SHORT);

    // to store the entire dungeon recommendation data (for easier POST req. creation)
    const [fullRec, setFullRec] = useState<DungeonRecommendation>();
    const [recommendations, setRecommendations] = useState<SingleDungeonRec>();

    const { sendRequest } = useHttp();

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
                setFullRec(data);

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

    const updateRecommendation = (newProvision: Provisions, newCost: number) => {
        if(fullRec == null) return;
        const newRec: DungeonRecommendation = {
            ...fullRec,
            provisions: {
                ...fullRec.provisions,
                [selectedDuration]: newProvision
            },
            cost: {
                ...fullRec.cost,
                [selectedDuration]: newCost
            }
        }
        // send 'inventory' to backend to update the json file
        const postData = async() => {
            try {
                const response = await fetch(`http://localhost:4002/darkest/expedition/recommendations/${mapDungeonToIndex(selectedDungeon)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRec)
                })
                if(response.ok) {
                    const result = await response.json();
                    console.log(result.message);
                } else {
                    console.error(response.statusText);
                }
            } catch(error) {
                console.error(error);
            }
        }
        postData();
    }

    const debugText = `DARKEST COMPANION (${selectedDungeon} : ${selectedDuration})`;

    return (
        <Grid sx={{display: 'flex', flexDirection: 'column', padding: '8px'}}>
            <h1 className="font-bold text-xl" style={{marginBottom: "8px"}}>{debugText}</h1>
            {/* Selectors */}
            <Grid sx={{display: 'flex', flexDirection: 'column', rowGap: '16px', justifyContent: 'center', alignItems: 'center', pt: '12px', pb: '24px'}}>
                <DungeonSelector selected={selectedDungeon} handleClick={handleDungeonClick} />
                <DurationSelector selected={selectedDuration} handleClick={handleDurationClick} />
            </Grid>
            {selectedDungeon && <DungeonRecommendations recommendations={recommendations} duration={selectedDuration} updateRec={updateRecommendation} />}
        </Grid>
    )
}

export default DarkestExpeditionPage;