'use client'
import { app } from '@/firebase/firebase';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";

export default function NextIrrigator() {
    const db = getDatabase(app)
    const trackFirst = useRef(1)
    // console.log(app);
    const [isStop, setIsStop] = useState('');
    useEffect(() => {
        const dbRef = ref(db, '/LED_STATUS')
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const status = snapshot.val()
                if (trackFirst.current === 1 && !status) {
                    trackFirst.current = 2
                } else {
                    setIsStop(status)
                }
            }
        })
        return () => {
            trackFirst.current = 1
        }
    }, [])


    const handleOnOFF = (status) => {
        update(ref(db), { '/LED_STATUS': status })
            .then((value) => {
                setIsStop(status)
            })
    }

    return (
        <section className="my-10">
            <div className="!container">
                <div className="w-full sm:w-[80%] md:w-[50%]  xl:w-[35%] mx-auto max-w-sm p-8 rounded-lg shadow-md bg-base-100">
                    <h2 className="text-2xl font-semibold text-center mb-4">Water Control</h2>
                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={() => !isStop && handleOnOFF(true)} className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-700 focus:outline-none">Turn On</button>
                        <button className="px-4 py-2 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-600 focus:outline-none" onClick={() => {
                            if (isStop) {
                                handleOnOFF(false)
                            }
                        }}>Turn Off</button>
                    </div>
                    <div className="mt-8 relative">

                        {isStop ? <Image height={100} width={100} src="/tenor.gif" alt="Waterfall Status" className="w-full rounded-lg shadow-md h-32" /> : isStop === false ? <video className="w-full rounded-lg shadow-md" autoPlay muted>
                            <source src="/stop.mp4" type="video/mp4" />
                        </video> : "Stop"}



                        <div id="loadingOverlay" className="absolute inset-0 bg-gray-500 opacity-75 hidden justify-center items-center">
                            <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                            </svg>
                            <span className="text-white ml-2">Loading...</span>
                        </div>
                    </div>
                </div>
                <svg id="refresh-icon" style={{ display: "none" }} viewBox="0 0 24 24">
                    <path fill="none" d="M12 5c-1.8 0-3.2 1.4-3.2 3s1.4 3 3.2 3 3.2-1.4 3.2-3-1.4-3-3.2-3zM7.16 16.84l4.84-4.84c.78-.78 2.05-.78 2.83 0l.78.78c.78.78.78 2.05 0 2.83l-4.84 4.84c-.78.78-2.05.78-2.83 0z" />
                </svg>


                <div className='flex justify-center items-center my-10'>
                    <div className="radial-progress" style={{ "--value": "100", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">70%</div>
                </div>
                {isStop && <div className="grid grid-flow-col gap-5 text-center auto-cols-max w-[27%] mx-auto my-5">
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 15 }}></span>
                        </span>
                        days
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 10 }}></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 24 }}></span>
                        </span>
                        min
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 53 }}></span>
                        </span>
                        sec
                    </div>
                </div>}
            </div>

        </section>
    )
}


