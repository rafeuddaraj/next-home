'use client'
import MotionDiv from "@/components/UI/MotionDiv";
import useAuthChecker from "@/hooks/useAuthChecker";
import { useRouter } from "next/navigation";


export default function ProfileTemplate({ children }) {
    const isAuth = useAuthChecker()
    const router = useRouter()
    if (isAuth === null) {
        router.push('/signin')
        return
    }
    return (
        <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className="content w-[70%]">
            {children}
        </MotionDiv>
    );
}