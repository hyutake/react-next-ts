"use client"

import { useState, useEffect, useCallback } from "react";
import CardGrid from "@/components/Card/CardGrid";
import RefreshButton from "@/components/Card/RefreshButton";
import DebugKB from "./DebugKB";
import AIDifficultyToggle from "./AIDifficultyToggle";

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
	// knowledge base
	const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeUnit[]>([]);
	// AI difficulty level
	const [difficulty, setDifficulty] = useState<string>('easy');

    // only initialize the deck & KB on client-side
    useEffect(() => {
        setDeck(initializeDeck());
		setKnowledgeBase(initializeKB());
    },[]);

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

	/* KB helper functions */
	const updateKB = (cardId: string, uid: string, matched: boolean = false) => {
		if(matched) {	// match found -> pseudo-removed from KB by setting isMatched to true
			// console.log('Updating KB for new match found!');
			setKnowledgeBase((prevState) => {
				return prevState.filter(data => data.cardId !== cardId);
			})
		} else {	// revealed card -> update KB with the cardId for that corresponding position
			// console.log('Updating KB for revealed card!')
			setKnowledgeBase((prevState) => {
				return prevState.map(data => {
					if(data.uid === uid) {
						return { ...data, cardId: cardId };
					}
					return data; 
				})
			})
		}
	}

	// picks a SINGLE random element in the KB (so that this can be used for both 1. and 2.)
	// optional dataToAvoid to avoid selecting the same uid
	const pickByRandom = useCallback((dataToAvoid: KnowledgeUnit | null = null) : KnowledgeUnit => {
		let choice = knowledgeBase[Math.floor(Math.random() * knowledgeBase.length)];
		if(dataToAvoid) {
			while (choice === dataToAvoid) {
				choice = knowledgeBase[Math.floor(Math.random() * knowledgeBase.length)];
			}
		}
		return choice;
	}, [knowledgeBase])

	// finds a matching KnowledgeUnit in the KB if it exists, else returns a random one
	const findMatch = useCallback(({cardId, uid}: KnowledgeUnit): KnowledgeUnit => {
		const match = knowledgeBase.find(data => {
			// find matching cardId but NOT matching uid in KB
			return data.cardId === cardId && data.uid !== uid;
		});

		if(match) {
			console.log("Match found in findMatch()!");
			return match;
		} else {
			console.log("No matches found, giving random choice!");
			return pickByRandom({cardId, uid});
		}
	}, [knowledgeBase, pickByRandom])

	// for 3. -> to find any existing pairs that have yet to be matched
	// returns either a null or a string array of the 2 uids
	const checkForHiddenMatches = useCallback((): string[] | undefined => {
		const knownCardIds: string[] = [];	// only tracks cardIds
		// for each KnowledgeUnit, add the cardId to the local array if not already existing
		// if it already exists in the local array, there IS a hidden pair -> return that hidden pair
		for(const data of knowledgeBase) {
			if(data.cardId === 'UNKNOWN') continue;	// ignore UNKNOWNs
			if(knownCardIds.includes(data.cardId)) {
				const existingPair: KnowledgeUnit[] = knowledgeBase.filter(item => item.cardId === data.cardId);
				return [existingPair[0].uid, existingPair[1].uid];
			} else {
				knownCardIds.push(data.cardId);
			}
		}
		return;
	}, [knowledgeBase])

	// cardId: To denote whether 2 cards match or not
	// uid: Unique card id regardless of actual id -> to check for repeated clicks on the same card
	const clickCard = (cardId: string, uid: string) => {
		if(isEvaluating) {
			console.log('Currently evaluating...');
			return;
		}
		if (first) {	// second card clicked
			updateDeck({ cardId, uid, isRevealed: true, matchedBy: ''});
			updateKB(cardId, uid);
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
					updateKB(cardId, uid, true);
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
			updateKB(cardId, uid);
			setFirst({cardId, uid});
		}
	};

    const resetHandler = () => {
		resetScores();
		setFirst(undefined);	// "clear" state var (otherwise it might check for a match on the first reveal)
		setKnowledgeBase(initializeKB());	// reset knowledge base
		hideDeck();
		// reshuffle cards -> change postions of cards (timeout used so that forceHide triggers and flips all the revealed cards over first)
        setTimeout(() => {
            setDeck(initializeDeck()); 
        }, 500);
    }

	/*
		Potential improvement: convert all the AI logic into a custom hook useAI() somehow to reduce the amount of code here
	 */
	
	// completely random choices - returns an array of 2 [uid: string]s
	const easyAI = useCallback((): string[] => {
		const first = pickByRandom();
		const second = pickByRandom(first);
		return [first.uid, second.uid]
	}, [pickByRandom])

	const mediumAI = useCallback((): string[] => {
		const first = pickByRandom();
		const second = findMatch(first);

		return [first.uid, second.uid];
	}, [findMatch, pickByRandom])

	const hardAI = useCallback((): string[] => {
		const matches = checkForHiddenMatches();
		if(matches) {
			console.log("Existing KB match found!");
			console.log(matches);
			return matches;
		} else {
			console.log("Falling back to mediumAI()!");
			return mediumAI();
		}
	}, [checkForHiddenMatches, mediumAI])

	// pseudo AI "decision maker"
	const AiTurnManager = useCallback((mode: string) => {
		if(knowledgeBase.length === 0) {	// game ended
			console.log("No more available options!");
			return;
		}

		let choices : string[];
		switch(mode) {
			case 'medium':
				choices = mediumAI();
				break;
			case 'hard':
				choices = hardAI();
				break;
			default:
				choices = easyAI();
		}
		triggerAiClick(choices[0], 500);
		triggerAiClick(choices[1], 1000);
	}, [knowledgeBase.length, mediumAI, hardAI, easyAI])

	const triggerAiClick = (uid: string, delay: number) => {
		const choice = document.getElementById(uid);
		if(choice) {
			setTimeout(() => {
				choice.click();
			}, delay);
		} else {
			console.log("Invalid uid of " + uid + "!");
		}
	}

	useEffect(() => {
		if(!isPlayerTurn && !isEvaluating) {
			AiTurnManager(difficulty);
		}
	}, [AiTurnManager, difficulty, isEvaluating, isPlayerTurn])

	return (
		<div className="flex flex-col items-center justify-center bg-cool-gray-100 py-2">
			<RefreshButton onClick={resetHandler} />
			<CardGrid deck={deck} onClickCard={clickCard} />
			<AIDifficultyToggle difficulty={difficulty} setDifficulty={setDifficulty} />
			{/* <DebugKB knowledgeBase={knowledgeBase} /> */}
		</div>
	);
}

export default CardWindow;