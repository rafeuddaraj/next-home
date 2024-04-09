'use client'

import Animate from "@/components/UI/Animate";
import { app } from "@/firebase/firebase";
import useAuthChecker from "@/hooks/useAuthChecker";
import { child, get, getDatabase, ref } from "firebase/database";
import Link from 'next/link';
import { useState } from "react";


export default function Dashboard() {
    const [product, setProduct] = useState(null)
    const auth = useAuthChecker()
    const dbRef = ref(getDatabase(app))
    if (auth) {
        get(child(dbRef, `/buyProducts/${auth.uid}`)).then(snapshot => {
            if (snapshot.exists()) {
                setProduct(snapshot.val())
            }
        })
    }
    const { productTitle, productId } = product || {}
    return (
        <section className="container">
            <h2 className="text-4xl text-center text-pink-500 my-5">Welcome to Next Home Dashboard</h2>

            <Animate>
                <section className="my-10">
                    <div className="my-5 text-center space-y-10 mb-20">
                        <div className="divider text-4xl font-bold text-[#FF00D3]">Your Products</div>
                    </div>
                    <Link href="/dashboard/irragator">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{productTitle}</h2>
                                <div className="card-actions justify-end">
                                    <Link href={`/dashboard/${productId}`} className="btn btn-primary">Control</Link>
                                </div>
                            </div>
                        </div>

                    </Link>
                </section>
            </Animate>
        </section>
    );
}