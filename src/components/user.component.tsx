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
        // sessionData: { sub: , token: , id: , iat: , exp: , jti: }
        return (
            <ul>
                {Object.keys(sessionData).map(key => {
                    if(key === 'iat' || key === 'exp') {    // iat & exp represent the # of seconds since EPOCH (1970-01-01T00:00:00Z) apparently
                        const formattedDate = new Date(sessionData[key] * 1000).toLocaleString('en-US', {timeZone: 'Asia/Singapore'});
                        return <li key={key}>
                        <strong>{key}: </strong>
                        <span className="italic">{`${formattedDate} (value: ${sessionData[key]})`}</span>
                    </li>
                    }
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
        </div>
    )
}