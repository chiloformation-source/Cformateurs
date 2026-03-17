import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const [formateurs, candidats, besoins] = await Promise.all([
                supabase.from('formateurs').select('*').order('id'),
                supabase.from('candidats').select('*').order('id'),
                supabase.from('besoins').select('*').order('id')
            ]);

            return res.status(200).json({
                formateurs: formateurs.data || [],
                candidats: candidats.data || [],
                besoins: besoins.data || []
            });
        } catch (error) {
            console.error('Erreur GET:', error);
            return res.status(500).json({ error: error.message });
        }
    } 
    
    if (req.method === 'POST') {
        try {
            const { formateurs, candidats, besoins } = req.body;

            await Promise.all([
                supabase.from('formateurs').delete().neq('id', 0),
                supabase.from('candidats').delete().neq('id', 0),
                supabase.from('besoins').delete().neq('id', 0)
            ]);

            await Promise.all([
                formateurs.length > 0 ? supabase.from('formateurs').insert(formateurs) : Promise.resolve(),
                candidats.length > 0 ? supabase.from('candidats').insert(candidats) : Promise.resolve(),
                besoins.length > 0 ? supabase.from('besoins').insert(besoins) : Promise.resolve()
            ]);

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Erreur POST:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
