"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
      });
      
      login(response.data.token);
      router.push('/');
    } catch (err) {
      setError('Gagal login. Periksa kembali email dan password Anda.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-sm p-4 mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Login
        </button>
        <p className="text-center text-sm">
          Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar di sini</Link>
        </p>
      </form>
    </div>
  );
}