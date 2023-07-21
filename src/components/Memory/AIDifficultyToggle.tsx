"use client";

import Image from "next/image";

// images
import attunedBadge from "../../../public/memory-game/attuned.png";
import ascendedBadge from "../../../public/memory-game/ascended.png";
import radiantBadge from "../../../public/memory-game/radiant.png";

type difficulty = "easy" | "medium" | "hard";

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
