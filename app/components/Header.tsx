"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          RecipeApp
        </Link>
        <div className="space-x-4">
          {token ? (
            // Jika sudah login
            <>
              <Link href="/recipes/new" className="text-gray-600 hover:text-blue-600">Buat Resep</Link>
              <button onClick={logout} className="text-gray-600 hover:text-blue-600">Logout</button>
            </>
          ) : (
            // Jika belum login
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link href="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}