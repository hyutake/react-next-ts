"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

// images
import attunedBadge from "../../../public/attuned.png";
import ascendedBadge from "../../../public/ascended.png";
import radiantBadge from "../../../public/radiant.png";

type DifficultyProps = {
	difficulty: string;
    updateDifficulty: (newDifficulty: string) => void;
};

const AIDifficultyToggle: React.FC<DifficultyProps> = ({ difficulty, updateDifficulty }) => {
	const toggleDifficultyHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const newDifficulty = event.currentTarget.id
		if(difficulty === newDifficulty) return;
        updateDifficulty(newDifficulty);
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
				<Image src={attunedBadge} alt="easy" />
			</div>
			<div
				className={`cursor-pointer ${
					difficulty === "medium" ? "" : "brightness-50"
				}`}
				onClick={toggleDifficultyHandler}
                id="medium"
			>
				<Image src={ascendedBadge} alt="medium" />
			</div>
			<div
				className={`cursor-pointer ${
					difficulty === "hard" ? "" : "brightness-50"
				}`}
				onClick={toggleDifficultyHandler}
                id="hard"
			>
				<Image src={radiantBadge} alt="hard" />
			</div>
		</div>
	);
};

export default AIDifficultyToggle;
