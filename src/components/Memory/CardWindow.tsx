"use client"

import { useState, useEffect } from "react";
import CardGrid from "@/components/Memory/CardGrid";
import RefreshButton from "@/components/Memory/RefreshButton";
import AIDifficultyToggle from "./AIDifficultyToggle";
import useMemoryAI from "@/hooks/use-memory-ai";
import DebugKB from "./DebugKB";
import Button from "../UI/Button";
import CardStyleToggle from "./CardStyleToggle";

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

type difficulty = "easy" | "medium" | "hard";

export type CardStyles = "default" | "main-menu" | "grimm" | "lifeblood" | "godhome";

interface CardWindowProps {
	updateUserRecord: (matchedCards: boolean, resetScore?: boolean) => void;
	updateAIRecord: (matchedCards: boolean, resetScore?: boolean) => void;
}

const CardWindow: React.FC<CardWindowProps> = ({ updateUserRecord, updateAIRecord }) => {
    // to store the deck (used to render the cards displayed)
    const [deck, setDeck] = useState<CardData[]>([]);
	// to record the first card data
	const [first, setFirst] = useState<{ cardId: string, uid: string }>();
	// to prevent additional cards being revealed and evaluated (otherwise the game logic gets messed up)
	const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
	// to track whose turn is it
	const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
	// AI difficulty level
	const [difficulty, setDifficulty] = useState<difficulty>('easy');
	// toggle to view knowledgeBase
	const [showKB, setShowKB] = useState<boolean>(false);
	// AI
	const {knowledgeBase, resetKnowledgeBase, updateKnowledgeBase, AiTurnManager} = useMemoryAI();
	// to set various art styles for cards
	const [cardStyle, setCardStyle] = useState<CardStyles>("default");

	const updateCardStyle = (cardStyle: CardStyles) => {
		setCardStyle(cardStyle);
	}

    // only initialize the deck & KB on client-side
    useEffect(() => {
        setDeck(initializeDeck());
		resetKnowledgeBase();
    },[resetKnowledgeBase]);

	/* KB display toggle */
	const toggleKBDisplay = () => {
		setShowKB((prevState) => !prevState);
	}

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
		console.log("Jobs done!");
		setIsPlayerTurn((prevState) => {
			console.log(`${prevState ? 'AI\'s turn!' : 'Player\'s turn!'}`);
			return !prevState;
		});
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
	const updateDifficulty = (newDifficulty: difficulty) => {
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
									...card,
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
		resetScores();			// reset both the player's and the AI's score
		setFirst(undefined);	// "clear" state var (otherwise it might check for a match on the first reveal)
		resetKnowledgeBase();	// reset knowledge base (for AI)
		hideDeck();				// hide all the cards
		// reshuffle cards -> timeout set so that hideDeck() triggers first
        setTimeout(() => {
            setDeck(initializeDeck()); 
        }, 500);
    }

	// to play the AI's turn
	useEffect(() => {
		if(!isPlayerTurn && !isEvaluating) {
			AiTurnManager(difficulty);
		}
	}, [AiTurnManager, difficulty, isEvaluating, isPlayerTurn])

	return (
		<div className="flex flex-col items-center justify-center py-2 gap-2">
			<RefreshButton onClick={resetHandler} />
			<CardStyleToggle cardStyle={cardStyle} updateCardStyle={updateCardStyle} />
			<CardGrid cardStyle={cardStyle} deck={deck} onClickCard={clickCard} />
			<AIDifficultyToggle difficulty={difficulty} updateDifficulty={updateDifficulty} />
			<Button label={showKB ? 'Hide Knowledge Base' : 'Show Knowledge Base'} onClick={toggleKBDisplay} />
			{showKB	&& <DebugKB knowledgeBase={knowledgeBase} />}
		</div>
	);
}

export default CardWindow;