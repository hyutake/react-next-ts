"use client";

import Card from "./Card";

import hornetImg from "../../../public/hornet_front.png";
import zoteImg from "../../../public/zote_front.png";
import defenderImg from "../../../public/dd_front.png";
import clothImg from "../../../public/cloth_front.png";
import corniferImg from "../../../public/cornifer_front.png";
import knightImg from "../../../public/knight_front.png";
import sheoImg from "../../../public/sheo_front.png";
import grubDaddyImg from "../../../public/grub_father_front.png";
import quirrelImg from "../../../public/quirrel_front.png";
import nailsmithImg from "../../../public/nailsmith_front.png";
import hkBack from "../../../public/hk_back.png";

type CardData = {
	cardId: string;
	uuid: string;
};

const setImage = (id: string) => {
	let imgSrc;
	switch (id) {
		case "1":
			imgSrc = hornetImg;
			break;
		case "2":
			imgSrc = zoteImg;
			break;
		case "3":
			imgSrc = defenderImg;
			break;
		case "4":
			imgSrc = clothImg;
			break;
		case "5":
			imgSrc = corniferImg;
			break;
		case "6":
			imgSrc = knightImg;
			break;
		case "7":
			imgSrc = sheoImg;
			break;
		case "8":
			imgSrc = grubDaddyImg;
			break;
		case "9":
			imgSrc = quirrelImg;
			break;
		case "10":
			imgSrc = nailsmithImg;
			break;
		default: // should never happen ideally
			imgSrc = hkBack;
	}
	return imgSrc;
};

type CardGridProps = {
	deck: CardData[];
	onClickCard: (cardId: string, uuid: string, hideCard: () => void) => void;
    forceHide: boolean;
};

const CardGrid: React.FC<CardGridProps> = ({ deck, onClickCard, forceHide }) => {
	return (
		<div className="grid grid-cols-5 py-2 px-4 gap-5">
			{deck.map((card) => {
				return (
					<Card
						key={card.uuid}
						imageSrc={setImage(card.cardId)}
						registerClick={onClickCard.bind(null, card.cardId, card.uuid)}
                        forceHide={forceHide}
					/>
				);
			})}
		</div>
	);
};

export default CardGrid;
