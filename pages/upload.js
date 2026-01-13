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

        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>Step 2: Review & Save</h3>
          <label>Recipe Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grandma's Apple Pie" />

          <label>Prep Time</label>
          <input type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="e.g. 45 mins" />

          <label>Ingredients (one per line)</label>
          <textarea rows="6" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />

          <label>Instructions</label>
          <textarea rows="6" value={instructions} onChange={(e) => setInstructions(e.target.value)} />

          <button type="button" onClick={() => alert('Save to DB logic goes here!')} style={{ marginTop: '20px', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
            Save to Cookbook
          </button>
        </div>
      </form>
    </div>
  );
}
