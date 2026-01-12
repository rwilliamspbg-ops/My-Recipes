import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>My Recipe Cookbook</title>
        <meta name="description" content="Your personal recipe collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  🍳 My Recipe Cookbook
                </h1>
                <p className="text-gray-600 mt-1">Your personal collection of delicious recipes</p>
              </div>
              <div className="flex gap-3">
                <Link href="/upload">
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    📤 Upload Recipe
                  </button>
                </Link>
                <Link href="/shopping-list">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    🛒 Shopping List
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="🔍 Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-purple-200 focus:border-purple-400 focus:outline-none shadow-md transition-all"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && recipes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No recipes yet!</h2>
              <p className="text-gray-500 mb-6">Start building your cookbook by uploading your first recipe.</p>
              <Link href="/upload">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Upload Your First Recipe
                </button>
              </Link>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && filteredRecipes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Recipe Card Header */}
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-4">
                    <h3 className="text-xl font-bold text-white truncate">{recipe.title}</h3>
                  </div>

                  {/* Recipe Details */}
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <span className="text-2xl mr-2">⏱️</span>
                        <div>
                          <p className="text-xs text-gray-500">Prep Time</p>
                          <p className="font-semibold">{recipe.prep_time || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="text-2xl mr-2">🍽️</span>
                        <div>
                          <p className="text-xs text-gray-500">Servings</p>
                          <p className="font-semibold">{recipe.servings || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600">
                        <span className="text-2xl mr-2">🔥</span>
                        <div>
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-semibold">{recipe.calories_per_serving || 'N/A'} cal</p>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients Preview */}
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Ingredients:</p>
                        <p className="text-sm text-gray-700 truncate">
                          {recipe.ingredients.slice(0, 2).join(', ')}
                          {recipe.ingredients.length > 2 && '...'}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link href={`/recipe/${recipe.id}`} className="flex-1">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                          View Recipe
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 hover:shadow-lg transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && recipes.length > 0 && filteredRecipes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No recipes found</h2>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white mt-16 py-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p>Made with ❤️ for food lovers | {recipes.length} recipes in your cookbook</p>
          </div>
        </footer>
      </div>
    </>
  );
}
