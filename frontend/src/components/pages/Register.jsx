import React from "react";

const Register = () => {
    return(
        <>
            <div className=' h-screen w-screen flex justify-center items-center bg-slate-900'>
                <div className="bg-slate-700 h-3/4 w-96 rounded-md flex justify-center items-center">
                    <div className="flex justify-center items-center flex-col">
                        <form className="flex justify-center items-center flex-col">
                            <input type="text" 
                            placeholder="john" 
                            className="mb-2 p-2 rounded bg-slate-500 text-white active:border-none focus:outline-none"
                            required/>

                            <input type="email" 
                            placeholder="john@example.com" 
                            className="mb-2 p-2 rounded bg-slate-500 text-white active:border-none focus:outline-none"
                            required/>

                            <input type="password" 
                            placeholder="********" 
                            className="mb-2 p-2 rounded bg-slate-500 text-white active:border-none focus:outline-none"
                            required/>

                            <button className="w-1/2 bg-blue-500 text-white p-2 rounded">
                                Register
                            </button>
                        </form>
                        <span className="mt-12 text-white">Already have an account? <a className="text-blue-400" href="http://">login</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;