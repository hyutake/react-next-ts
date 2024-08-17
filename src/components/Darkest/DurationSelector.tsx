import { DungeonLength } from "@/models/darkest";
import { COLORS } from "@/utils/color";
import { Grid } from "@mui/material";
import Image from "next/image";

interface DurationSelectorProps {
    selected: DungeonLength | undefined;
    handleClick: (duration: DungeonLength) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ selected, handleClick }) => {
    const renderButtons = () => {
        return Object.keys(DungeonLength).map((key) => {
            const active = selected ? DungeonLength[key as keyof typeof DungeonLength] === selected : false;
    
            return <Grid item xs={2} key={key} onClick={handleClick.bind(null, DungeonLength[key as keyof typeof DungeonLength])} sx={{cursor: 'pointer'}}>
                <Grid sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={active ? '/darkest/torch_100.png' : '/darkest/torch_0.png'} alt={active ? 'Active' : 'Inactive'} width={40} height={55} />
                    <span style={{color: `${active ? COLORS.ORANGE_30 : 'white'}`, fontSize: '20px', lineHeight: '14px', fontWeight: '600', textTransform: 'capitalize'}}>{DungeonLength[key as keyof typeof DungeonLength]}</span>
                </Grid>
            </Grid>
        })
    }


    return <Grid container columns={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '8px'}}>
        {renderButtons()}
    </Grid>

}

export default DurationSelector;