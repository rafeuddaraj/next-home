'use client'
import useAuthChecker from '@/hooks/useAuthChecker';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function AccountPage() {

    const auth = useAuthChecker()


    const [inputs, setInputs] = useState(null);
    const { photoURL, email, displayName, uid } = inputs || {}

    useEffect(() => {
        if (auth) {
            setInputs({ ...auth })
        }
    }, [auth])

    return (


        <div className="py-5">
            <div className="w-full">
                <h2>Avatar image</h2>
                <div className="mx-auto mb-5 flex flex-row items-center bg-neutral-100 py-5 lg:mx-0 lg:w-1/2">
                    <Image
                        className="ml-5 h-20 w-20 rounded-full"
                        src={photoURL}
                        height={100}
                        width={100}
                        alt={displayName}
                    />

                    {/* <form>
                        <div>
                            <label className="block">
                                <span className="sr-only">
                                    Choose profile photo
                                </span>
                                <input
                                    type="file"
                                    className="mx-auto ml-5 flex w-full justify-center border-yellow-400 text-sm outline-none file:mr-4 file:bg-amber-400 file:py-2 file:px-4 file:text-sm file:font-semibold"

                                />
                            </label>
                        </div>
                    </form> */}
                </div>
            </div>

            <form className="flex w-full flex-col gap-3" action="">
                <div className="flex w-full flex-col">
                    <label className="flex" htmlFor="name">
                        Name
                        <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                    </label>
                    <input
                        className="w-full border px-4 py-2 lg:w-1/2 disabled:bg-gray-400"
                        type="text"
                        placeholder="Sarah"
                        name='displayName'
                        onChange={((e) => {
                            setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
                        })}
                        value={displayName || ""}
                    />
                </div>
                <div className="flex w-full flex-col">
                    <label className="flex" htmlFor="userId">
                        User ID
                        <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                    </label>
                    <input
                        id='userId'
                        className="w-full border px-4 py-2 lg:w-1/2 disabled:bg-gray-400"
                        type="text"
                        placeholder="ID"
                        disabled
                        value={uid}
                    />
                </div>

                <div className="flex w-full flex-col">
                    <label className="flex" htmlhtmlFor="name">
                        Email
                        <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                    </label>
                    <input
                        className="w-full border px-4 py-2 lg:w-1/2 disabled:bg-gray-400"
                        type="email"
                        disabled
                        value={email}
                        placeholder="Johnson"
                    />
                </div>
            </form>
        </div>
    );
}