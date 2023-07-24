import { CardStyles } from "./CardWindow";

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

    // find images to represent 'badges' for each style

    return (
        <div className="flex flex-row justify-center items-center gap-3">
			<div
				className={`cursor-pointer ${
					cardStyle === "default" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="default"
			>
				{/* <Image src={attunedBadge} alt="default" /> */}
                <p>-- insert img here --</p>
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "main-menu" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="main-menu"
			>
				{/* <Image src={ascendedBadge} alt="main-menu" /> */}
                <p>-- insert img here --</p>
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "grimm" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="grimm"
			>
				{/* <Image src={radiantBadge} alt="grimm" /> */}
                <p>-- insert img here --</p>
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "lifeblood" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="lifeblood"
			>
				{/* <Image src={radiantBadge} alt="lifeblood" /> */}
                <p>-- insert img here --</p>
			</div>
			<div
				className={`cursor-pointer ${
					cardStyle === "godhome" ? "" : "brightness-50"
				}`}
				onClick={toggleCardStyleHandler}
                id="godhome"
			>
				{/* <Image src={radiantBadge} alt="godhome" /> */}
                <p>-- insert img here --</p>
			</div>
		</div>
    )
}

export default CardStyleToggle;