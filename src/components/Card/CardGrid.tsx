"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

type CardData = {
    id: string;
    uuid: string;
}

const UNIQUE_CARD_ID = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const shuffleDeck = (cards: string[]): CardData[] => {
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // j will always be a random integer that is a valid array index
		[cards[i], cards[j]] = [cards[j], cards[i]]; // swap positions
	}

	const deck: CardData[] = [];
    
    for(let i = 0; i < cards.length; i++) {
        deck.push({
            id: cards[i],
            uuid: `c_${i}`,
        })
    }

	return deck;
};

const initializeDeck = () => {
    const duplicatedCards = [...UNIQUE_CARD_ID, ...UNIQUE_CARD_ID]; // 2 of each
    return shuffleDeck(duplicatedCards);
};



const CardGrid: React.FC = () => {
    const [deck, setDeck] = useState<CardData[]>([]);

    // only initialize the deck on client-side
    useEffect(() => {
        setDeck(initializeDeck());
    },[]);

	return (
		<div className="grid grid-cols-5 gap-3">
			{deck.map((card) => {
				return <Card key={card.uuid} id={card.id} />;
			})}
		</div>
	);
};

export default CardGrid;
