"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient'; // Impor supabase client

export default function CreateRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null); // State untuk file
  const [error, setError] = useState('');

  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files?.[0] || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Silakan pilih sebuah gambar.');
      return;
    }
    setError('');

    try {
      // 1. Upload gambar ke Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('recipe-images') // Nama bucket Anda
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Dapatkan URL publik dari gambar yang di-upload
      const { data: { publicUrl } } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(fileName);

      // 3. Kirim data resep (termasuk URL gambar) ke backend Anda
      await axios.post('http://localhost:4000/api/recipes', {
        title,
        description,
        imageUrl: publicUrl,
      });

      router.push('/');
    } catch (err) {
      setError('Gagal membuat resep.');
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-12">Loading...</p>;
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Buat Resep Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Judul Resep</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Gambar Resep</label>
          {/* Ganti input type="url" menjadi type="file" */}
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Simpan Resep
        </button>
      </form>
    </div>
  );
}