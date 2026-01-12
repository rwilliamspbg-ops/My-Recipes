// API route for getting all recipes and creating new ones
export default async function handler(req, res) {
  const { method } = req;

  // For now, return mock data since we don't have the database connection set up yet
  if (method === 'GET') {
    try {
      // This would normally fetch from your database
      // For now, return an empty array
      return res.status(200).json([]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }

  if (method === 'POST') {
    try {
      // This would normally save to your database
      const recipeData = req.body;
      
      // For now, just return the data with a mock ID
      return res.status(201).json({ 
        id: Date.now(), 
        ...recipeData 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create recipe' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${method} not allowed` });
}
