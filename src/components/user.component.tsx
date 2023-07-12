"use client"

import { useSession } from "next-auth/react"

export const User = () => {
    // the Session object returned from useSession() takes awhile to "load", meaning that the status will be 'loading'
    // hence, console.log(data) here will just yield a User object that has all its properties as 'undefined'
    const {data, status} = useSession();

    if(status === 'loading') {
        return <p>Loading...</p>
    }

    const renderSessionData = (sessionData: any) => {
        // sessionData: { user: { sub: , token: , id: , iat: , exp: , jti:  } }
        return (
            <ul>
                {Object.keys(sessionData).map(key => {
                    return <li key={key}>
                        <strong>{key}: </strong>
                        <span className="italic">{sessionData[key]}</span>
                    </li>
                })}
            </ul>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Client Session</h1>
            {renderSessionData(data?.user)}
            {/* <pre>{JSON.stringify(data)}</pre> */}
        </div>
    )
}