"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:4000/api/users/register', {
        name,
        email,
        password,
      });
      alert('Pendaftaran berhasil! Silakan login.');
      router.push('/login');
    } catch (err) {
      setError('Gagal mendaftar. Email mungkin sudah digunakan.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-sm p-4 mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Buat Akun</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
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
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Daftar
        </button>
        <p className="text-center text-sm">
          Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline">Login di sini</Link>
        </p>
      </form>
    </div>
  );
}