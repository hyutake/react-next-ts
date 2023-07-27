"use client"

import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";

/*
    Idea: Pagination will control the navigation between all the grid maps
        - Ideally, the data handled here can entirely be used to help render the grid map
            - Meaning that theres an array of arrays, each of these internal arrays containing 144 (12x12) values to denote "terrain"
            - And then renderGrid() can be modified to just read through and render different grids accordingly
        - Alternatively, the data handled here can just contain some text / enum to denote the type of grid map, and then leave that up to renderGrid() to interpret
        - [UPDATE]: doing 1st option, full grid data needed to properly handle movement logic
        - Full grid data can be hard-coded in page.tsx, just use id or smth here to denote which grid in particular
        - Will have to track the actual grid (array of 144 values) in page.tsx, updateGrid to be passed here to modify it
*/

const pageSize = 1;

const GRID_DATA = [
    { id: 'g1', name: 'grid_1' },
    { id: 'g2', name: 'grid_2' },
]

interface GamePaginationProps {
    updateGrid: (newGrid: string) => void;
}

const GamePagination: React.FC<GamePaginationProps> = ({ updateGrid }) => {
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    })

    const getMockData = (from: number, to: number) => {
        const data = GRID_DATA.slice(from, to);
        return {
            count: GRID_DATA.length,
            data: data
        }
    }

    useEffect(() => {
        const res = getMockData(pagination.from, pagination.to);
        // console.log(res);

        updateGrid(res.data[0].name);

        setPagination((prevState) => {
            return {...prevState, count: res.count}
        })
    }, [pagination.from, pagination.to, updateGrid])

    // page given here is NOT 0-indexed
    const handlePageChange = (event: any, page: number) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination((prevState) => {
            return {...prevState, from, to}
        })
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Pagination
                count={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
            />
        </Box>
    )
}

export default GamePagination;