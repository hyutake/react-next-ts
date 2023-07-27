"use client";

import { Position } from "@/app/(game)/keyboard/page";

interface GridProps {
	curPosition: Position;
	grid: number[];
}

const gridSize = 10;    // only 1 - 12 allowed

/*
    Idea: Grid will purely be used to render a grid of 12 x 12 squares (best I can do :/)
        - It will receive curPosition so that the current position can be "marked" (i.e. rendered differently)
        - The idea is to have several different 12 x 12 grids to represent different maps
        - So, the player can switch between maps while still preserving their position
        - To make this game challenging the grids will probably have to be hard-coded
        - Either a full grid configuration or a special grid name will also be passed here, TBD
        - In order to correctly handle movement logic - e.g. when attempting to move to a "forbidden zone", stop
            - Movement logic should be coded in somewhere where you can infer what blocks are of what type...
*/
const Grid: React.FC<GridProps> = ({ curPosition, grid }) => {
	const renderGrid = () => {
		const gridItems = [];
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				gridItems.push(
					<div
						key={`${x}-${y}`}
						className={`h-8 w-8 text-cool-gray-90 ${
							curPosition.x === x && curPosition.y === y
								? "bg-amber-300"
								: grid[y*10+x] === 1 ? 'bg-gray-300' : 'bg-white'}`}
					>
						({x},{y})
					</div>
				);
			}
		}
		return gridItems;
	};

	return <div className={`grid grid-cols-10 gap-1`}>{renderGrid()}</div>;
};

export default Grid;
