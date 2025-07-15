import axios from 'axios';
import RecipeCard from './components/RecipeCard';

// Fungsi untuk mengambil data resep dari backend
async function getRecipes() {
  try {
    const response = await axios.get('http://localhost:4000/api/recipes');
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil resep:", error);
    return []; // Kembalikan array kosong jika gagal
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
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center col-span-3">Belum ada resep yang tersedia.</p>
        )}
      </div>
    </main>
  );
}