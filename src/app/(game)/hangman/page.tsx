"use client"

import { useState } from "react";

const initialDictionary: string[] = [
    'Tanjiro',
    'Zenitsu',
    'Inosuke',
]

/*
    Hangman, but with wordle's UI and a custom list of words that may be picked (from dictionary)
*/
const HangmanPage: React.FC = () => {
    // stores all the possible words that can be tested
    const [dictionary, setDictionary] = useState<string[]>(initialDictionary);
    // stores the current word
    const [word, setWord] = useState<string>('');

    const assignRandomWord = () => {
        // remove solved word from dictionary
        setDictionary((prevState) => {
            return prevState.filter(entry => entry !== word)
        })
        // set a new word
        setWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
    }

    return (
        <div className="flex flex-col items-center justify-evenly bg-cool-gray-100 w-full h-full lg:px-1">
            <div>
                <p>Insert hangman image here</p>
            </div>
            <div>
                <button>
                    <input className="px-2 text-cool-gray-80" type="text" placeholder="Insert text input here" />
                </button>
            </div>
        </div>
    );
}

export default HangmanPage