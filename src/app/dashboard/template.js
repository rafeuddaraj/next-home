'use client'
import { app } from "@/firebase/firebase";
import useAuthChecker from "@/hooks/useAuthChecker";
import { child, get, getDatabase, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function DashboardTemplate({ children }) {
    const isAuth = useAuthChecker()
    const router = useRouter()
    const dbRef = ref(getDatabase(app))
    const [next, setNext] = useState(false)
    if (isAuth) {
        get(child(dbRef, `/buyProducts/${isAuth?.uid}`)).then(snapshot => {
            if (!snapshot.exists()) {
                if (!snapshot.val()) {
                    router.push('/')
                }
            } else {
                setNext(true)
            }
        })
    }
    if (isAuth === null) {
        router.push('/signin')
        return
    }
    return next && children
}