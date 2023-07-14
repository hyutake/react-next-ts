"use client";

import Image, { StaticImageData } from "next/image";
import hkBack from '../../../public/hk_back.png';
/*
    props: {
        id: string  // to identify the card (and it's corresponding pair), custom id - not to be randomly generated
        image?: any // to be displayed on the card to differentiate it with other cards
    }
*/

import { useEffect, useState } from "react";

type CardProps = {
	imageSrc?: StaticImageData;
    registerClick: (hideCard: () => void) => void;
    forceHide: boolean
};

const Card: React.FC<CardProps> = ({ imageSrc = hkBack, registerClick, forceHide }) => {
    // To determine which side of the card is being shown 
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    const showCard = () => {
        setIsRevealed(true);
    }

    const hideCard = () => {
        setIsRevealed(false);
    }

	const clickHandler = () => {
        if(isRevealed) {
            console.log("Card is already revealed!");
        } else {
            showCard();
            registerClick(hideCard);
        }
    };

    useEffect(() => {
        hideCard();
    }, [forceHide])

	const cardBack = (
		<div className="absolute inset-0 h-full w-full rounded-xl text-center text-black flex flex-col items-center justify-center">
			<Image src={hkBack} alt="" priority={true} />
		</div>
	);

	const cardFront = (
		<div className="absolute inset-0 h-full w-full rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
            <Image src={imageSrc} alt="" />
        </div>
	);

	return (
        <div className="relative group" onClick={clickHandler}>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-300 to-blue-700 rounded-xl group-hover:blur-lg duration-1000 group-hover:duration-200"></div>
            <div className="relative h-48 w-32 cursor-pointer group-hover:-translate-y-2 group-hover:duration-200 duration-500">
                <div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${isRevealed ? '[transform:rotateY(180deg)]' : ''}`}>
                    {cardBack}
                    {cardFront}
                </div>
            </div>
        </div>
	);
};

export default Card;
