"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useState } from "react";
import { User } from "@/components/user.component";

type Record = {
    alias: string;
    id: string;
    s_15: string;
    s_30: string;
    s_45: string;
    s_60: string;
    m_15: string;
    m_30: string;
    m_45: string;
    m_60: string;
    l_15: string;
    l_30: string;
    l_45: string;
    l_60: string;
  }

export default function Profile() {
    const [records, setRecords] = useState<Record[]>([]);
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin");
        },
    });

    if(status === 'loading') {
        return <p>Loading...</p>
    }

    const user = data.user;

    const fetchRecords = async () => {
      const res = await fetch('http://localhost:4000/game', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token || 'INVALID'}` }
      })
  
      if(!res.ok) {
        console.log('Error with fetchRecords!');
        return;
      }
  
      const data = await res.json();
      console.log(data.message);
      setRecords(data.records);
    }

    return (
        <div className="m-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">User is logged in!</h1>
            <br/>
            <div className="max-w-4xl break-words">
                <User />
            </div>
            <button className="py-2 px-4 rounded-3xl bg-cool-gray-100 hover:bg-primary-blue-005 hover:text-black" onClick={fetchRecords}>GET backend data</button>
            <div>
                <p className="text-lg font-bold underline">records (state var)</p>
                <ul>
                    {records.map(record => <li key={record.id}>{record.alias}</li>)}
                </ul>
            </div>
        </div>
    )
}