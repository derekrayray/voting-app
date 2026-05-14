import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function entry point
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nominee_name } = req.body;

  if (!nominee_name) {
    return res.status(400).json({ error: 'Missing nominee_name' });
  }

  // Initialize Supabase client inside the handler
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing Supabase credentials' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data, error } = await supabase
      .from('votes')
      .insert([{ nominee_name }]);

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Failed to submit vote', details: error.message || error });
  }
}
