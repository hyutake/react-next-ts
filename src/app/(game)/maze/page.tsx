'use client'

import Grid from "@/components/Maze/Grid";
import GamePagination from "@/components/Maze/Pagination";
import { useState, useEffect } from "react";

/*
    TODO: Shift everything here to some component instead - leave the page.tsx clean
*/

export type Position = {
    x: number;
    y: number;
}

const gridSize = 10;

const pageCount = 3;    // equal to no. of grids present

// for now, just 2 types: allowed paths and non-allowed paths
const grid1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]

const grid2 = [
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
  ];

const grid3 = [
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
]

const MazePage: React.FC = () => {
    // position is 0-indexed. (0, 0) refers to top-left of grid -> (19, 19 refers to bottom-right of grid)
    const [curPosition, setCurPosition] = useState<Position>({x: 0, y: 0});
    // track the active grid
    const [grid, setGrid] = useState<number[][]>(grid1);
    // track page
    const [curPage, setCurPage] = useState(1);
    
    const goToPrevPage = () => {
        if(curPage > 1) {
            setCurPage((prevState) => prevState - 1);
        }
    }

    const goToNextPage = () => {
        if(curPage < pageCount) {
            setCurPage((prevState) => prevState + 1);
        }
    }

    const updateGrid = (newGrid: string) => {
        switch(newGrid) {
            case 'grid_1':
                setGrid(grid1);
                break;
            case 'grid_2':
                setGrid(grid2);
                break;
            case 'grid_3':
                setGrid(grid3);
                break;
            default:
                console.log('Invalid grid!');
                break;
        }
    }

    // listen for certain key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch(event.key) {
                case 'w':   // forward
                    setCurPosition(prevPos => {
                        const newX = prevPos.x;
                        const newY = Math.max(0, prevPos.y - 1);
                        if(grid[newY][newX] === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 'a':   // left
                    setCurPosition(prevPos => {
                        const newX = Math.max(0, prevPos.x - 1);
                        const newY = prevPos.y;
                        if(grid[newY][newX] === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 's':   // back
                    setCurPosition(prevPos => {
                        const newX = prevPos.x;
                        const newY = Math.min(gridSize - 1, prevPos.y + 1 );
                        if(grid[newY][newX] === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 'd':   // right
                    setCurPosition(prevPos => {
                        const newX = Math.min(gridSize - 1, prevPos.x + 1);
                        const newY = prevPos.y;
                        if(grid[newY][newX] === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 'q':
                    goToPrevPage();
                    break;
                case 'e':
                    goToNextPage();
                    break;
                default:
                    console.log(event.key);
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [grid])

    return (
        <div className="flex flex-col justify-center items-center bg-[url(/maze/hokusai.png)] gap-3 h-full">
            <Grid curPosition={curPosition} grid={grid} />
            <GamePagination updateGrid={updateGrid} curPage={curPage}  />
        </div>
    )
}

export default MazePage;