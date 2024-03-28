'use client'

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Animate({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{
            opacity: isInView ? 1 : 0,
            transition: "all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}>
            {children}
        </div>
    );
}