"use client"

import { useState, useEffect, useCallback } from "react";

const useTimer = (initialTime: number) => {
    const [timer, setTimer] = useState<number>(initialTime * 1000);
    const [timerSec, setTimerSec] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const startTimer = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stopTimer = useCallback(() => {
        setIsRunning(false);
    }, []);

    const resetTimer = useCallback((newInitialTime = timerSec) => {
        stopTimer();
        setTimerSec(newInitialTime);
        setTimer(newInitialTime * 1000);
    }, [timerSec, stopTimer]);

    useEffect(() => {
        let intervalId : NodeJS.Timer;
        if(isRunning) {
            intervalId = setInterval(() => {
                setTimer((prevTime) => {
                    if(prevTime === 10) {
                        stopTimer();
                        clearInterval(intervalId);
                    }
                    return prevTime - 10;
                })
            }, 10)
        }
        return () => {
            clearInterval(intervalId);
        } 
    }, [isRunning, stopTimer])

    return {
        timer, timerSec, isRunning,
        startTimer, stopTimer, resetTimer
    }
}

export default useTimer;