import { app } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


export default function useAuthChecker() {
    const [isAuth, setIsAuth] = useState()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
            if (user) {
                setIsAuth(user)
            } else {
                setIsAuth(user)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])
    return isAuth
}