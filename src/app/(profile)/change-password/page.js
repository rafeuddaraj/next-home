export function generateMetadata() {
    return {
        title: "Change Password"
    }
}

export default function Password() {
    return (
        <>
            <div className="content w-[70%]">
                <form className="flex w-full flex-col gap-3" action="">
                    <h2 className="text-4xl text-pink-500">This page is still development mode</h2>
                    <div className="flex w-full flex-col">
                        <label className="flex" htmlFor="name">
                            Current password
                            <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                        </label>
                        <input
                            className="w-full border px-4 py-2 lg:w-1/2"
                            type="password"
                            placeholder=""
                        />
                    </div>

                    <div className="flex w-full flex-col">
                        <label className="flex" htmlFor="name">
                            New Password
                            <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                        </label>
                        <input
                            className="w-full border px-4 py-2 lg:w-1/2"
                            type="password"
                            placeholder=""
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="flex" htmlFor="">
                            Repeat New Password
                            <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                        </label>
                        <input
                            className="w-full border px-4 py-2 lg:w-1/2"
                            type="password"
                            placeholder=""
                        />
                    </div>

                    <button className="mt-4 w-40 bg-violet-900 px-4 py-2 text-white">
                        Save changes
                    </button>
                </form>
            </div>
        </>
    );
}