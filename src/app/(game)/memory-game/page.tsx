"use client";

import CardWindow from "@/components/Memory/CardWindow";
import Banner from "@/components/Player/Banner";
import useScoreRecord from "@/hooks/use-score-record";
import { useScoreContext } from "@/store/score-context";

const GamePage: React.FC = () => {
	// get session info here -> if access token has expired (isExpired = true), then show a modal with some explanation text and the option to logout

	// Game idea 1: memory card game (matching pairs of cards that are flipped over)
	/* Issues: 
		- Need animations for cards (flipping over, fanning out on the screen)
		- Need pairs of cards (w/ art), can just use numbers or random jpgs
		- Need AI opponent (apparently doable w/ typescript O.o)
			- Could also just use a random % of choosing completely random options vs choosing correct options
				- This would req. some way to track what pairs are matching even when faced down
			- Ideally the AI opponent should only "make decisions" based on KNOWN information (i.e. revealed cards thus far)
		- Score tracking (no. of matches made thus far)
		- Timer probably not neeeded :/ Complexity should increase by LIMITING number of given moves OR improving AI opponent
	*/

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

	const { playerRecord: userRecord, updatePlayerRecord: updateUserRecord } = useScoreRecord();
	const { playerRecord: aiRecord, updatePlayerRecord: updateAIRecord } = useScoreRecord();

	// only works for when running in local env. (nextauth login/logout doesn't really work on docker containers :/)
	// probably smth to do with the ports..?
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
