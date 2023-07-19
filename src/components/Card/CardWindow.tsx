"use client"

import { useState, useEffect, useCallback } from "react";
import CardGrid from "@/components/Card/CardGrid";
import RefreshButton from "@/components/Card/RefreshButton";
import DebugKB from "./DebugKB";
import AIDifficultyToggle from "./AIDifficultyToggle";
import useMemoryAI from "@/hooks/use-memory-ai";

interface CardData {
    cardId: string;
    uid: string;
	isRevealed: boolean;
	matchedBy: string;
}

interface KnowledgeUnit {
	cardId: string;
    uid: string;
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

const initializeKB = (): KnowledgeUnit[] => {
	const KB: KnowledgeUnit[] = [];
    for(let i = 0; i < 20; i++) {
        KB.push({
            cardId: 'UNKNOWN',
            uid: `c_${i}`,
        })
    }
	return KB;
}

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
	// AI difficulty level
	const [difficulty, setDifficulty] = useState<string>('easy');

	const {knowledgeBase, resetKnowledgeBase, updateKnowledgeBase, AiTurnManager} = useMemoryAI();

    // only initialize the deck & KB on client-side
    useEffect(() => {
        setDeck(initializeDeck());
		resetKnowledgeBase();
    },[resetKnowledgeBase]);

	/* Deck helper functions */
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

	// sets all the cards to be 'face-down' again
	const hideDeck = () => {
		setDeck((prevDeck) => {
			return prevDeck.map(card => {
				return {cardId: card.cardId, uid: card.uid, isRevealed: false, matchedBy: ''};
			})
		})
	}

	/* Turn management helper function */
	const endCurrentTurn = () => {
		setIsPlayerTurn((prevState) => {
			console.log(`${prevState ? 'AI\'s turn!' : 'Player\'s turn!'}`);
			return !prevState;
		});
		console.log("Jobs done!");
	}

	/* Score helper functions */
	const updateScore = (matched: boolean) => {
		isPlayerTurn ? updateUserRecord(matched) : updateAIRecord(matched);
	}

	const resetScores = () => {
		updateUserRecord(false, true);
		updateAIRecord(false, true);
	}

	/* Difficulty setter */
	const updateDifficulty = (newDifficulty: string) => {
		setDifficulty(newDifficulty);
		resetHandler();
	}

	// cardId: To denote whether 2 cards match or not
	// uid: Unique card id regardless of actual id -> to check for repeated clicks on the same card
	const clickCard = (cardId: string, uid: string) => {
		if(isEvaluating) {
			console.log('Currently evaluating...');
			return;
		}
		if (first) {	// second card clicked
			updateDeck({ cardId, uid, isRevealed: true, matchedBy: ''});
			updateKnowledgeBase(cardId, uid);
			setIsEvaluating(true);
			setTimeout(() => {
				if (first.cardId === cardId) {	// matching
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
					updateKnowledgeBase(cardId, uid, true);
					updateScore(true);
				} else {	// not matching
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
			updateKnowledgeBase(cardId, uid);
			setFirst({cardId, uid});
		}
	};

    const resetHandler = () => {
		resetScores();
		setFirst(undefined);	// "clear" state var (otherwise it might check for a match on the first reveal)
		resetKnowledgeBase();	// reset knowledge base
		hideDeck();
		// reshuffle cards -> change postions of cards (timeout used so that forceHide triggers and flips all the revealed cards over first)
        setTimeout(() => {
            setDeck(initializeDeck()); 
        }, 500);
    }

	useEffect(() => {
		if(!isPlayerTurn && !isEvaluating) {
			AiTurnManager(difficulty);
		}
	}, [AiTurnManager, difficulty, isEvaluating, isPlayerTurn])

	return (
		<div className="flex flex-col items-center justify-center py-2">
			<RefreshButton onClick={resetHandler} />
			<CardGrid deck={deck} onClickCard={clickCard} />
			<AIDifficultyToggle difficulty={difficulty} updateDifficulty={updateDifficulty} />
			{/* <DebugKB knowledgeBase={knowledgeBase} /> */}
		</div>
	);
}

export default CardWindow;