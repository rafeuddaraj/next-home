import Header from "@/components/UI/Header";


export default function template({ children }) {
    return (
        <>
            {<Header />}
            {children}
        </>
    );
}