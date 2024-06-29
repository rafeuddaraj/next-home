'use client'
import { app } from '@/firebase/firebase';
import useAuthChecker from '@/hooks/useAuthChecker';
import { child, get, getDatabase, ref } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function ProductPage({ params: { productId } }) {

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
            <section className="text-pink-500 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-8 h-8" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-lg title-font font-medium mb-3">History</h2>
                                    <p className="leading-relaxed text-base">You can easily view all your water history from now</p>

                                    {paymentStatus ? <Link href={`/dashboard/${productId}/history`} className="mt-3 text-indigo-500 inline-flex items-center">Go
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link> : <button onClick={() => alert("Please wait checking your transactionId")} className="mt-3 text-indigo-500 inline-flex items-center">Go
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>}


                                </div>
                            </div>
                        </div>
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                    <Image height={100} width={100} src={'/control.svg'} alt="control" />
                                </div>
                                <div className="">
                                    <h2 className="text-lg title-font font-medium mb-3">Controller</h2>
                                    <p className="leading-relaxed text-base">You can control your water very easily from now on</p>
                                    {paymentStatus ? <Link href={`/dashboard/${productId}/controller`} className="mt-3 text-indigo-500 inline-flex items-center">Go
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link> : <button onClick={() => alert("Please wait checking your transactionId")} className="mt-3 text-indigo-500 inline-flex items-center">Go
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}