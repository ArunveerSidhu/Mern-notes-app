import React from "react";

const Register = () => {
    return(
        <>
            <div className='h-screen w-screen flex justify-center items-center bg-[#F5E6D3]'>
                <div className="bg-[#FFF5E4] h-3/4 w-96 rounded-2xl flex justify-center items-center shadow-lg border border-[#E7C8A0]">
                    <div className="flex justify-center items-center flex-col">
                        <h2 className="text-[#8B7355] text-2xl font-semibold mb-6">Create Account</h2>
                        <form className="flex justify-center items-center flex-col w-72">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="mb-4 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="mb-4 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="mb-6 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <button className="w-full bg-[#E7C8A0] text-[#8B7355] p-3 rounded-lg
                                           font-semibold hover:bg-[#DEB887] transition duration-200
                                           shadow-sm">
                                Register
                            </button>
                        </form>
                        <span className="mt-8 text-[#8B7355]">
                            Already have an account? {" "}
                            <a className="text-[#BE8C63] hover:text-[#A67B5B] font-medium transition duration-200" 
                               href="/login">
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;