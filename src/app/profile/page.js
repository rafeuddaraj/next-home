

export default function page() {
    return (
        <>


            <main className="my-10">
                <section className="!container">
                    <div className="flex justify-between">
                        <div className="sidebar w-[25%]">
                            <ul>
                                <li className="hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm">Profile</li>
                                <li className="hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm">Password</li>
                                <li className="hover:bg-gray-600/40 border border-transparent hover:border hover:border-green-400 duration-200 py-5 px-4 rounded-sm">Transaction</li>
                            </ul>
                        </div>
                        <div className="content w-[70%]">
                            <div className="py-5">
                                <div className="w-full">
                                    <h2>Avatar image</h2>
                                    <div className="mx-auto mb-5 flex flex-row items-center bg-neutral-100 py-5 lg:mx-0 lg:w-1/2">
                                        <img
                                            className="ml-5 h-20 w-20 rounded-full"
                                            src={
                                                "https://i.ibb.co/hV3TMVY/avatar-nobody.png"
                                            }
                                            alt="Sarah Johnson image"
                                        />

                                        <form>
                                            <div>
                                                <label className="block">
                                                    <span className="sr-only">
                                                        Choose profile photo
                                                    </span>
                                                    <input
                                                        type="file"
                                                        className="mx-auto ml-5 flex w-full justify-center border-yellow-400 text-sm outline-none file:mr-4 file:bg-amber-400 file:py-2 file:px-4 file:text-sm file:font-semibold"

                                                    />
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <form className="flex w-full flex-col gap-3" action="">
                                    <div className="flex w-full flex-col">
                                        <label className="flex" htmlFor="name">
                                            Name
                                            <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                                        </label>
                                        <input
                                            className="w-full border px-4 py-2 lg:w-1/2"
                                            type="text"
                                            placeholder="Sarah"
                                        />
                                    </div>

                                    <div className="flex w-full flex-col">
                                        <label className="flex" htmlFor="name">
                                            Email
                                            <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                                        </label>
                                        <input
                                            className="w-full border px-4 py-2 lg:w-1/2"
                                            type="email"
                                            placeholder="Johnson"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}