import { RegisterButton } from "@/components/buttons.component";
import { User } from "@/components/user.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('=== getServerSession(authOptions) in Home() ===')
  const user = session ? session.user : null;
  console.log(session);
 
  return (
    <main className="flex justify-center items-center h-[70vh]">
      <div>
        <RegisterButton />
        {user && <div className="max-w-4xl break-words">
          <h1 className="text-3xl font-bold text-white">Server Session</h1>
          <p>Id: {user.id }</p>
          <p>Token: {user.token}</p>
        </div>}
      </div>
    </main>
  )
}
