"use client";

import React, { HTMLProps } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface SideBarListProps {
	className?: HTMLProps<HTMLElement>["className"];
	itemClassName?: HTMLProps<HTMLElement>["className"];
}

export const SideBarList: React.FC<SideBarListProps> = ({
	className,
	itemClassName,
}) => {
	const pathname = usePathname();
	return (
		<ul className={`hover:cursor-pointer ${className}`}>
			{[
				{ name: "menu.memory", label: "Memory game", link: "/memory-game" },
				{ name: "menu.aim", label: "Aim Trainer", link: "/aim-trainer" },
				{ name: "menu.keyboard", label: "(WIP)", link: "/keyboard" },
			].map((item) => {
				const isActive = pathname.startsWith(item.link);
				return (
					<Link key={item.name} href={item.link}>
						<li
							className={`hover:bg-primary-blue-005 hover:shadow-[inset_6px_0_0_#2563CC] ${itemClassName} ${isActive ? 'bg-blue-200' : ''}`}
						>
							{item.label}
						</li>
					</Link>
				);
			})}
		</ul>
	);
};

const Sidebar: React.FC = () => {
    return (
      <aside className="bg-white text-cool-gray-90 lg:w-48 w-32 md:flex hidden">
        {<SideBarList className="w-full" itemClassName="p-4" />}
      </aside>
    );
  };
  
  export default Sidebar;