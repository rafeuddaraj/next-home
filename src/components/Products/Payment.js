

export default function Payment() {
    return (
        <>
            <div className="flex min-h-screen justify-center items-center">
                <div className="h-auto w-80 bg-base-200 p-3 rounded-lg space-y-10">
                    <p className="text-xl font-semibold py-5">Payment Details</p>
                    <div className="input_text mt-6 relative">
                        <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="Rafe Uddaraj" />
                        <span className="absolute left-0 text-sm -top-[30px]">Your Name</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                    </div>
                    <div className="input_text mt-6 relative">
                        <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="test@email.com" />
                        <span className="absolute left-0 text-sm -top-[30px]">Logged User Email</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                    </div>
                    <div className="input_text mt-6 relative">
                        <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="XD5278656" />
                        <span className="absolute left-0 text-sm -top-[30px]">Transaction ID</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                    </div>
                    <div className="input_text mt-6 relative">
                        <select className="p-2 block rounded w-full">
                            <option value="" hidden>Select Payment Getway</option>
                            <option value="bkash">Bkash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                        </select>
                        <span className="absolute left-0 text-sm -top-[30px]">Payment Method</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
                    </div>
                </div>
                <p className="text-lg text-center mt-4 text-gray-600 font-semibold">Payment amount:$12.98</p>
                <div className="flex justify-center mt-4"> <button className="outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all">Pay</button>
                </div>
            </div>
        </>
    );
}