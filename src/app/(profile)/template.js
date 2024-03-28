import MotionDiv from "@/components/UI/MotionDiv";


export default function template({ children }) {
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