import Link from 'next/link';

// Definisikan tipe untuk resep
type Recipe = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  author: {
    name: string | null;
  };
};

// Komponen menerima satu 'recipe' sebagai prop
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow h-full">
        <img 
          src={recipe.imageUrl || 'https://placehold.co/600x400?text=Resep'} 
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-2">
          <h3 className="text-xl font-semibold mt-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm">by {recipe.author.name || 'Anonim'}</p>
          <p className="mt-2 text-gray-700">{recipe.description.substring(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
}