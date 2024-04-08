'use client'
import useAuthChecker from "@/hooks/useAuthChecker";
import { useRouter } from "next/navigation";


export default function DashboardTemplate({ children }) {
    const isAuth = useAuthChecker()
    const router = useRouter()
    if (isAuth === null) {
        router.push('/signin')
        return
    }
    return children
}