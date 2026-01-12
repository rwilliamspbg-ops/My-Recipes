// API route for individual recipe operations (GET, PUT, DELETE)
export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  // Validate ID
  if (!id) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  // GET - Get a single recipe by ID
  if (method === 'GET') {
    try {
      // This would normally fetch from your database
      return res.status(200).json({ 
        id,
        title: 'Sample Recipe',
        message: 'Database connection needed' 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  }

  // DELETE - Delete a recipe
  if (method === 'DELETE') {
    try {
      // This would normally delete from your database
      return res.status(200).json({ 
        success: true,
        message: `Recipe ${id} deleted successfully` 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }
  }

  // PUT - Update a recipe
  if (method === 'PUT') {
    try {
      const recipeData = req.body;
      // This would normally update in your database
      return res.status(200).json({ 
        id,
        ...recipeData,
        message: 'Recipe updated successfully' 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update recipe' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${method} not allowed` });
}
