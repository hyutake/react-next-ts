"use client"

import { useState, useCallback } from 'react';

interface KnowledgeUnit {
	cardId: string;
    uid: string;
}

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

const useMemoryAI = () => {
	const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeUnit[]>([]);

    /* KB helper functions */
	const updateKnowledgeBase = (cardId: string, uid: string, matched: boolean = false) => {
		if(matched) {	// match found -> remove from KB (no longer a viable options)
			setKnowledgeBase((prevState) => {
				return prevState.filter(data => data.cardId !== cardId);
			})
		} else {	// revealed card -> update KB with the cardId for that corresponding position
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

    const resetKnowledgeBase = useCallback(() => {
        console.log("Resetting KB!");
        setKnowledgeBase(initializeKB());
    }, [])

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
	const findMatch = useCallback((firstChoice: KnowledgeUnit): KnowledgeUnit => {
		const match = knowledgeBase.find(data => {
			// find matching cardId but NOT matching uid in KB
			return data.cardId === firstChoice.cardId && data.uid !== firstChoice.uid;
		});

		if(match) {
			console.log("Match found in findMatch()!");
			return match;
		} else {
			console.log("No matches found, giving random choice!");
			return pickByRandom(firstChoice);
		}
	}, [knowledgeBase, pickByRandom])

	// for 3. -> to find any KNOWN existing pairs in the KB that have yet to be matched
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

    // completely random choices - returns an array of 2 [uid: string]s
	const easyAI = useCallback((): string[] => {
		const first = pickByRandom();
		const second = pickByRandom(first);
		return [first.uid, second.uid]
	}, [pickByRandom])

    // first is random, second references the KB but can be random
	const mediumAI = useCallback((): string[] => {
		const first = pickByRandom();
		const second = findMatch(first);
		return [first.uid, second.uid];
	}, [findMatch, pickByRandom])

    // checks for known matches first, fallback to mediumAI() if none found
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

	// pseudo AI "brain"
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

    // programmatic click
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

    return {
        knowledgeBase,
        resetKnowledgeBase,
        updateKnowledgeBase,
        AiTurnManager,
    }
}

export default useMemoryAI;