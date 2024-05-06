'use client'
import { app } from '@/firebase/firebase';
import useAuthChecker from '@/hooks/useAuthChecker';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";

export default function NextIrrigator() {
    const auth = useAuthChecker()
    const db = getDatabase(app)
    const trackFirst = useRef(1)
    const [irrigatorDetails, setIrrigatorDetails] = useState(null);
    useEffect(() => {
        if (auth) {
            const dbRef = ref(db, `/nextIrrigator/${auth.uid}`)
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const irrigator = snapshot.val()
                    setIrrigatorDetails(irrigator)

                }
            })
        }
        trackFirst.current = 2
        return () => {
            trackFirst.current = 1
        }
    }, [auth, db])

    const [loading, setLoading] = useState(false)

    const handleOnOFF = useCallback((status) => {
        const dbRef = ref(getDatabase(app), `/nextIrrigator/${auth.uid}`)
        setLoading(true)
        update(dbRef, {
            startStatus: status
        }).then(() => {
            setLoading(false)
        })
    }, [auth?.uid])

    const { startStatus, waterLevel, responseStartStatus } = irrigatorDetails || {}

    // const [voltage, setVoltage] = useState(0)
    // const handleSlider = (e) => {
    //     setVoltage(e.target.value)
    // }

    return (
        <section className="my-10">
            <div className="!container">
                <div className="w-full sm:w-[80%] md:w-[50%]  xl:w-[35%] mx-auto max-w-sm p-8 rounded-lg shadow-md bg-base-100">
                    <h2 className="text-2xl font-semibold text-center mb-4">Water Control</h2>
                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={() => !startStatus && handleOnOFF(true)} className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-700 focus:outline-none">Turn On</button>
                        <button className="px-4 py-2 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-600 focus:outline-none" onClick={() => {
                            if (startStatus) {
                                handleOnOFF(false)
                            }
                        }}>Turn Off</button>
                    </div>
                    <div className={`mt-8 relative ${loading ? 'animate-pulse' : ''}`}>

                        {responseStartStatus && startStatus && <Image height={100} width={100} src="/tenor.gif" alt="Waterfall Status" className="w-full rounded-lg shadow-md h-32" />}
                        {!responseStartStatus && !startStatus && trackFirst.current !== 1 && <video className="w-full rounded-lg shadow-md" autoPlay muted>
                            <source src="/stop.mp4" type="video/mp4" />
                        </video>}



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

                {/* <div>
                    <input onChange={handleSlider} type="range" min={0} max="100" value={voltage} className="range" step="25" />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div> */}


                <div className='flex justify-center items-center my-10'>
                    <div className="radial-progress border-pink-500 border-4 " style={{ "--value": `${waterLevel * 10}`, "--size": "12rem", "--thickness": "2rem" }} role="progressbar">{waterLevel * 10}%</div>
                </div>
            </div>

        </section>
    )
}


