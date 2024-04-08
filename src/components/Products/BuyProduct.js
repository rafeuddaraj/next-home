'use client'

import { useState } from "react";
import PaymentModal from "../UI/PaymentModal";

export default function BuyProduct({ product }) {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            {showModal && <PaymentModal onShowModal={setShowModal} product={product} />}
            <button onClick={() => setShowModal(true)} className="btn btn-primary focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">Get started</button>
        </>
    );
}