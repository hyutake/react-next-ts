"use client"

import { useState, useEffect } from "react";

const getStorageValue = <T,>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : null;
    return initial || defaultValue;
};

const useStorage = <T,>(
	key: string,
	defaultValue: any
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useStorage;
