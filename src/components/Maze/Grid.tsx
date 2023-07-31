"use client";

import { Position } from "./MazeWindow";
import Image from "next/image";

interface GridProps {
	imgSrc: string;
	curPosition: Position;
	grid: number[][];
	gridSize: number;
}

const mapGridIdToBg = (gridId: number): string => {
	switch(gridId) {
		case 1:		// impassible area
			return 'bg-gray-300';
		case 2:		// death area? TBD
			return 'bg-red-300';
		default:
			return 'bg-white';
	}
}

/*
    Idea: Grid will purely be used to render a grid of Y x Y squares
        - It will receive curPosition so that the current position can be "marked" (i.e. rendered differently)
			- It will also receive imgSrc: string, for the same reason
        - The idea is to have several different 10 x 10 grids to represent different maps
			- So, the player can switch between maps while still preserving their position
				- To make this game challenging the grids will probably have to be hard-coded
        	- Full grid config (number[][]) will be passed here as well
				- mapGridIdToBg() will help render the grid differently (bg colors for now) based on grid values
*/
const Grid: React.FC<GridProps> = ({ curPosition, imgSrc, grid, gridSize }) => {
	const renderGrid = () => {
		const gridItems = [];
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				gridItems.push(
					<div
						key={`${x}-${y}`}
						className={`h-10 w-10 text-cool-gray-90 ${
							curPosition.x === x && curPosition.y === y
								? "bg-amber-300"
								: mapGridIdToBg(grid[y][x])}`}
					>
						{/* ({x},{y}) */}
						{curPosition.x === x && curPosition.y === y && <Image src={imgSrc} alt="tanjiro" width={40} height={40} />}
					</div>
				);
			}
		}
		return gridItems;
	};

	return <div className={`grid grid-cols-10 gap-1`}>{renderGrid()}</div>;
};

export default Grid;
