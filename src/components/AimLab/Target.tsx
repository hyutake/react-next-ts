"use client"

import { HTMLProps, MouseEventHandler } from "react";

type TargetPosition = {
    x: number;
    y: number;
}

interface TargetProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    className: HTMLProps<HTMLElement>["className"];
    position: TargetPosition;
}

const Target: React.FC<TargetProps> = ({ onClick, className, position }) => {
    return (
        <div onClick={onClick} className={className} style={{left: position.x, top: position.y}}>
        </div>
    );
}

export default Target;