"use client"

import { useScoreContext } from "../../store/score-context";

interface ScoreItemProps {
    score: number;
    alias: string;
    isSelf: boolean;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ score, alias, isSelf }) => {
	const itemClass = `rounded border-4 border-white text-black italic w-3/4 px-10 py-2 mb-2 text-center ${
		isSelf ? "bg-amber-200" : "bg-white/80"
	}`;
	return (
		<div className={itemClass}>
			<p className="text-gray-800/70">{alias} {isSelf ? '(You)' : ''}</p>
			<h1 className="text-2xl font-bold">{score}</h1>
		</div>
	);
};

const ScoreList = ({state}: {state: string}) => {
	const {scoreRecords, playerScore} = useScoreContext();
	
	const isLoggedIn = playerScore.id !== '-1';

	// filter only the scores for the current game mode + replace 'old' player record with current player record
	const mappedRecordsByState = scoreRecords.map((record) => {
		let score = record.scores[state as keyof Scores] as number;
		if(record.id === playerScore.id) {
			score = playerScore.scores[state as keyof Scores] as number;
		}
		return {
			alias: record.alias,
			id: record.id,
			score: score
		};
	});

	if(!isLoggedIn) {   // if not logged in, just add the anonymous player's score to the list
		mappedRecordsByState.push({
			alias: playerScore.alias,
			id: playerScore.id,
			score: playerScore.scores[state as keyof Scores] as number,
		})
	}

    // filter out all those with '0' for score (never attempted) EXCEPT user's score
    const filteredRecords = mappedRecordsByState.filter((record) => {
		return record.score !== 0 || record.id === playerScore.id;
	});

	// sort by score
	filteredRecords.sort((a, b) => b.score - a.score);

	return (
		<div className="flex flex-col justify-center items-center w-3/4">
			{filteredRecords.length > 0 &&  filteredRecords.map((record) => {
				return (
					<ScoreItem
						key={record.id}
						score={record.score}
						alias={record.alias}
						isSelf={record.id === playerScore.id}
					/>
				);
			})}
		</div>
	);
};

export default ScoreList;
