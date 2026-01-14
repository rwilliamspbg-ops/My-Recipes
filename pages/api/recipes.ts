import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db'; // Adjust this path to your db folder
import { recipes } from '../../lib/db/schema'; // Adjust this path to your schema

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Fetch all recipes from the database
    const allRecipes = await db.select().from(recipes);
    
    // 2. Return the array of recipes
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}
