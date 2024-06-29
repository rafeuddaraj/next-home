import MotionDiv from "@/components/UI/MotionDiv";
import Link from "next/link";


export default function ProfileLayout({ children }) {
    return (
        <>
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.9,
                    ease: [0, 0.71, 0.2, 1.01]
                }} className="my-10">
                <section className="!container">
                    <div className="flex justify-between">
                        <div className="sidebar w-[25%]">
                            <ul>
                                <li>
                                    <Link className="block hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm" href={'/account'}>Profile</Link>
                                </li>
                                <li>
                                    <Link className="block hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm" href={'/change-password'}>Change Password</Link>
                                </li>
                                <li className="hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm">Transaction</li>
                            </ul>
                        </div>
                        {children}
                    </div>
                </section>
            </MotionDiv>
        </>
    );
}