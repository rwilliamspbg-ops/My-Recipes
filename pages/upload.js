import { useState } from 'react';
import Link from 'next/link';

export default function UploadRecipe() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State for parsed recipe data
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');

  // Step 1: Handle AI PDF Parsing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('Parsing PDF with AI...');

    const formData = new FormData(e.target);
    const file = formData.get('recipeFile');

    try {
      const response = await fetch('/api/parse-recipe', {
        method: 'POST',
        body: file,
        headers: { 'Content-Type': 'application/pdf' },
      });

      if (!response.ok) throw new Error('Failed to parse recipe');

      const data = await response.json();
      
      // Auto-fill the form fields with parsed data
      setTitle(data.title || '');
      setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join('\n') : data.ingredients || '');
      setInstructions(Array.isArray(data.instructions) ? data.instructions.join('\n') : data.instructions || '');
      setPrepTime(data.prepTime || '');
      
      setMessage('Success! Please review the details below.');
    } catch (_error) {
      console.error(_error);
      setMessage('Error parsing PDF. You can still enter details manually.');
    } finally {
      setUploading(false);
    }
  };

  // Step 2: Handle Saving to Database
  const handleSave = async () => {
    if (!title) {
      setMessage('Error: Please enter a recipe title.');
      return;
    }

    setUploading(true);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          prepTime,
          // Split multiline text back into arrays for the DB
          ingredients: ingredients.split('\n').filter(i => i.trim()),
          instructions: instructions.split('\n').filter(i => i.trim()),
        }),
      });

      if (response.ok) {
        setMessage('Success! Recipe saved to your cookbook.');
        // Clear the form
        setTitle('');
        setIngredients('');
        setInstructions('');
        setPrepTime('');
      } else {
        throw new Error('Failed to save');
      }
    } catch (_error) {
      setMessage('Error saving to database.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📤 Upload Recipe</h1>
      <Link href="/">← Back to Home</Link>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>Step 1: Upload PDF</h3>
          <input type="file" name="recipeFile" accept="application/pdf" required />
          <button type="submit" disabled={uploading} style={{ marginLeft: '10px' }}>
            {uploading ? 'Processing...' : 'Parse with AI'}
          </button>
        </div>

        {message && (
          <p style={{ color: message.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
            {message}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <h3>Step 2: Review & Save</h3>
          
          <label>Recipe Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Grandma's Apple Pie" 
            style={{ padding: '8px' }}
          />

          <label>Prep Time</label>
          <input 
            type="text" 
            value={prepTime} 
            onChange={(e) => setPrepTime(e.target.value)} 
            placeholder="e.g. 45 mins" 
            style={{ padding: '8px' }}
          />

          <label>Ingredients (one per line)</label>
          <textarea 
            rows="6" 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
            style={{ padding: '8px' }}
          />

          <label>Instructions (one per line)</label>
          <textarea 
            rows="6" 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
            style={{ padding: '8px' }}
          />

          <button 
            type="button" 
            onClick={handleSave} 
            disabled={uploading}
            style={{ 
              marginTop: '20px', 
              padding: '12px', 
              background: '#0070f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: uploading ? 'not-allowed' : 'pointer'
            }}
          >
            {uploading ? 'Saving...' : '💾 Save to Cookbook'}
          </button>
        </div>
      </form>
    </div>
  );
}
