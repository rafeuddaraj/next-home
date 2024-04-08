'use client'

import useAuthChecker from "@/hooks/useAuthChecker";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaymentModal from "../UI/PaymentModal";

export default function BuyProduct({ product }) {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()
    const auth = useAuthChecker()
    if (auth === null) router.push('/signin')

    return (
        <>
            {showModal && <PaymentModal onShowModal={setShowModal} product={product} />}
            <button onClick={() => setShowModal(true)} className="btn btn-primary focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">Get started</button>
        </>
    );
}