import axios from 'axios';
import RecipeCard from './components/RecipeCard';

// 1. Definisikan tipe untuk satu objek Recipe
type Recipe = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  author: {
    name: string | null;
  };
};

// Fungsi untuk mengambil data resep dari backend
async function getRecipes() {
  try {
    // 2. Gunakan Environment Variable untuk URL API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/recipes`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil resep:", error);
    return [];
  }
}

// Halaman ini adalah Server Component
export default async function HomePage() {
  const recipes = await getRecipes();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Jelajahi Resep</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          // 3. Tambahkan tipe : Recipe di sini
          recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center col-span-3">Belum ada resep yang tersedia.</p>
        )}
      </div>
    </main>
  );
}