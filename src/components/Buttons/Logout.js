'use client'
import { app } from "@/firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter()
    const handleLogout = () => {
        signOut(getAuth(app))
        router.push('/signin')
    }
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}