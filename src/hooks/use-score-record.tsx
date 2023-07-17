"use client"

import { useState } from 'react';

interface PlayerRecord {
	score: number;
	attempts: number;
}

const initialPlayerRecord = { score: 0, attempts: 0 };

const useScoreRecord = () => {
    const [playerRecord, setPlayerRecord] = useState<PlayerRecord>(initialPlayerRecord);

	// NOTE: algo here is for SOLO play
	const updatePlayerRecord = (matchedCards: boolean, resetScore: boolean = false) => {
		if(resetScore) {
			setPlayerRecord(initialPlayerRecord);
			return;
		}

		if(matchedCards) {
			setPlayerRecord(prevState => {
				// matched the 9th pair - 10th pair is a freebie
				if(prevState.score === 9) {
					console.log("Game ended!");
					return {score: prevState.score + 1, attempts: prevState.attempts + 1};
				}
				return {score: prevState.score + 1, attempts: prevState.attempts + 1};
			})
		} else {
			setPlayerRecord(prevState => {
				return {score: prevState.score, attempts: prevState.attempts + 1};
			})
		}
	}

    return {
        playerRecord,
        updatePlayerRecord
    }
}

export default useScoreRecord;