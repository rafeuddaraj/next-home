'use client'

import Animate from "@/components/UI/Animate";
import Link from 'next/link';

export default function Dashboard() {

    return (
        <>
            <h2>Dashboard Page</h2>

            <Animate>
                <section className="my-10">
                    <div className="my-5 text-center space-y-10 mb-20">
                        <div className="divider text-4xl font-bold text-[#FF00D3]">Products</div>
                    </div>
                    <Link href="/dashboard/irragator"><h2>Next Irrigator</h2></Link>
                </section>
            </Animate>
        </>
    );
}