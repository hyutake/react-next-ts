'use client'

import { useEffect, useState } from "react";

type Position = {
    x: number;
    y: number;
}

const Grid: React.FC = () => {
    const gridSize = 12;
    // position is 0-indexed. (0, 0) refers to top-left of grid -> (19, 19 refers to bottom-right of grid)
    const [curPosition, setCurPosition] = useState<Position>({x: 0, y: 0});

    // listen for certain key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch(event.key) {
                case 'w':   // forward
                    setCurPosition(prevPos => ({ x: prevPos.x, y: Math.max(0, prevPos.y - 1) }));
                    break;
                case 'a':   // left
                    setCurPosition(prevPos => ({ x: Math.max(0, prevPos.x - 1), y: prevPos.y }));
                    break;
                case 's':   // back
                    setCurPosition(prevPos => ({ x: prevPos.x, y: Math.min(gridSize - 1, prevPos.y + 1 )}));
                    break;
                case 'd':   // right
                    setCurPosition(prevPos => ({ x: Math.min(gridSize - 1, prevPos.x + 1), y: prevPos.y }));
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [])

    const renderGrid = () => {
        const gridItems = [];
        for(let y = 0; y < gridSize; y++) {
            for(let x = 0; x < gridSize; x++) {
                gridItems.push(<div key={`${x}-${y}`} className={`h-8 w-8 text-black ${curPosition.x === x && curPosition.y === y ? 'bg-amber-300' : 'bg-white'}`}>
                    ({x},{y})
                </div>)
            }
        }
        return gridItems;
    }

    return (
        <div className={`grid grid-cols-12 gap-1`}>
            {renderGrid()}
        </div>
    );
}

export default Grid;