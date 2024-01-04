"use client"

import DungeonSelector from "@/components/Darkest/DungeonSelector";
import { Dungeon } from "@/models/darkest";
import { Grid } from "@mui/material";
import { useState } from "react";

const DarkestPage = () => {
    const [selectedDungeon, setSelectedDungeon] = useState<Dungeon>();

    const handleClick = (dungeon: Dungeon) => {
        setSelectedDungeon(dungeon);
    }

    return (
        <Grid sx={{display: 'flex', flexDirection: 'column', padding: '8px', justifyContent: 'center', alignItems: 'center'}}>
            <h1 className="font-bold text-xl">DARKEST COMPANION {selectedDungeon ? `(${selectedDungeon})` : null}</h1>
            <DungeonSelector selected={selectedDungeon} handleClick={handleClick} />
        </Grid>
    )
}

export default DarkestPage;