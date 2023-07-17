"use client"

import { useState, useEffect, useCallback } from "react";
import CardGrid from "@/components/Card/CardGrid";
import RefreshButton from "@/components/Card/RefreshButton";

interface CardData {
    cardId: string;
    uid: string;
	isRevealed: boolean;
	matchedBy: string;
}

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
            uid: `c_${i}`,
			isRevealed: false,
			matchedBy: ''
        })
    }
	return deck;
};

interface CardWindowProps {
	updateUserRecord: (matchedCards: boolean, resetScore?: boolean) => void;
	updateAIRecord: (matchedCards: boolean, resetScore?: boolean) => void;
}

const CardWindow: React.FC<CardWindowProps> = ({ updateUserRecord, updateAIRecord }) => {
    // to store the deck
    const [deck, setDeck] = useState<CardData[]>([]);
	// to record the first card data
	const [first, setFirst] = useState<{ cardId: string, uid: string }>();
	// to prevent additional cards being revealed and evaluated (otherwise the game logic gets messed up)
	const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
	// to track whose turn is it
	const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

    // only initialize the deck on client-side
    useEffect(() => {
        setDeck(initializeDeck());
    },[]);

	// updates a single CardData element in deck
	const updateDeck = (newCard: CardData) => {
		setDeck((prevDeck) => {
			const newDeck = prevDeck.map(card => {
				if(card.uid === newCard.uid) {
					return newCard;
				}
				return card;
			});
			return newDeck;
		})
	}

	// sets all the
	const hideDeck = () => {
		setDeck((prevDeck) => {
			return prevDeck.map(card => {
				return {cardId: card.cardId, uid: card.uid, isRevealed: false, matchedBy: ''};
			})
		})
	}

	const endCurrentTurn = () => {
		setIsPlayerTurn((prevState) => !prevState);
		console.log("Jobs done!");
	}

	const updateScore = (matched: boolean) => {
		isPlayerTurn ? updateUserRecord(matched) : updateAIRecord(matched);
	}

	const resetScores = () => {
		updateUserRecord(false, true);
		updateAIRecord(false, true);
	}

	// id: To denote whether 2 cards match or not
	// uid: Unique card id regardless of actual id -> to check for repeated clicks on the same card
	const clickCard = (cardId: string, uid: string) => {
		if(isEvaluating) {
			console.log('Currently evaluating...');
			return;
		}
		console.log(`cardId: ${cardId}, uid: ${uid}`);
		if (first) {	// second card clicked
			updateDeck({ cardId, uid, isRevealed: true, matchedBy: ''});
			setIsEvaluating(true);
			setTimeout(() => {
				// check if matching
				if (first.cardId === cardId) {
					console.log("Matching!");
					setDeck(prevDeck => {
						return prevDeck.map(card => {
							if(card.cardId === cardId) {
								return { 
									cardId: card.cardId, 
									uid: card.uid,
									isRevealed: false,
									matchedBy: `${isPlayerTurn ? 'player' : 'ai'}`,
								}
							};
							return card;
						})
					});
					updateScore(true);
				} else {
					console.log("Not matching!");
					setDeck(prevDeck => {
						return prevDeck.map(card => {
							if(card.isRevealed) {
								return { ...card, isRevealed: false };
							}
							return card;
						})
					});
					updateScore(false);
				}
				setFirst(undefined);
				setIsEvaluating(false);
				endCurrentTurn();
			}, 1000);
		} else {	// first card clicked
			updateDeck({ cardId, uid, isRevealed: true, matchedBy: ''});
			setFirst({cardId, uid});
		}
	};

	

    const resetHandler = () => {
		resetScores();
		setFirst(undefined);	// "clear" state var (otherwise it might check for a match on the first reveal)
		hideDeck();
		// reshuffle cards -> change postions of cards (timeout used so that forceHide triggers and flips all the revealed cards over first)
        setTimeout(() => {
            setDeck(initializeDeck()); 
        }, 500);
    }

	// pseudo AI "decision maker"
	const AiTurnManager = useCallback(() => {
		const availableOptions: CardData[] = deck.filter(card => {
			return card.matchedBy === '';
		});

		if(availableOptions.length === 0) {	// game ended
			console.log("No more available options!");
			return;
		}

		// Completely random
		const firstChoice = Math.floor(Math.random() * availableOptions.length);
		let secondChoice = Math.floor(Math.random() * availableOptions.length);
		while(secondChoice === firstChoice) {
			secondChoice = Math.floor(Math.random() * availableOptions.length);
		}

		triggerAiClick(availableOptions[firstChoice].uid, 500);
		triggerAiClick(availableOptions[secondChoice].uid, 1000);
	}, [deck])

	const triggerAiClick = (cardId: string, delay: number) => {
		// console.log('Choice: ' + cardId);
		const choice = document.getElementById(cardId);
		if(choice) {
			setTimeout(() => {
				choice.click();
			}, delay);
		} else {
			console.log("Invalid cardId of " + cardId + "!");
		}
	}

	useEffect(() => {
		if(!isPlayerTurn && !isEvaluating) {
			AiTurnManager();
		}
	}, [AiTurnManager, isEvaluating, isPlayerTurn])

	return (
		<div className="flex flex-col items-center justify-center bg-cool-gray-100 py-2">
			<CardGrid deck={deck} onClickCard={clickCard} />
			<RefreshButton onClick={resetHandler} />
			<button onClick={AiTurnManager}>TEST AI CLICK</button>
		</div>
	);
}

export default CardWindow;