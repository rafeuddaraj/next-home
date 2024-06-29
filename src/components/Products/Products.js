import { app } from "@/firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import Product from "./Product";
export default async function Products() {

    const dbRef = ref(getDatabase(app))

    const productsSnapshot = await get(child(dbRef, '/products'))
    const products = productsSnapshot.val()

    return (
        <>
            <div className="flex flex-wrap gap-5 justify-center">

                {Object.keys(products).map(product => <Product key={product} product={products[product]} />)}


            </div>
        </>
    );
}
