'use client'

import Grid from "@/components/Keyboard/Grid";
import GamePagination from "@/components/Keyboard/Pagination";
import { useState, useEffect, useCallback } from "react";

export type Position = {
    x: number;
    y: number;
}

const gridSize = 10;

// for now, just 2 types: allowed paths and non-allowed paths
const grid1 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const grid2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
    0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
    0, 1, 1, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 1, 1, 1, 1, 1,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
]

const PokePage: React.FC = () => {
    // position is 0-indexed. (0, 0) refers to top-left of grid -> (19, 19 refers to bottom-right of grid)
    const [curPosition, setCurPosition] = useState<Position>({x: 0, y: 0});
    // track the active grid
    const [grid, setGrid] = useState<number[]>(grid1);

    const updateGrid = (newGrid: string) => {
        switch(newGrid) {
            case 'grid_1':
                setGrid(grid1);
                break;
            case 'grid_2':
                setGrid(grid2);
                break;
            default:
                console.log('Invalid grid!');
                break;
        }
    }

    const getNextGridPositionId = useCallback((newX: number, newY: number) => {
        console.log(grid[newY * 10 + newX]);
        return grid[newY * 10 + newX];
    }, [grid])

    // listen for certain key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch(event.key) {
                case 'w':   // forward
                    setCurPosition(prevPos => {
                        const newX = prevPos.x;
                        const newY = Math.max(0, prevPos.y - 1);
                        if(getNextGridPositionId(newX, newY) === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 'a':   // left
                    setCurPosition(prevPos => {
                        const newX = Math.max(0, prevPos.x - 1);
                        const newY = prevPos.y;
                        if(getNextGridPositionId(newX, newY) === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 's':   // back
                    setCurPosition(prevPos => {
                        const newX = prevPos.x;
                        const newY = Math.min(gridSize - 1, prevPos.y + 1 );
                        if(getNextGridPositionId(newX, newY) === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                case 'd':   // right
                    setCurPosition(prevPos => {
                        const newX = Math.min(gridSize - 1, prevPos.x + 1);
                        const newY = prevPos.y;
                        if(getNextGridPositionId(newX, newY) === 1) return prevPos;
                        return { x: newX, y: newY };
                    });
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [getNextGridPositionId])

    return (
        <div className="flex flex-col justify-center items-center bg-primary-blue-005">
            PokePage
            <Grid curPosition={curPosition} grid={grid} />
            <GamePagination updateGrid={updateGrid} />
        </div>
    )
}

export default PokePage;