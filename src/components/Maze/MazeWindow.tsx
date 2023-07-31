"use client";

import { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import GamePagination from "./Pagination";

export type Position = {
	x: number;
	y: number;
};

const gridSize = 10;

// for now, just 2 types: allowed paths and non-allowed paths
const grids = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
    [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ],
]

const MazeWindow: React.FC = () => {
	// position is 0-indexed. (0, 0) refers to top-left of grid -> (19, 19 refers to bottom-right of grid)
	const [curPosition, setCurPosition] = useState<Position>({ x: 0, y: 0 });
	// track facing direction (needed for image AND wasd logic)
    const [facingDirection, setFacingDirection] = useState('N');    // N, S, E, W
	// track the active grid
	const [grid, setGrid] = useState<number[][]>(grids[0]);
	// track page
	const [curPage, setCurPage] = useState(1);

	const goToPrevPage = useCallback(() => {
		if (curPage > 1) {
			setCurPage((prevState) => prevState - 1);
		}
	}, [curPage]);

	const goToNextPage = useCallback(() => {
		if (curPage < grids.length) {
			setCurPage((prevState) => prevState + 1);
		}
	}, [curPage]);

	const getImageSrc = (): string => {
		switch (facingDirection) {
			case "N":
				return "/maze/tanjiro_back.png";
			case "W":
				return "/maze/tanjiro_left.png";
			case "S":
				return "/maze/tanjiro_front.png";
			case "E":
				return "/maze/tanjiro_right.png";
            default:
                console.log(`Invalid facing direction of ${facingDirection}!`);
                return "INVALID";
		}
	};

	const updateGrid = useCallback((page: number) => {
		if (page !== curPage) {
			setCurPage(page);
		}
		setGrid(grids[page - 1]);   // page is not 0-indexed, need to convert accordingly
	}, [curPage]);

	// listen for certain key presses
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			switch (event.key) {
				case "w": // forward
                    if(facingDirection === 'N') {   // already facing direction of movement
                        setCurPosition((prevPos) => {
                            const newX = prevPos.x;
                            const newY = Math.max(0, prevPos.y - 1);
                            if (grid[newY][newX] === 1) return prevPos;
                            return { x: newX, y: newY };
                        });
                    } else {    // otherwise, turn the character first
                        setFacingDirection('N');
                    }
					break;
				case "a": // left
                    if(facingDirection === 'W') {
                        setCurPosition((prevPos) => {
                            const newX = Math.max(0, prevPos.x - 1);
                            const newY = prevPos.y;
                            if (grid[newY][newX] === 1) return prevPos;
                            return { x: newX, y: newY };
                        });
                    } else {
                        setFacingDirection('W');
                    }
					break;
				case "s": // back
                    if(facingDirection === 'S') {
                        setCurPosition((prevPos) => {
                            const newX = prevPos.x;
                            const newY = Math.min(gridSize - 1, prevPos.y + 1);
                            if (grid[newY][newX] === 1) return prevPos;
                            return { x: newX, y: newY };
                        });
                    } else {
                        setFacingDirection('S');
                    }
					break;
				case "d": // right
                    if(facingDirection === 'E') {
                        setCurPosition((prevPos) => {
                            const newX = Math.min(gridSize - 1, prevPos.x + 1);
                            const newY = prevPos.y;
                            if (grid[newY][newX] === 1) return prevPos;
                            return { x: newX, y: newY };
                        });
                    } else {
                        setFacingDirection('E');
                    }
					break;
				case "q":
					goToPrevPage();
					break;
				case "e":
					goToNextPage();
					break;
				default:
					console.log(event.key);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [facingDirection, goToNextPage, goToPrevPage, grid]);

	return (
		<div className="flex flex-col justify-center items-center gap-3">
			<Grid curPosition={curPosition} imgSrc={getImageSrc()} grid={grid} gridSize={10} />
			<GamePagination updateGrid={updateGrid} curPage={curPage} pageCount={grids.length} />
		</div>
	);
};

export default MazeWindow;
