"use client";

import MazeWindow from "@/components/Maze/MazeWindow";

const MazePage: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center bg-[url(/maze/hokusai.png)] h-full">
			<MazeWindow />
		</div>
	);
};

export default MazePage;
