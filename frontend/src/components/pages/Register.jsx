import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', formData);
            console.log('Registration successful:', response.data);
            window.location.href = '/login';
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            console.error('Registration error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <div className='h-screen w-screen flex justify-center items-center bg-[#F5E6D3]'>
                <div className="bg-[#FFF5E4] h-3/4 w-96 rounded-2xl flex justify-center items-center shadow-lg border border-[#E7C8A0]">
                    <div className="flex justify-center items-center flex-col">
                        <h2 className="text-[#8B7355] text-2xl font-semibold mb-6">Create Account</h2>
                        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-72">
                            <input 
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username" 
                                className="mb-4 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address" 
                                className="mb-4 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password" 
                                className="mb-6 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                                         transition duration-200"
                                required
                            />

                            <button 
                                type="submit"
                                className="w-full bg-[#E7C8A0] text-[#8B7355] p-3 rounded-lg
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
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        {loading && <div className="text-[#8B7355] mb-4">Loading...</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;