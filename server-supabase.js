const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ SUPABASE_URL et SUPABASE_KEY doivent être définis dans les variables d\'environnement');
  console.log('📝 Voir SUPABASE-SETUP.md pour les instructions de configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialisé');

// ==================== FORMATEURS ====================

app.get('/api/formateurs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('formateurs')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

    // Parse formations JSON si c'est une chaîne
    const formateurs = data.map(row => ({
      ...row,
      formations: typeof row.formations === 'string' ? JSON.parse(row.formations) : row.formations || []
    }));

    res.json(formateurs);
  } catch (error) {
    console.error('Erreur GET formateurs:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/formateurs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('formateurs')
      .insert([{
        formateur: req.body.formateur || '',
        formations: req.body.formations || [],
        type: req.body.type || '',
        tarif: req.body.tarif || '',
        dossiers: req.body.dossiers || 0,
        note: req.body.note || 0,
        contrat: req.body.contrat || '',
        meet: req.body.meet || '',
        linkedin: req.body.linkedin || '',
        observations: req.body.observations || '',
        notes: req.body.notes || ''
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur POST formateur:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/formateurs/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('formateurs')
      .update({
        formateur: req.body.formateur || '',
        formations: req.body.formations || [],
        type: req.body.type || '',
        tarif: req.body.tarif || '',
        dossiers: req.body.dossiers || 0,
        note: req.body.note || 0,
        contrat: req.body.contrat || '',
        meet: req.body.meet || '',
        linkedin: req.body.linkedin || '',
        observations: req.body.observations || '',
        notes: req.body.notes || '',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur PUT formateur:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/formateurs/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('formateurs')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (error) {
    console.error('Erreur DELETE formateur:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== CANDIDATS ====================

app.get('/api/candidats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('candidats')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur GET candidats:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/candidats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('candidats')
      .insert([{
        nom: req.body.nom || '',
        formation: req.body.formation || '',
        type: req.body.type || '',
        source: req.body.source || '',
        statut: req.body.statut || '',
        tarif: req.body.tarif || '',
        nda: req.body.nda || '',
        cv: req.body.cv || '',
        linkedin: req.body.linkedin || '',
        observations: req.body.observations || '',
        notes: req.body.notes || ''
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur POST candidat:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/candidats/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('candidats')
      .update({
        nom: req.body.nom || '',
        formation: req.body.formation || '',
        type: req.body.type || '',
        source: req.body.source || '',
        statut: req.body.statut || '',
        tarif: req.body.tarif || '',
        nda: req.body.nda || '',
        cv: req.body.cv || '',
        linkedin: req.body.linkedin || '',
        observations: req.body.observations || '',
        notes: req.body.notes || '',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur PUT candidat:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/candidats/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('candidats')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (error) {
    console.error('Erreur DELETE candidat:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== BESOINS ====================

app.get('/api/besoins', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('besoins')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur GET besoins:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/besoins', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('besoins')
      .insert([{
        thematique: req.body.thematique || '',
        type: req.body.type || '',
        priorite: req.body.priorite || 'moyenne',
        observations: req.body.observations || ''
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur POST besoin:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/besoins/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('besoins')
      .update({
        thematique: req.body.thematique || '',
        type: req.body.type || '',
        priorite: req.body.priorite || 'moyenne',
        observations: req.body.observations || '',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erreur PUT besoin:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/besoins/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('besoins')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (error) {
    console.error('Erreur DELETE besoin:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 http://localhost:${PORT}`);
  console.log(`🗄️ Connected to Supabase: ${supabaseUrl}`);
});
