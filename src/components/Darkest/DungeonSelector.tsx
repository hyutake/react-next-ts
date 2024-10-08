import { Dungeon } from "@/models/darkest";
import { COLORS } from "@/utils/color";
import { Grid } from "@mui/material";
import Image from "next/image";

interface DungeonSelectorProps {
    selected: Dungeon | undefined;
    handleClick: (dungeon: Dungeon) => void;
}

const DungeonSelector: React.FC<DungeonSelectorProps> = ({ selected, handleClick }) => {
    const renderButtons = () => {
        return Object.keys(Dungeon).map((key) => {
            const active = selected ? Dungeon[key as keyof typeof Dungeon] === selected : false;
    
            return <Grid item xs={2} key={key} onClick={handleClick.bind(null, Dungeon[key as keyof typeof Dungeon])} sx={{cursor: 'pointer'}}>
                <Grid sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={active ? '/darkest/torch_100.png' : '/darkest/torch_0.png'} alt={active ? 'Active' : 'Inactive'} width={40} height={55} />
                    <span style={{color: `${active ? COLORS.ORANGE_30 : 'white'}`, fontSize: '16px', lineHeight: '14px', fontWeight: '600', textAlign: 'center'}}>{Dungeon[key as keyof typeof Dungeon]}</span>
                </Grid>
            </Grid>
        })
    }


    return <Grid container columns={18} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '4px'}}>
        {renderButtons()}
    </Grid>

}

export default DungeonSelector;