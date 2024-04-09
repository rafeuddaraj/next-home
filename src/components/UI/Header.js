'use client'

import { app } from '@/firebase/firebase';
import useAuthChecker from '@/hooks/useAuthChecker';
import { child, get, getDatabase, ref } from 'firebase/database';
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import Logout from "../Buttons/Logout";
import DarkModeIcon from "./DarkModeIcon";

export default function Header() {
    const auth = useAuthChecker()
    const dbRef = ref(getDatabase(app))
    const [haveProduct, setHaveProduct] = useState(false)
    const [productLength, setProductLength] = useState(false)
    if (auth) {
        get(child(dbRef, `/buyProducts/${auth?.uid}`)).then(snapshot => {
            if (snapshot.exists()) {
                if (snapshot.val()) {
                    setHaveProduct(true)
                    setProductLength(1)
                }
            }
        })
    }
    const { photoURL, email } = auth || {}
    return (
        <>
            <nav className="navbar bg-base-300 sticky top-0 z-50 shadow-md">
                <div className="flex-1">
                    <Link href={'/'} className="btn btn-ghost text-sm sm:text-xl text-[#FF00D3] font-bold">
                        <Image className="h-8 w-8 sm:h-10 sm:w-10" height={20} width={20} src="/logo.svg" alt="logo" />
                        Next Home
                    </Link>
                </div>
                <div className="flex-none">
                    <DarkModeIcon />
                    {haveProduct && <Link href='/dashboard' className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <Image src={'/dashboard.svg'} height={20} width={20} alt='dashboard' />
                            <span className="badge badge-sm indicator-item">{productLength}</span>
                        </div>
                    </Link>}
                    {auth ? (<>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image alt={email} height={20} width={20} src={photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href={'/account'} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Logout />
                                </li>
                            </ul>
                        </div>
                    </>) : (<>
                        <Link href='/signin' className="btn btn-primary mx-1 sm:mx-5 px-[2px] sm:px-[1rem]">Sign In Now</Link>
                    </>)}
                </div>
            </nav>
        </>
    );
}