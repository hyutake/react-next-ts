"use client";

import Card from "./Card";

import { CardStyles } from "./CardWindow";

interface CardData {
    cardId: string;
    uid: string;
	isRevealed: boolean;
	matchedBy: string;
}

const setFrontImg = (id: string, cardStyle: CardStyles) => {
	let imgSrc;
	switch (id) {
		case "1":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}hornet_front.png`;
			break;
		case "2":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}zote_front.png`;
			break;
		case "3":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}dd_front.png`;
			break;
		case "4":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}cloth_front.png`;
			break;
		case "5":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}cornifer_front.png`;
			break;
		case "6":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}knight_front.png`;
			break;
		case "7":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}sheo_front.png`;
			break;
		case "8":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}grub_father_front.png`;
			break;
		case "9":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}quirrel_front.png`;
			break;
		case "10":
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}nailsmith_front.png`;
			break;
		default: // should never happen ideally
			imgSrc = `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}hk_back_1.png`;
	}
	return imgSrc;
};

// fn to get the card back - optional id value for potential alt card back art (in the future maybe)
const setBackImg = (cardStyle: CardStyles, id: number) => {
	return `/memory-game/${cardStyle === 'default' ? '' : cardStyle + '/'}hk_back_${id}.png`;
}

type CardGridProps = {
	cardStyle: CardStyles;
	deck: CardData[];
	onClickCard: (cardId: string, uid: string) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ cardStyle, deck, onClickCard }) => {
	return (
		<div className="grid grid-cols-5 py-2 px-4 gap-5"> 
			{deck.map((card) => {
				return (
					<Card
						key={card.uid}
						id={card.uid}
						backImgSrc={setBackImg(cardStyle, 1)}
						frontImgSrc={setFrontImg(card.cardId, cardStyle)}
						registerClick={onClickCard.bind(null, card.cardId, card.uid)}
                        isRevealed={card.isRevealed}
						matchedBy={card.matchedBy}
					/>
				);
			})}
		</div>
	);
};

export default CardGrid;
