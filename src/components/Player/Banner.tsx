type BannerProps = {
	label: string;
	score?: number;
	attempts?: number;
};

const Banner: React.FC<BannerProps> = ({ label, score = 0, attempts = 0 }) => {
	return (
		<div className="flex flex-col text-center">
			<h1 className="text-2xl">{label}</h1>
			<div className="p-3 border border-solid rounded-lg border-white">
				<h2 className="text-xl italic">Score</h2>
				<p className="text-3xl font-bold">{score}</p>
				<h2 className="text-xl italic">Attempts</h2>
				<p className="text-3xl font-bold">{attempts}</p>
			</div>
		</div>
	);
};

export default Banner;