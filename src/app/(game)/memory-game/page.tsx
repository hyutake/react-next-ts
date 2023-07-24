"use client";

import CardWindow from "@/components/Memory/CardWindow";
import Banner from "@/components/Player/Banner";
import useScoreRecord from "@/hooks/use-score-record";
import { useScoreContext } from "@/store/score-context";

const GamePage: React.FC = () => {
	const { playerRecord: userRecord, updatePlayerRecord: updateUserRecord } = useScoreRecord();
	const { playerRecord: aiRecord, updatePlayerRecord: updateAIRecord } = useScoreRecord();

	const {playerScore} = useScoreContext();

	return (
		<div className="flex justify-evenly bg-cool-gray-100 w-full h-full lg:px-1">
			<Banner label={playerScore.alias} score={userRecord.score} attempts={userRecord.attempts} />
			<CardWindow updateUserRecord={updateUserRecord} updateAIRecord={updateAIRecord}/>
			<Banner label="AI" score={aiRecord.score} attempts={aiRecord.attempts}/>
		</div>
	);
};

export default GamePage;
