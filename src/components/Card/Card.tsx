"use client";

import Image, { StaticImageData } from "next/image";
import hkBack from '../../../public/hk_back.png';
import { useEffect, useState } from "react";

type CardProps = {
	imageSrc?: StaticImageData;
    id: string;
    registerClick: () => void;
    isRevealed: boolean;
    matchedBy: string;
};

const Card: React.FC<CardProps> = ({ imageSrc = hkBack, id, registerClick, isRevealed, matchedBy }) => {
    const isMatched = matchedBy !== '';

	const clickHandler = () => {
        if(!isRevealed && matchedBy === '') {
            registerClick();
        } else {
            console.log('Invalid click target!');
        }
    };

	const cardBack = (
		<div className="absolute inset-0 h-full w-full rounded-xl text-center text-black flex flex-col items-center justify-center">
			<Image src={hkBack} alt="" priority={true} draggable={false} />
		</div>
	);

	const cardFront = (
		<div className="absolute inset-0 h-full w-full rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
            <Image src={imageSrc} alt="" draggable={false} />
        </div>
	);

    const outlineBlurColor = isMatched ? matchedBy === 'player' ? 'bg-gradient-to-tl from-amber-200 to-amber-500' : 'bg-gradient-to-tl from-red-200 to-red-500' : 'bg-gradient-to-tl from-blue-300 to-blue-800';

	return (
        <div className="relative group" id={id} onClick={clickHandler}>
            <div className={`absolute inset-0 ${outlineBlurColor} rounded-xl ${isRevealed ? 'blur-md': isMatched ? '-inset-0.5 blur-sm' :'' } group-hover:blur-lg duration-1000 group-hover:duration-200`}></div>
            <div className={`relative h-48 w-32 cursor-pointer group-hover:-translate-y-2 duration-500`}>
                <div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${isRevealed || isMatched ? '[transform:rotateY(180deg)]' : ''}`}>
                    {cardBack}
                    {cardFront}
                </div>
            </div>
        </div>
	);
};

export default Card;
