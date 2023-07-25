"use client";

import Image from "next/image";
import { difficulty } from "./CardWindow";
 
type DifficultyProps = {
	difficulty: string;
    updateDifficulty: (newDifficulty: difficulty) => void;
};

const AIDifficultyToggle: React.FC<DifficultyProps> = ({ difficulty, updateDifficulty }) => {
	const toggleDifficultyHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const newDifficulty = event.currentTarget.id
		if(difficulty === newDifficulty) return;
        updateDifficulty(newDifficulty as difficulty);
        console.log('Difficulty set to ' + newDifficulty + '!');
	};

	return (
		<div className="flex flex-row justify-center items-center gap-3">
			<div
				className={`cursor-pointer ${
					difficulty === "easy" ? "" : "brightness-50"
				}`}
				onClick={toggleDifficultyHandler}
                id="easy"
			>
				<Image src='/memory-game/badges/difficulty/attuned.png' alt="easy" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					difficulty === "medium" ? "" : "brightness-50"
				}`}
				onClick={toggleDifficultyHandler}
                id="medium"
			>
				<Image src='/memory-game/badges/difficulty/ascended.png' alt="medium" width={50} height={50} />
			</div>
			<div
				className={`cursor-pointer ${
					difficulty === "hard" ? "" : "brightness-50"
				}`}
				onClick={toggleDifficultyHandler}
                id="hard"
			>
				<Image src='/memory-game/badges/difficulty/radiant.png' alt="hard" width={50} height={50} />
			</div>
		</div>
	);
};

export default AIDifficultyToggle;
