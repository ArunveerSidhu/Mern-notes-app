import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center bg-[#F5E6D3]'>
        <div className="bg-[#FFF5E4] h-3/4 w-96 rounded-2xl flex justify-center items-center shadow-lg border border-[#E7C8A0]">
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-[#8B7355] text-2xl font-semibold mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-72">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="mb-4 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                         border border-[#E7C8A0] placeholder-[#B4A390]
                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                         transition duration-200"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mb-6 p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355] w-full
                         border border-[#E7C8A0] placeholder-[#B4A390]
                         focus:outline-none focus:border-[#B4A390] focus:ring-1 focus:ring-[#B4A390]
                         transition duration-200"
              />
              <button 
                type="submit" 
                className="w-full bg-[#E7C8A0] text-[#8B7355] p-3 rounded-lg
                        font-semibold hover:bg-[#DEB887] transition duration-200
                        shadow-sm"
              >
                Login
              </button>
            </form>
            <span className="mt-8 text-[#8B7355]">
              Don't have an account? {" "}
              <a 
                className="text-[#BE8C63] hover:text-[#A67B5B] font-medium transition duration-200" 
                href="/register"
              >
                Register
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;