"use client";

import CardWindow from "@/components/Memory/CardWindow";
import Banner from "@/components/Player/Banner";
import useScoreRecord from "@/hooks/use-score-record";
import { useScoreContext } from "@/store/score-context";

const GamePage: React.FC = () => {
	// Game idea 2: maze/story game (like the henry stickmin games) --> maybe integrate chatgpt to help with this
	/*
		Idea: 
			- Similar to those "choose your adventure" books - each page presents some narrative and a few options (choices)
			- Narrative can be based on other existing stories also
			- Selecting any of the choices would just lead you down the corresponding "path" (literally the path in the url)
			- Super simple, since you only really need text and <Link> buttons, the fun comes from having a variety of scenarios
			- Can integrate multiple "mini-games" into certain paths, maybe even game 1
		Issues:
			- Will need a ton of pages (in /app)
			- Needs a decent narrative (with many branching paths) since this is gonna have to be carried by the text content (and maybe minigames)
	*/

	// Game idea 3: idk, but should make use of the keyboard
	/*
		Idea:
			- NOT a typing game, should be more of a 'keybind' kinda game idk the actual term (like maplestory)
	*/

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
