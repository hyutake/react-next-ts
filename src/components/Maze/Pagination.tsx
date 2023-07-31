"use client"

import { Box, Pagination } from "@mui/material";
import { useCallback, useEffect } from "react";

const pageSize = 1;

interface GamePaginationProps {
    updateGrid: (page: number) => void;
    curPage: number;
    pageCount: number;
}

/*
    Idea: GamePagination is purely used to display the current active grid AND the total number of available grids (a.k.a maps)
        - 2 methods of navigating to different pages: 
            1. keybinds [q] -> prev page and [e] -> next page
            2. directly clicking the page buttons in Pagination
*/
const GamePagination: React.FC<GamePaginationProps> = ({ updateGrid, curPage, pageCount }) => {
    // page given here is NOT 0-indexed
    const handlePageChange = useCallback((event: any, page: number) => {
        updateGrid(page);
    }, [updateGrid])

    // To trigger an onChange when curPage changes (strictly via key presses that change the value of curPage)
    useEffect(() => {
        handlePageChange(null, curPage)   
    }, [curPage, handlePageChange])

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Pagination
                page={curPage}
                count={Math.ceil(pageCount / pageSize)}  // total number of PAGES
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