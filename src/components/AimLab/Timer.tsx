interface TimerProps {
    time: number
}

const Timer: React.FC<TimerProps> = ({ time }) => {
	const formatTime = (time: number): string => {
		const seconds = Math.floor(time / 1000)
			.toString()
			.padStart(2, "0");
		const milliseconds = ((time % 1000) / 10).toString().padStart(2, "0");
		return `${seconds}:${milliseconds}`;
	};

	return <h1 className="m-2 w-10 text-amber-200">{formatTime(time)}</h1>;
};

export default Timer;