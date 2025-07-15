import axios from 'axios';
import { notFound } from 'next/navigation';

// Fungsi untuk mengambil data satu resep
async function getRecipe(id) {
  try {
    const response = await axios.get(`http://localhost:4000/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    // Jika resep tidak ditemukan (error 404), panggil notFound()
    if (error.response && error.response.status === 404) {
      notFound();
    }
    console.error("Gagal mengambil detail resep:", error);
    return null;
  }
}

// Halaman ini adalah Server Component
export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    return <p className="text-center mt-12">Tidak bisa memuat resep.</p>;
  }

  return (
    <div className="container mx-auto max-w-3xl p-4 mt-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">Oleh: {recipe.author.name || 'Anonim'}</p>
      <img 
        src={recipe.imageUrl || 'https://placehold.co/1200x600?text=Resep'} 
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
      />
      <div className="prose max-w-none">
        <p>{recipe.description}</p>
      </div>
    </div>
  );
}