import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      if (response.ok) setRecipe(await response.json());
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div></div>;
  if (!recipe) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h1><Link href="/"><button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg">Back to Home</button></Link></div></div>;

  return (
    <>
      <Head><title>{recipe.title} | My Recipe Cookbook</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <header className="bg-white shadow-md"><div className="max-w-4xl mx-auto px-4 py-6"><Link href="/"><button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold">Back to Home</button></Link></div></header>
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-6">{recipe.title}</h1>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Prep Time</p><p className="text-xl font-semibold text-gray-800">{recipe.prep_time || 'N/A'}</p></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Servings</p><p className="text-xl font-semibold text-gray-800">{recipe.servings || 'N/A'}</p></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Calories</p><p className="text-xl font-semibold text-gray-800">{recipe.calories_per_serving || 'N/A'}</p></div>
            </div>
            {recipe.ingredients && recipe.ingredients.length > 0 && <div className="mb-8"><h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2><ul className="space-y-2">{recipe.ingredients.map((ingredient, index) => <li key={index} className="flex items-center text-gray-700"><span className="mr-2">•</span>{ingredient}</li>)}</ul></div>}
            {recipe.instructions && <div><h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2><p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p></div>}
          </div>
        </main>
      </div>
    </>
  );
}
