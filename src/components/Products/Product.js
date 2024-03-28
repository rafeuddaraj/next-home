import productOne from '@/assets/product-1.png';
import Image from "next/image";

export default function Product() {
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <Image
                        src={productOne}
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Next Irrigator
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Control by IOT</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">IOT</div>
                        <div className="badge badge-outline">Software</div>
                    </div>
                </div>
            </div>
        </>
    );
}