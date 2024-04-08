import BuyProduct from "@/components/Products/BuyProduct";
import { app } from "@/firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import Image from 'next/image';
import Link from 'next/link';
export default async function page({ params: { productId } }) {
    const id = productId.split('--')[1]
    const dbRef = ref(getDatabase(app))
    const product = (await get(child(dbRef, `/products/${id}`))).val()
    const { title, description, thumbnail, workingProcess, featured, qna, price } = product
    return (
        <>
            <main className="">
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <Image src={thumbnail} height={400} width={400} className="max-w-sm rounded-lg shadow-2xl" alt={title} />
                        <div>
                            <h1 className="text-5xl font-bold text-pink-600">{title}</h1>
                            <p className="py-6">{description}</p>
                            <Link href={'#buy'} className="btn btn-primary">Get Started</Link>
                        </div>
                    </div>
                </div>
                {/* Start Timeline */}
                <div className="my-10">
                    <div className="my-10">
                        <h2 className="text-4xl text-center text-pink-500">Working Process</h2>
                    </div>
                    <ul className="timeline timeline-vertical">
                        {workingProcess.map((process, index) => {
                            if (index % 2 === 0) {
                                return <li key={process}>
                                    {index !== 0 && <hr className="bg-primary" />}
                                    <div className="timeline-start timeline-box">{process}</div>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <hr className="bg-primary" />
                                </li>
                            } else return (
                                <li key={process}>
                                    <hr className="bg-primary" />
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end timeline-box">{process}</div>
                                    <hr className="bg-primary" />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {/* End Timeline */}

                {/* Start Content */}
                <section className="text-gray-600 body-font">
                    <div className="!container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-pink-500">Pitchfork Kickstarter Taxidermy</h1>
                            <p className="lg:w-1/2 w-full leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
                        </div>
                        <div className="flex flex-wrap -m-4 justify-center">
                            {featured.map(({ title, description, image }) => <div key={title} className="xl:w-1/3 md:w-1/2 p-4">
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                        <Image src={image} height={30} width={30} className="w-6 h-6" alt={title} />
                                    </div>
                                    <h2 className="text-lg text-pink-500 font-medium title-font mb-2">{title}</h2>
                                    <p className="leading-relaxed text-base">{description}</p>
                                </div>
                            </div>)}
                        </div>
                        <Link href="#buy" className="w-[20%] flex mx-auto mt-16 btn btn-primary border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</Link>
                    </div>
                </section>
                {/* End Content */}


                {/* Pricing Start*/}
                <section id="buy">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-pink-500">Designed for business teams like yours</h2>
                            <p className="mb-5 font-light">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                        </div>
                        <div className="space-y-8 lg:grid sm:gap-6 xl:gap-10 lg:space-y-0 justify-center justify-items-center items-center">
                            {/* <!-- Pricing Card --> */}
                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 bg-base-100">
                                <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next home.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">${price}</span>
                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                </div>
                                {/* <!-- List --> */}
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    {featured.map(({ title }) => <li key={title} className="flex items-center space-x-3">
                                        {/* <!-- Icon --> */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>{title}</span>
                                    </li>)}
                                </ul>
                                <BuyProduct product={product} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Pricing End*/}


                {/*Start  Accordion */}
                <div className="my-10 !container space-y-5">

                    {qna.map(({ answer, question }, index) => <div key={question} className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" defaultChecked={index === 0 ? true : false} />
                        <div className="collapse-title text-xl font-medium">
                            {question}
                        </div>
                        <div className="collapse-content">
                            <p>{answer}</p>
                        </div>
                    </div>)}

                </div>
                {/*End Accordion */}

            </main>


        </>
    );
}