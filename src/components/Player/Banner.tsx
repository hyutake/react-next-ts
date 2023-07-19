type BannerProps = {
	label: string;
	score?: number;
	attempts?: number;
};

const Banner: React.FC<BannerProps> = ({ label, score = 0, attempts = 0 }) => {
	return (
		<div className="flex flex-col text-center w-18 lg:w-24">
			<h1 className="text-2xl">{label}</h1>
			<div className="p-1 border border-solid rounded-lg border-white">
				<h2 className="text-sm lg:text-base italic">Score</h2>
				<p className="text-3xl font-bold">{score}</p>
				<h2 className="text-sm lg:text-base italic">Attempts</h2>
				<p className="text-3xl font-bold">{attempts}</p>
			</div>
		</div>
	);
};

export default Banner;