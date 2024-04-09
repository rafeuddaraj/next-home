'use client'
import { app } from "@/firebase/firebase"
import useAuthChecker from "@/hooks/useAuthChecker"
import { child, get, getDatabase, ref } from "firebase/database"
import moment from "moment/moment"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function HistoryPage() {
    const { productId } = useParams()
    const auth = useAuthChecker()
    const [paymentStatus, setPaymentStatus] = useState(false)
    const dbRef = ref(getDatabase(app))
    const [history, setHistory] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [irrigatorDetails, setIrrigatorDetails] = useState(null)

    useEffect(() => {
        if (auth) {
            get(child(dbRef, `/buyProducts/${auth.uid}`)).then(snapshot => {
                if (snapshot.exists()) {
                    setPaymentStatus(snapshot.val().paymentStatus)
                }
            })
        }
    }, [auth, dbRef, productId])


    useEffect(() => {
        if (auth) {
            get(child(dbRef, `/nextIrrigator/${auth.uid}/history`)).then(snapshot => {
                if (snapshot.exists()) {
                    setHistory(snapshot.val())
                }
            })
        }
    }, [auth, dbRef])
    useEffect(() => {
        if (auth) {
            get(child(dbRef, `/nextIrrigator/${auth.uid}`)).then(snapshot => {
                if (snapshot.exists()) {
                    setIrrigatorDetails(snapshot.val())
                }
            })
        }
    }, [auth, dbRef])


    const historyArray = Object.keys(history || {}) || []



    return (<>
        {paymentStatus ? <section className="!container my-10">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-base-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Water Level</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Start Time</th>
                                <th className="px-4 py-3">End Time</th>
                                <th className="px-4 py-3">Average Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-base-200">
                            {historyArray.map(key => {
                                const { startTime, endTime, waterLevel, startStatus } = history[key] || {}
                                return <React.Fragment key={key}>
                                    <tr className="text-gray-700">
                                        <td className="px-4 py-3 text-ms font-semibold border">
                                            {moment(startTime).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">{waterLevel}</td>
                                        <td className="px-4 py-3 text-xs border">
                                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {startStatus ? "Running" : "Stop"} </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{moment(startTime).format("hh:mmA")}</td>
                                        <td className="px-4 py-3 text-sm border">{moment(endTime).format("hh:mmA")}</td>
                                        <td className="px-4 py-3 text-sm border">{moment.duration(moment(endTime).diff(moment(startTime))).asMinutes().toFixed(2)} Min</td>
                                    </tr>
                                </React.Fragment>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section> : <div className="container py-10">
            <h2 className="text-6xl text-pink-400">Please wait your payment request processing</h2>

        </div >}
    </>
    );
}