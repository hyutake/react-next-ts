"use client";

/*
    props: {
        id: string  // to identify the card (and it's corresponding pair), custom id - not to be randomly generated
        image?: any // to be displayed on the card to differentiate it with other cards
    }
*/

import { useState } from "react";

type CardProps = {
	id: string;
	image?: any;
};

const Card: React.FC<CardProps> = ({ id }) => {
    // To determine which side of the card is being shown
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

	const clickHandler = () => {
        setIsRevealed(prevState => !prevState);
    };

	const cardBack = (
		<div className="absolute inset-0 h-full w-full rounded-xl bg-red-600/80 text-center text-black flex flex-col items-center justify-center">
			<p>-- Back --</p>
            <p>({id})</p>
		</div>
	);

	const cardFront = (
		<div className="absolute inset-0 h-full w-full rounded-xl bg-black text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
            <p>-- Front --</p>
            <p>({id})</p>
        </div>
	);

	return (
        <div className="relative group mr-4" onClick={clickHandler}>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-300 to-blue-700 rounded-xl group-hover:blur-lg duration-1000 group-hover:duration-200"></div>
            <div className="relative h-48 w-32 cursor-pointer">
                <div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${isRevealed ? '[transform:rotateY(180deg)]' : ''}`}>
                    {cardBack}
                    {cardFront}
                </div>
            </div>
        </div>
	);
};

export default Card;
