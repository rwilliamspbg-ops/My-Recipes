import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ShoppingList() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
        generateShoppingList(data);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateShoppingList = (recipesData) => {
    const ingredientsMap = {};
    recipesData.forEach(recipe => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(ingredient => {
          ingredientsMap[ingredient] = (ingredientsMap[ingredient] || 0) + 1;
        });
      }
    });
    const list = Object.entries(ingredientsMap).map(([ingredient, count]) => ({ ingredient, count }));
    setShoppingList(list);
  };

  return (
    <>
      <Head><title>Shopping List | My Recipe Cookbook</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <header className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Shopping List</h1>
              <Link href="/"><button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold">Back to Home</button></Link>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Consolidated Ingredients</h2>
              <span className="text-sm text-gray-500">{recipes.length} recipes</span>
            </div>
            {loading && <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div></div>}
            {!loading && shoppingList.length === 0 && <div className="text-center py-12"><p className="text-gray-600">No ingredients yet</p></div>}
            {!loading && shoppingList.length > 0 && (
              <div className="space-y-3">
                {shoppingList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-800 font-medium">{item.ingredient}</span>
                    {item.count > 1 && <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">x{item.count}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
