'use client'
import { app } from '@/firebase/firebase';
import useAuthChecker from '@/hooks/useAuthChecker';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import moment from 'moment';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";

export default function NextIrrigator() {
    const auth = useAuthChecker()
    const db = getDatabase(app)
    const trackFirst = useRef(1)
    const [autoStopCountDown, setAutoStopCountDown] = useState(0)
    // console.log(app);
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
        return () => {
            trackFirst.current = 1
        }
    }, [auth, db])


    const handleOnOFF = useCallback((status) => {
        const dbRef = ref(getDatabase(app), `/nextIrrigator/${auth.uid}`)
        update(dbRef, {
            startStatus: status
        })
    }, [auth?.uid])

    // eslint-disable-next-line no-unused-vars
    const { startStatus, lastStartedTime, waterLevel, averageStartingTime, history } = irrigatorDetails || {}

    const historyArrayAvgTime = Object.keys(history || {}).map(key => {
        const startTime = moment(history[key].startTime)
        const endTime = moment(history[key].endTime)
        return moment.duration(moment(endTime).diff(moment(startTime))).asMinutes().toFixed(2)
    })

    const avgTime = historyArrayAvgTime.reduce((prev, curr) => Number(prev) + Number(curr), 0) / historyArrayAvgTime.length

    const timerRef = useRef()

    useEffect(() => {
        if (avgTime) {
            timerRef.current = setTimeout(() => {
                handleOnOFF(false)
            }, avgTime * 60000)
        }
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [avgTime, handleOnOFF, startStatus])

    const autoCountDownRef = useRef()

    const tick = useCallback(() => {
        setAutoStopCountDown(prev => prev - 1)

    }, [])

    useEffect(() => {
        if (avgTime) {
            setAutoStopCountDown((avgTime * 60000) / 1000)
        }
    }, [avgTime])

    useEffect(() => {
        autoCountDownRef.current = setInterval(tick, 1000)
        return () => {
            clearInterval(autoCountDownRef.current)
        }
    }, [tick])



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
                    <div className="mt-8 relative">

                        {startStatus ? <Image height={100} width={100} src="/tenor.gif" alt="Waterfall Status" className="w-full rounded-lg shadow-md h-32" /> : startStatus === false ? <video className="w-full rounded-lg shadow-md" autoPlay muted>
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
                    <div className="radial-progress border-pink-500 border-4 " style={{ "--value": `${waterLevel * 10}`, "--size": "12rem", "--thickness": "2rem" }} role="progressbar">{waterLevel * 10}%</div>
                </div>
                {startStatus && <div className="grid grid-flow-col gap-5 text-center auto-cols-max w-[27%] mx-auto my-5">
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": parseInt(autoStopCountDown) / 60 }}></span>
                        </span>
                        min
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": parseInt(autoStopCountDown) % 60 }}></span>
                        </span>
                        sec
                    </div>
                </div>}
            </div>

        </section>
    )
}


