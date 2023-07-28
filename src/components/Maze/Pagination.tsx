"use client"

import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";

/*
    Idea: Pagination will control the navigation between all the grid maps
        - Ideally, the data handled here can entirely be used to help render the grid map
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
    { id: 'g3', name: 'grid_3' },
]

const getMockData = (from: number, to: number) => {
    const data = GRID_DATA.slice(from, to);
    return {
        count: GRID_DATA.length,    // note that this depends on pageCount
        data: data
    }
}

interface GamePaginationProps {
    updateGrid: (newGrid: string) => void;
    curPage: number;
}

const GamePagination: React.FC<GamePaginationProps> = ({ updateGrid, curPage }) => {
    const [pagination, setPagination] = useState({
        count: GRID_DATA.length,    // total no. of items
        from: 0,
        to: pageSize,
    })

    // page given here is NOT 0-indexed
    const handlePageChange = (event: any, page: number) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination((prevState) => {
            return {count: prevState.count, from, to}
        })
    }

    // To trigger updateGrid when pagination changes (so rendered grid changes accordingly)
    useEffect(() => {
        const res = getMockData(pagination.from, pagination.to);
        updateGrid(res.data[0].name);
    }, [pagination.from, pagination.to, updateGrid])

    // To trigger an onChange when curPage changes
    useEffect(() => {
        handlePageChange(null, curPage)   
    }, [curPage])

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Pagination
                page={curPage}
                count={Math.ceil(pagination.count / pageSize)}  // total number of PAGES
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                hideNextButton
                hidePrevButton
            />
        </Box>
    )
}

export default GamePagination;