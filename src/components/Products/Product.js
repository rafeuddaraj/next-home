import Image from "next/image";
import Link from 'next/link';

export default function Product({ product }) {
    const { id, title, tags, thumbnail } = product || {}
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <Link href={`/products/${title.replace(' ', "-").toLowerCase()}--${id}`}>
                    <figure>
                        <Image
                            src={thumbnail}
                            height={600}
                            width={600}
                            quality={100}
                            alt={title}
                        />
                    </figure>
                </Link>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Control by IOT</p>
                    <div className="card-actions justify-end">
                        {tags?.map(tag => <div key={tag} className="badge badge-outline">{tag}</div>)}
                    </div>
                </div>
            </div>
        </>
    );
}