import { Provisions } from "@/models/expedition";
import { Grid } from "@mui/material";
import Image from "next/image";

type ProvisionStrings = Record<keyof Provisions, string>;

const PROVISIONS: ProvisionStrings = {
    aegisScale: "/darkest/provisions/Snake_scale.webp",
    antivenom: "/darkest/provisions/Antivenom.webp",
    bandage: "/darkest/provisions/Bandage.webp",
    curseCure: "/darkest/provisions/Curse_Cure.webp",
    dogTreats: "/darkest/provisions/Dog_Treats.webp",
    food: "/darkest/provisions/Food_high.webp",
    fireWood: "/darkest/provisions/Firewood.webp",
    holyWater: "/darkest/provisions/Holy_Water.webp",
    laudanum: "/darkest/provisions/Laudanum.webp",
    medicinalHerb: "/darkest/provisions/Medicinal_Herbs.webp",
    shovel: "/darkest/provisions/Shovel.webp",
    skeletonKey: "/darkest/provisions/Skeleton_Key.webp",
    theBlood: "/darkest/provisions/The_Blood.webp",
    torch: "/darkest/provisions/Torch.webp",
}

const FOOD_PROVISIONS = {
    foodLow: "/darkest/provisions/Food_low.webp",
    foodMed: "/darkest/provisions/Food_med.webp",
    foodHigh: "/darkest/provisions/Food_high.webp",
}

interface ItemDisplayProps {
    item: keyof Provisions;
    value: number;
    onClick: () => void;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({
    item,
    value,
    onClick,
}) => {
    const provision = item == "food" ? checkFood(value) : checkItem(item);

    return <Grid item xs={2} onClick={onClick} sx={{cursor: 'pointer', position: 'relative'}}>
        <Image src={provision} alt={item} width={64} height={128} />
        <p style={{position: 'absolute', left: '12px', top: '8px', color: 'yellow', fontSize: '18px', zIndex: 1}}>{value > 1 ? value : ""}</p>
    </Grid>
}

const checkItem = (item: keyof Provisions) => {
    return PROVISIONS[item];
}

const checkFood = (value: number) => {
    if(value > 8) return FOOD_PROVISIONS.foodHigh;
    else if(value > 4) return FOOD_PROVISIONS.foodMed;
    else return FOOD_PROVISIONS.foodLow;
}

export default ItemDisplay;