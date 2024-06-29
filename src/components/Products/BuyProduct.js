'use client'

import { app } from "@/firebase/firebase";
import useAuthChecker from "@/hooks/useAuthChecker";
import { child, get, getDatabase, ref } from "firebase/database";
import Link from 'next/link';
import { useEffect, useState } from "react";
import PaymentModal from "../UI/PaymentModal";

export default function BuyProduct({ product }) {
    const [showModal, setShowModal] = useState(false)
    const { id } = product || {}
    const [allReadyExistProduct, setAllReadyExistProduct] = useState(null)

    const auth = useAuthChecker()

    useEffect(() => {
        (async () => {
            const dbRef = ref(getDatabase(app))
            const alreadyBuy = (await get(child(dbRef, `/buyProducts/${auth?.uid}`))).val()
            setAllReadyExistProduct(alreadyBuy)
        })()
    }, [auth?.uid])

    return (
        <>
            {
                allReadyExistProduct ? (
                    <>
                        <Link href={`/dashboard/${id}`} className="btn btn-primary focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">Go To Dashboard</Link>
                    </>
                ) : (
                    <>
                        {showModal && <PaymentModal onShowModal={setShowModal} product={product} />}
                        <button onClick={() => setShowModal(true)} className="btn btn-primary focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">Get started</button></>
                )
            }

        </>
    );
}