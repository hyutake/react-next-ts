import { CardStyles } from "./CardWindow";
import Image from "next/image";

interface CardStyleToggleProps {
    cardStyle: CardStyles;
    updateCardStyle: (cardStyle: CardStyles) => void;
}

const CardStyleToggle: React.FC<CardStyleToggleProps> = ({ cardStyle, updateCardStyle }) => {
    const toggleCardStyleHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const newCardStyle = event.currentTarget.id;
        if(cardStyle === newCardStyle) return;
        updateCardStyle(newCardStyle as CardStyles);
        console.log(`Card style set to ${newCardStyle}!`);
    }

    return (
        <div className="flex flex-row justify-center items-center gap-3">
			<div
				className={`cursor-pointer ${
					cardStyle === "default" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="default"
			>
				<Image src='/memory-game/badges/card-styles/void_badge.png' alt="default" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "kingsoul" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="kingsoul"
			>
				<Image src='/memory-game/badges/card-styles/king_badge.png' alt="kingsoul" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "grimm" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="grimm"
			>
				<Image src='/memory-game/badges/card-styles/grimm_badge.png' alt="grimm" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "lifeblood" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="lifeblood"
			>
				<Image src='/memory-game/badges/card-styles/life_badge.png' alt="lifeblood" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "godhome" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="godhome"
			>
				<Image src='/memory-game/badges/card-styles/dream_badge.png' alt="godhome" width={50} height={50} />
			</div>
		</div>
    )
}

export default CardStyleToggle;