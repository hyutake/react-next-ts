"use client"

import useTimer from "@/hooks/use-timer";
import Timer from "../Timer";
import Button from "../UI/Button";

interface Props {
    initialTime?: number
}

const TestTimer: React.FC<Props> = ({ initialTime = 5 }) => {
    const { timer, timerSec, isRunning, startTimer, stopTimer, resetTimer } = useTimer(5);

    const toggleTimer = () => {
        if(isRunning) stopTimer();
        else startTimer();
    }

	const timerSecChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newInitialTime = parseInt(event.target.value);
		resetTimer(newInitialTime);
	}

    return (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-2 border rounded border-orange-30">
			<p>---------- Test useTimer() ----------</p>
			<Timer time={timer} />
			<p>Timer is running: {isRunning.toString()}</p>
            <div className="flex gap-2">
				<label htmlFor="timersec">TimerSec:</label>
				<input className="text-black text-center" id="timersec" type="number" min={1} max={15} step={1} defaultValue={timerSec} onChange={timerSecChangeHandler} />
			</div>
			<div className="flex gap-3">
				<Button
					label={isRunning ? "Stop timer" : "Start timer"}
					onClick={toggleTimer}
				/>
				<Button label="Reset timer" onClick={() => resetTimer()} />
			</div>
		</div>
    )
}

export default TestTimer;