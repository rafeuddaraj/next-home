'use client'
import NextIrrigator from "@/components/Dashboard/NextIrrigrator";
import { app } from "@/firebase/firebase";
import useAuthChecker from "@/hooks/useAuthChecker";
import { child, get, getDatabase, ref } from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Controller() {
    const { productId } = useParams()
    const auth = useAuthChecker()
    const [paymentStatus, setPaymentStatus] = useState(false)
    const dbRef = ref(getDatabase(app))

    useEffect(() => {
        if (auth) {
            get(child(dbRef, `/buyProducts/${auth.uid}`)).then(snapshot => {
                if (snapshot.exists()) {
                    setPaymentStatus(snapshot.val().paymentStatus)
                }
            })
        }
    }, [auth, dbRef, productId])
    return (
        <>
            {paymentStatus ? <NextIrrigator /> : <div className="container py-10">
                <h2 className="text-6xl text-pink-400">Please wait your payment request processing</h2>
            </div>}
        </>
    );
}