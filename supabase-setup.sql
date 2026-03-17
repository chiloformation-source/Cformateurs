-- ============================================
-- SCRIPT SQL POUR SUPABASE
-- Dashboard Formateurs - Configuration complète
-- ============================================

-- 1. SUPPRESSION DES TABLES EXISTANTES (si nécessaire)
DROP TABLE IF EXISTS formateurs CASCADE;
DROP TABLE IF EXISTS candidats CASCADE;
DROP TABLE IF EXISTS besoins CASCADE;

-- 2. CRÉATION DES TABLES

-- Table formateurs
CREATE TABLE formateurs (
  id BIGSERIAL PRIMARY KEY,
  formateur TEXT NOT NULL,
  formations JSONB DEFAULT '[]'::jsonb,
  type TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  tarif TEXT,
  dossiers INTEGER DEFAULT 0,
  note NUMERIC(3,1) DEFAULT 0 CHECK (note >= 0 AND note <= 5),
  contrat TEXT,
  calendly TEXT DEFAULT 'désactivé' CHECK (calendly IN ('ok', 'ko', 'désactivé')),
  meet TEXT,
  linkedin TEXT,
  observations TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table candidats
CREATE TABLE candidats (
  id BIGSERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  telephone TEXT,
  formation TEXT,
  type TEXT,
  source TEXT,
  statut TEXT,
  tarif TEXT,
  nda TEXT CHECK (nda IN ('oui', 'non', 'en cours')),
  cv TEXT,
  linkedin TEXT,
  observations TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table besoins
CREATE TABLE besoins (
  id BIGSERIAL PRIMARY KEY,
  thematique TEXT NOT NULL,
  type TEXT,
  priorite TEXT DEFAULT 'moyenne' CHECK (priorite IN ('élevée', 'moyenne', 'faible')),
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INDEX POUR AMÉLIORER LES PERFORMANCES

CREATE INDEX idx_formateurs_type ON formateurs(type);
CREATE INDEX idx_formateurs_contrat ON formateurs(contrat);
CREATE INDEX idx_formateurs_calendly ON formateurs(calendly);
CREATE INDEX idx_formateurs_created_at ON formateurs(created_at DESC);

CREATE INDEX idx_candidats_statut ON candidats(statut);
CREATE INDEX idx_candidats_nda ON candidats(nda);
CREATE INDEX idx_candidats_type ON candidats(type);
CREATE INDEX idx_candidats_created_at ON candidats(created_at DESC);

CREATE INDEX idx_besoins_priorite ON besoins(priorite);
CREATE INDEX idx_besoins_type ON besoins(type);
CREATE INDEX idx_besoins_created_at ON besoins(created_at DESC);

-- 4. FONCTION POUR METTRE À JOUR updated_at AUTOMATIQUEMENT

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. TRIGGERS POUR updated_at

CREATE TRIGGER update_formateurs_updated_at
    BEFORE UPDATE ON formateurs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidats_updated_at
    BEFORE UPDATE ON candidats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_besoins_updated_at
    BEFORE UPDATE ON besoins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. ACTIVER ROW LEVEL SECURITY (RLS)

ALTER TABLE formateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidats ENABLE ROW LEVEL SECURITY;
ALTER TABLE besoins ENABLE ROW LEVEL SECURITY;

-- 7. POLITIQUES D'ACCÈS

-- OPTION A : Accès public (pour commencer, NON RECOMMANDÉ pour la production)
CREATE POLICY "Enable all access for formateurs" ON formateurs
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for candidats" ON candidats
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for besoins" ON besoins
    FOR ALL USING (true) WITH CHECK (true);

-- OPTION B : Accès authentifié uniquement (RECOMMANDÉ pour la production)
-- Décommentez ces lignes et supprimez les politiques ci-dessus
/*
CREATE POLICY "Authenticated users can view formateurs" ON formateurs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert formateurs" ON formateurs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update formateurs" ON formateurs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete formateurs" ON formateurs
    FOR DELETE USING (auth.role() = 'authenticated');

-- Répétez pour candidats et besoins...
*/

-- 8. DONNÉES D'EXEMPLE (optionnel)

INSERT INTO formateurs (formateur, formations, type, tags, tarif, dossiers, note, contrat, calendly, meet, linkedin, observations) VALUES
('Marie Dubois', '["Excel", "PowerPoint", "Word"]'::jsonb, 'bureautique', '["Expert", "Certifiée"]'::jsonb, '450€/jour', 25, 4.8, 'cdi', 'ok', 'https://meet.google.com/abc', 'https://linkedin.com/in/mariedubois', 'Excellente pédagogie'),
('Jean Martin', '["Anglais", "Espagnol"]'::jsonb, 'langues', '["Natif", "Bilingue"]'::jsonb, '60€/h', 18, 4.5, 'sous-traitant', 'ok', '', 'https://linkedin.com/in/jeanmartin', 'Spécialisé en anglais professionnel'),
('Sophie Laurent', '["Photoshop", "Illustrator", "InDesign"]'::jsonb, 'autre', '["Expert"]'::jsonb, '500€/jour', 12, 4.9, 'cdd', 'ko', 'https://meet.google.com/xyz', 'https://linkedin.com/in/sophielaurent', 'Experte en design graphique'),
('Thomas Petit', '["Python", "JavaScript", "SQL"]'::jsonb, 'autre', '["Expert", "Senior"]'::jsonb, '600€/jour', 30, 5.0, 'sous-traitant', 'ok', 'https://meet.google.com/dev', 'https://linkedin.com/in/thomaspetit', 'Développeur senior'),
('Emma Rousseau', '["Allemand", "Italien"]'::jsonb, 'langues', '["Natif"]'::jsonb, '55€/h', 14, 4.6, 'cdi', 'désactivé', '', '', 'Native speaker allemand'),
('Lucas Moreau', '["Excel avancé", "Power BI", "Tableau"]'::jsonb, 'bureautique', '["Expert", "Data"]'::jsonb, '520€/jour', 22, 4.7, 'sous-traitant', 'ok', 'https://meet.google.com/data', 'https://linkedin.com/in/lucasmoreau', 'Expert en data visualization');

INSERT INTO candidats (nom, telephone, formation, type, source, statut, tarif, nda, cv, linkedin, observations) VALUES
('Pierre Durand', '06 12 34 56 78', 'Excel', 'bureautique', 'LinkedIn', 'en échange', '400€/jour', 'non', 'CV_Pierre_Durand.pdf', 'https://linkedin.com/in/pierredurand', 'Profil intéressant'),
('Alice Bernard', '06 23 45 67 89', 'Python', 'autre', 'Recommandation', 'rdv prévu', '500€/jour', 'oui', 'CV_Alice_Bernard.pdf', 'https://linkedin.com/in/alicebernard', 'RDV mardi 10h'),
('Marc Lefebvre', '06 34 56 78 90', 'Espagnol', 'langues', 'Site web', 'contacté', '55€/h', 'en cours', 'CV_Marc_Lefebvre.pdf', 'https://linkedin.com/in/marclefebvre', 'Attente retour'),
('David Chen', '06 45 67 89 01', 'Photoshop', 'autre', 'Indeed', 'en échange', '450€/jour', 'non', 'CV_David_Chen.pdf', '', 'À relancer'),
('Léa Martinez', '06 56 78 90 12', 'Anglais', 'langues', 'LinkedIn', 'contacté', '60€/h', 'non', NULL, 'https://linkedin.com/in/leamartinez', 'Nouveau contact');

INSERT INTO besoins (thematique, type, priorite, observations) VALUES
('Excel avancé', 'bureautique', 'élevée', 'Client demande formateur certifié Microsoft'),
('Python pour débutants', 'autre', 'moyenne', 'Formation intra-entreprise 5 jours'),
('Allemand professionnel', 'langues', 'faible', 'Niveau B2 requis'),
('Power BI', 'bureautique', 'élevée', 'Urgent - début formation dans 2 semaines');

-- 9. VÉRIFICATION

SELECT 'Formateurs' as table_name, COUNT(*) as count FROM formateurs
UNION ALL
SELECT 'Candidats', COUNT(*) FROM candidats
UNION ALL
SELECT 'Besoins', COUNT(*) FROM besoins;

-- ============================================
-- FIN DU SCRIPT
-- ============================================

-- NOTES :
-- 1. Exécutez ce script dans l'éditeur SQL de Supabase
-- 2. Les données d'exemple sont optionnelles (section 8)
-- 3. Choisissez OPTION A (accès public) ou OPTION B (authentifié) dans la section 7
-- 4. Pour la production, utilisez OPTION B avec Supabase Auth
