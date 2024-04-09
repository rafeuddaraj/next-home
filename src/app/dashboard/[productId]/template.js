'use client'

import { app } from "@/firebase/firebase"
import useAuthChecker from "@/hooks/useAuthChecker"
import { child, get, getDatabase, ref } from "firebase/database"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function Template({ children }) {
    const { productId } = useParams()
    const auth = useAuthChecker()
    const dbRef = ref(getDatabase(app))
    const router = useRouter()
    const [next, setNext] = useState(false)
    if (auth) {
        get(child(dbRef, `/buyProducts/${auth.uid}`)).then(snapshot => {
            if (snapshot.exists()) {
                if (snapshot.val().productId !== productId) {
                    router.push('/dashboard')
                }
                else {
                    setNext(true)
                }
            }
        })
    }
    return next && children
}