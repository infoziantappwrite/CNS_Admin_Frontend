import { useState, useEffect } from 'react';

import icon from '../assets/images/logo/icon.png'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     setError('');

    try {
      const response = await axios.post('https://cns-admin-production.up.railway.app/api/v1/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        navigate('/dashboard'); // go to dashboard
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  
  useEffect(() => {
  if (localStorage.getItem('token')) {
    navigate('/dashboard');
  }
}, []);


  return (
    <div className="min-h-screen rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#5f737a] to-[#013243]  px-4 mt-2 mb-2">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
        
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-3">
            <img src={icon} alt="Icon" className="w-20 h-20" />
          </div>
          <p className="mt-3 text-sm italic text-gray-600 text-center max-w-xs">
            “Access your world. Securely. Simply. Swiftly.”
          </p>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#022C3A] mb-6">Admin Panel Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013243]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013243]"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#013243] text-white font-semibold py-2 rounded-md hover:bg-[#01485e] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
