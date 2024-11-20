"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session === null) {
            router.push("/");
        }
    }, [session, router]);


    return (
    <div className="w-full h-screen">
        
    </div>
    )
}