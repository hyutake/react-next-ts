"use client"

import { useState } from 'react';
import { useScoreContext } from '@/store/score-context';
import TargetWindow from '@/components/AimLab/TargetWindow';
import ScoreList from '@/components/AimLab/ScoreList';

const AimPage = () => {
    // to store game state (window size + timer)
    const [gameState, setGameState] = useState('s_15');

    const updateGameStateHandler = (newState: string) => {
        setGameState(newState);
    }

    // should be useSession() or smth
    // const {user} = useAuthContext(); 
    const {playerScore} = useScoreContext();
	// const authIndicator = 
	// 	<p className="mb-4 flex flex-col">
	// 		<span>Alias: {playerScore.alias}</span>
	// 		{user !== null && <span>Id: {user.id}</span>}
	// 	</p>
	// ;
 
    return (
        <div className='flex flex-col items-center justify-center w-full h-full bg-cool-gray-100'>
            {/* {authIndicator} */}
            <TargetWindow state={gameState} updateState={updateGameStateHandler}/>
            <ScoreList state={gameState} />
        </div>
    )
}

export default AimPage;