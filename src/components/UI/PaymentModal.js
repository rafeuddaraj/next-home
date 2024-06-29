import { app } from "@/firebase/firebase";
import useAuthChecker from "@/hooks/useAuthChecker";
import { sendMail } from "@/lib/sendMail";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react';

export default function PaymentModal({ onShowModal, product }) {
    const { title, price, id } = product || {};
    const auth = useAuthChecker()
    const { displayName, email, uid } = auth || {}
    const router = useRouter()
    const dbRef = ref(getDatabase(app), `/buyProducts/${uid}`)

    if (auth === null) router.push('/signin')

    const overlay = useRef();
    const [formData, setFormData] = useState({
        paymentMethod: "",
        transactionId: ""
    });

    const handleDismiss = (e) => {
        if (e.target === overlay.current) {
            onShowModal(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).every(inp => inp)) {
            const paymentData = {
                productId: id,
                productTitle: title,
                userId: uid,
                fullName: displayName,
                paymentStatus: false,
                totalPayment: price,
            }
            set(dbRef, {
                ...paymentData,
                ...formData
            })
            const dbRef2 = ref(getDatabase(app), `/nextIrrigator/${uid}`)
            const irrigatorData = {
                "averageStartingTime": 0,
                "history": {},
                "lastStartedTime": 0,
                "startStatus": false,
                "userId": uid,
                "waterLevel": 0
            }
            sendMail({ ...formData, price, id, name: displayName, email, uid })
            set(dbRef2, {
                ...irrigatorData
            }).then(() => {
                onShowModal(false)
                router.push('/dashboard')
            })
        } else {
            alert("Don't Empty submit!")
        }

    };

    return (
        <div onClick={handleDismiss} ref={overlay} className="fixed top-0 left-0 right-0 bottom-0 bg-black/55 backdrop-blur-[2px] z-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75">
                <form onSubmit={handleSubmit}>
                    <div className="mockup-code">
                        <pre data-prefix="$"><code>Account Number: 01642441724</code></pre>
                    </div>
                    <div className="h-auto w-80 bg-base-200 p-3 rounded-lg space-y-10">
                        <p className="text-xl font-semibold py-5">Payment Details</p>
                        <div className="input_text mt-6 relative">
                            <input
                                value={displayName}
                                disabled
                                type="text"
                                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b"
                                placeholder="Rafe Uddaraj"
                            />
                            <span className="absolute left-0 text-sm -top-[30px]">Name</span>
                            <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                        </div>
                        {email && <div className="input_text mt-6 relative">
                            <input
                                value={email}
                                disabled
                                type="text"
                                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b"
                                placeholder="test@email.com"
                            />
                            <span className="absolute left-0 text-sm -top-[30px]">Email</span>
                            <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                        </div>}
                        <div className="input_text mt-6 relative">
                            <input
                                value={title}
                                disabled
                                type="text"
                                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b"
                            />
                            <span className="absolute left-0 text-sm -top-[30px]">Product Name</span>
                            <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                        </div>
                        <div className="input_text mt-6 relative">
                            <input
                                type="text"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleInputChange}
                                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b"
                                placeholder="XD5278656"
                            />
                            <span className="absolute left-0 text-sm -top-[30px]">Transaction ID</span>
                            <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                        </div>
                        <div className="input_text mt-6 relative">
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                className="p-2 block rounded w-full"
                            >
                                <option value="" hidden>Select Payment Getway</option>
                                <option value="bkash">Bkash</option>
                                <option value="nagad">Nagad</option>
                                <option value="rocket">Rocket</option>
                            </select>
                            <span className="absolute left-0 text-sm -top-[30px]">Payment Method</span>
                            <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                        </div>
                    </div>
                    <p className="text-lg text-center mt-4 btn btn-primary font-semibold">Payment amount:${price}</p>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="btn outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all">Pay</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
