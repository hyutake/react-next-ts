"use client"

import { useState, useEffect } from "react";
import CardGrid from "@/components/Card/CardGrid";
import RefreshButton from "@/components/Card/RefreshButton";

interface CardData {
    cardId: string;
    uuid: string;
}

interface CardTrackingData extends CardData {
	hideCard: () => void;
};

/* Deck management */
const UNIQUE_CARD_ID = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const initializeDeck = (cards: string[] = [...UNIQUE_CARD_ID, ...UNIQUE_CARD_ID]): CardData[] => {
    // shuffle the string[] array to "jumble" up the ids
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // j will always be a random integer that is a valid array index
		[cards[i], cards[j]] = [cards[j], cards[i]]; // swap positions
	}

    // create a CardData[] and start assigning a unique id to each 'card' (i.e. CardData element)
	const deck: CardData[] = [];
    for(let i = 0; i < cards.length; i++) {
        deck.push({
            cardId: cards[i],
            uuid: `c_${i}`,
        })
    }

	return deck;
};
/* END Deck management */

const CardWindow: React.FC = () => {
    // single state var to store the 1st card's data
	const [first, setFirst] = useState<CardTrackingData>();
    // to store the deck
    const [deck, setDeck] = useState<CardData[]>([]);
    // to hide all cards
    const [forceHide, setForceHide] = useState<boolean>(false);

    // only initialize the deck on client-side
    useEffect(() => {
        setDeck(initializeDeck());
    },[]);

	// cardId: To denote whether 2 cards match or not
	// uuid: Unique card id regardless of actual cardId -> to check for repeated clicks on the same card
	const clickCard = (cardId: string, uuid: string, hideCard: () => void) => {
		// need to pick and choose which state var to assign id to
		if (first !== undefined) {
			// second card clicked
			console.log("Second card: " + cardId);
            // check for double clicking
            if (uuid === first.uuid) {
                console.log("Same card clicked!");
                return;
            }
            // delay the evaluation so that animation plays
			setTimeout(() => {
				// check if matching
				if (first.cardId === cardId) {
					console.log("Matching cards!");
				} else {
					console.log("Not matching!");
					// need to trigger a rotate back of the cards somehow
					first.hideCard();
					hideCard(); // second cards' hideCard()
				}
				setFirst(undefined); // reset state var
			}, 1000);
		} else {
			// first card clicked
			setFirst({ cardId, uuid, hideCard });
			console.log("First card: " + cardId);
		}
	};

    const resetHandler = () => {
        // need some way to force-hide all the cards
        // current impl: forceHide: boolean -> everytime this changes between true and false, trigger a hideCard for all cards
        setForceHide((prevState) => !prevState); // trying this out
        setTimeout(() => {
            setDeck(initializeDeck());  // reshuffle cards -> change postions of cards
        }, 500);
    }

	return (
		<div className="flex flex-col items-center justify-center bg-cool-gray-100 py-2">
			<CardGrid deck={deck} onClickCard={clickCard} forceHide={forceHide} />
			<RefreshButton onClick={resetHandler} />
		</div>
	);
}

export default CardWindow;