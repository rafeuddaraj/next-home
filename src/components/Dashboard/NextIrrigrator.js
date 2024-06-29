'use client'
import { app } from '@/firebase/firebase';
import useAuthChecker from '@/hooks/useAuthChecker';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";
import Alert from './_components/Alert';

export default function NextIrrigator() {
    const auth = useAuthChecker()
    const db = getDatabase(app)
    const trackFirst = useRef(1)
    const [activeStatus, setActiveStatus] = useState(false)
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

    const [totalSeconds, setTotalSeconds] = useState(0)



    const handleOnOFF = useCallback((status) => {
        const dbRef = ref(getDatabase(app), `/nextIrrigator/${auth.uid}`)
        if (status) {
            handleTimer(totalSeconds)
            setCountdown(totalSeconds);
        }
        update(dbRef, {
            startStatus: status,
            loading: true,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth?.uid, totalSeconds])


    const { startStatus, responseStartStatus, loading, active } = irrigatorDetails || {}


    const currentStatus = useRef(active)
    useEffect(() => {
        if (currentStatus.current) {
            if (currentStatus.current === active) {
                setActiveStatus(false)
            } else {
                setActiveStatus(true)
            }
            currentStatus.current = active
            return
        } else {
            currentStatus.current = active
        }
    }, [active])


    const [isChecked, setIsChecked] = useState(false);

    const handleTimer = (timer) => {
        const dbRef = ref(db, `/nextIrrigator/${auth.uid}`)
        update(dbRef, {
            timer
        })
    }


    const [countdown, setCountdown] = useState(null)
    const minute = parseInt(countdown / 60) || 0
    const second = countdown % 60 || 0


    const [timeInput, setTimeInput] = useState("0");
    const [inputType, setInputType] = useState("minutes");

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        // Reset timer when checkbox is unchecked
        if (!event.target.checked) {
            setCountdown(null);
            setTimeInput("");
        }
    };

    // Function to handle time input change
    const handleTimeInputChange = (event) => {
        setTimeInput(event.target.value.trim());
    };

    // Function to handle input type change
    const handleInputTypeChange = (event) => {
        setInputType(event.target.value);
    };

    // Function to start countdown
    const startCountdown = () => {
        if (timeInput.trim() === '0' || !timeInput.trim()) {
            setShow(true)
            return
        }
        if (timeInput.trim() !== "" && timeInput.trim() !== '0') {
            const inputAsNumber = parseInt(timeInput, 10);
            if (!isNaN(inputAsNumber)) {
                let totalSeconds = inputAsNumber;
                if (inputType === "minutes") {
                    totalSeconds = inputAsNumber * 60;
                }
                setTotalSeconds(totalSeconds);
                setIsChecked(false);
            }
        }
    };

    // Effect to handle countdown logic
    useEffect(() => {
        let timer = null;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && timeInput.trim() !== '0') {
            // Handle countdown completion
            setCountdown(null);
            setTimeInput("0");
            const dbRef = ref(db, `/nextIrrigator/${auth.uid}`)
            update(dbRef, {
                timer: countdown,
                startStatus: false
            })
        }
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    const [show, setShow] = useState(false);


    return (
        <section className="my-10">
            <div className="!container">
                <div className="w-full sm:w-[80%] md:w-[50%]  xl:w-[35%] mx-auto max-w-sm p-8 rounded-lg shadow-md bg-base-100">
                    <h3>Active Status: {activeStatus ? "✅" : "❌"}</h3>
                    <h2 className="text-2xl font-semibold text-center mb-4">Water Control</h2>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            disabled={isChecked}
                            onClick={() => !startStatus && activeStatus ? handleOnOFF(true) : handleOnOFF(false)} className={`px-4 py-2 rounded-md text-white font-semibold focus:outline-none ${!startStatus && activeStatus ? "bg-green-500 disabled:bg-gray-400" : "bg-red-400"}`}>{!startStatus && activeStatus ? "Turn On" : "Turn Off"}</button>
                    </div>
                    {
                        activeStatus && <div className="mt-8 relative">

                            {responseStartStatus && startStatus && !loading ? <Image height={100} width={100} src="/tenor.gif" alt="Waterfall Status" className="w-full rounded-lg shadow-md h-32" /> : !responseStartStatus && !startStatus && !loading && trackFirst.current !== 1 ? <video className="w-full rounded-lg shadow-md" autoPlay muted>
                                <source src="/stop.mp4" type="video/mp4" />
                            </video> : ''}
                            <div id="loadingOverlay" className="absolute inset-0 bg-gray-500 opacity-75 hidden justify-center items-center">
                                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                                </svg>
                                <span className="text-white ml-2">Loading...</span>
                            </div>

                            {loading && (
                                <div className='p-10 text-blue-500 border shadow-lg animate-pulse'>
                                    Please Wait...
                                </div>
                            )}

                        </div>
                    }
                    {/* <Timer setTotalSeconds={setTotalSeconds} isChecked={isChecked} setIsChecked={setIsChecked} countdown={countdown} setCountdown={setCountdown} /> */}

                    {
                        (!startStatus && activeStatus) && <div className="form-control gap-4 my-5">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    className="checkbox checkbox-success me-2"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                Set Timer{" "}
                            </label>
                            {isChecked && (
                                <>
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="minutes"
                                                checked={inputType === "minutes"}
                                                onChange={handleInputTypeChange}
                                                className="radio radio-success me-2"
                                            />{" "}
                                            Minutes
                                            <input
                                                type="radio"
                                                value="seconds"
                                                checked={inputType === "seconds"}
                                                onChange={handleInputTypeChange}
                                                className="radio radio-success me-2 ms-4"
                                            />{" "}
                                            Seconds
                                        </label>
                                        <label>
                                            Timer Input ({inputType}):{" "}
                                            <input
                                                type="number"
                                                className="input input-bordered w-full max-w-80 px-4 py-2"
                                                value={timeInput}
                                                onChange={handleTimeInputChange}
                                            />
                                        </label>
                                        <button
                                            onClick={startCountdown}
                                            className="bg-pink-400 py-2 px-4 rounded-xl ms-5 my-4">
                                            {" "}
                                            Set Timer
                                        </button>
                                    </div>
                                    <div>
                                        {show && <Alert show={show} setShow={setShow} message={"Don't empty timing setting"} />}
                                    </div>
                                </>
                            )}
                        </div>
                    }

                    {countdown !== null && (timeInput.trim() !== '0') ? (
                        <span className="countdown font-mono text-6xl flex justify-center my-4 mx-5">
                            <span
                                style={{
                                    "--value": minute,
                                }}></span>
                            :
                            <span
                                style={{
                                    "--value": second,
                                }}></span>
                        </span>
                    ) : (<>
                        {(startStatus && activeStatus) && <h4 className='text-2xl font-bold text-pink-400 my-3 text-center'> Non stop running...</h4>}
                    </>)}
                </div>
                <svg id="refresh-icon" style={{ display: "none" }} viewBox="0 0 24 24">
                    <path fill="none" d="M12 5c-1.8 0-3.2 1.4-3.2 3s1.4 3 3.2 3 3.2-1.4 3.2-3-1.4-3-3.2-3zM7.16 16.84l4.84-4.84c.78-.78 2.05-.78 2.83 0l.78.78c.78.78.78 2.05 0 2.83l-4.84 4.84c-.78.78-2.05.78-2.83 0z" />
                </svg>

            </div>
        </section >
    )
}


