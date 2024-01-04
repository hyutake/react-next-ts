"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import User from "@/components/User";
import { ServerButton } from "@/components/buttons.component";
import { useScoreContext } from "@/store/score-context";

const ProfilePage: React.FC = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin");
        },
    });

    const {playerScore} = useScoreContext();

    const renderPlayerScore = (playerScore: ScoreRecord) => {
        console.log("playerScore: ", playerScore);
        const scores:any[] = Object.keys(playerScore.scores).map((key: any) => {
            return (<li key={key}>
                {key}: {playerScore.scores[key as keyof Scores]}
            </li>)
        })
        return (
            <ul className="flex flex-col justify-center items-center">
                <li key={'alias'}>Alias: {playerScore.alias}</li>
                <li key={'id'}>Id: {playerScore.id}</li>
                {scores}
            </ul>
        );
    }

    if(status === 'loading') {
        return <p>Loading...</p>
    }

    return (
        <div className="m-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">User is logged in!</h1>
            <br/>
            <div className="max-w-4xl break-words">
                <User />
            </div>
            <ServerButton />
            <div>
                {renderPlayerScore(playerScore)}
            </div>
        </div>
    )
}

export default ProfilePage;