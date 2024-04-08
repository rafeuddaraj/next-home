import Products from "../Products/Products";
import Animate from "../UI/Animate";
import ContactUs from "./ContactUs";
import Overview from "./Overview";


export default function Landing() {
    return (
        <>
            {/* Hero Start */}
            <div className="hero min-h-screen bg-contain" style={{ backgroundImage: 'url(/hero.jpg)' }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-5xl">
                        <h1 className="mb-5 text-2xl md:text-5xl font-bold text-[#FF00D3]">Transform Your Space. Simplify Your Life. Introducing Next Home.</h1>
                        <p className="mb-5 max-w-2xl mx-auto text-white text:md md:text-lg my-5">Next Home is your all-in-one home automation software and IoT platform. Effortlessly control your lights, thermostats, appliances, and more from a single, intuitive app. Next Home creates a seamless, personalized living experience that saves you time and energy.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            {/* Hero End */}
            <main className="container">

                <Overview />


                {/* Start Featured */}
                <Animate>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="text-center mb-20">
                                <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-[#FF00D3] mb-4">Command Your Home with Ease</h1>
                                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Next Home puts the power of your smart home at your fingertips. Control lights, thermostats, appliances, and more from a single, user-friendly app. No complex setups, just effortless control.</p>
                            </div>
                            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Authentic Cliche Forage</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Kinfolk Chips Snackwave</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Coloring Book Ethical</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Typewriter Polaroid Cray</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Pack Truffaut Blue</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:w-1/2 w-full">
                                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">The Catcher In The Rye</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Animate>
                {/* End Featured */}

                {/* Start Products */}
                <Animate>
                    <section className="my-10">
                        <div className="my-5 text-center space-y-10 mb-20">
                            <div className="divider text-4xl font-bold text-[#FF00D3]">Products</div>
                        </div>
                        <Products />
                    </section>
                </Animate>
                {/* End Products */}


                {/* Start Testimonial */}
                <Animate>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                </svg>
                                <p className="leading-relaxed text-lg">I've always loved having fresh flowers in my home, but I often struggle to keep them alive. I'm either too busy to water them regularly, or I forget altogether. That's why I was so excited to try the IOT Flower Watering System.

                                    This system is a lifesaver for busy plant parents like me. It uses a soil moisture sensor to monitor the water levels in your plants' pots, and then automatically waters them when needed. You can set the system to water your plants on a schedule, or you can water them manually using the included app.

                                    The IOT Flower Watering System is easy to set up and use. I simply plugged the base unit into an outlet, placed the sensors in my plants' pots, and downloaded the app. The app is very user-friendly, and it allows me to see the water levels in all of my plants at a glance.

                                    I've been using the IOT Flower Watering System for a few weeks now, and I'm very impressed with it. My plants have never looked healthier, and I have peace of mind knowing that they're always getting the water they need.</p>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
                                <h2 className="text-gray-900 dark:text-white font-medium title-font tracking-wider text-sm">Rafe Uddaraj</h2>
                                <p className="text-gray-500 dark:text-white">Full Stack Developer</p>
                            </div>
                        </div>
                    </section>
                </Animate>
                {/* End Testimonial */}

                {/* Start Contact */}
                <Animate>
                    <ContactUs />
                </Animate>
                {/* End Contact */}

            </main>

        </>
    );
}