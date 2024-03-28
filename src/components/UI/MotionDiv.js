'use client'
import { motion } from 'framer-motion';

export default function MotionDiv({ children, ...options }) {
    return (
        <>
            <motion.div {...options}>
                {children}
            </motion.div>
        </>
    );
}