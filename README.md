# 📊 Dashboard Formateurs - Déploiement Complet

Dashboard de gestion de formateurs, candidats et besoins de recrutement avec sauvegarde Supabase.

## ✨ Fonctionnalités

- ✅ **12 colonnes formateurs** (incluant Tags & Calendly)
- ✅ **Édition inline** de tous les champs
- ✅ **Graphiques statistiques** (Répartition par type, Coût moyen)
- ✅ **Tags personnalisables** (Natif, Expert, etc.)
- ✅ **Statut Calendly** (OK/KO/Désactivé)
- ✅ **Messages de recrutement** (5 templates prêts)
- ✅ **KPI en temps réel**
- ✅ **Sauvegarde automatique** avec Supabase
- ✅ **Import/Export** CSV/JSON
- ✅ **Recherche et filtres**

---

## 🚀 Déploiement sur Vercel + Supabase

### **ÉTAPE 1 : Configuration Supabase**

#### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **URL** et **anon key**

#### 2. Créer les tables

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Table formateurs
CREATE TABLE formateurs (
  id BIGSERIAL PRIMARY KEY,
  formateur TEXT,
  formations JSONB DEFAULT '[]',
  type TEXT,
  tags JSONB DEFAULT '[]',
  tarif TEXT,
  dossiers INTEGER DEFAULT 0,
  note NUMERIC(3,1) DEFAULT 0,
  contrat TEXT,
  calendly TEXT DEFAULT 'désactivé',
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
  nom TEXT,
  telephone TEXT,
  formation TEXT,
  type TEXT,
  source TEXT,
  statut TEXT,
  tarif TEXT,
  nda TEXT,
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
  thematique TEXT,
  type TEXT,
  priorite TEXT DEFAULT 'moyenne',
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE formateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidats ENABLE ROW LEVEL SECURITY;
ALTER TABLE besoins ENABLE ROW LEVEL SECURITY;

-- Politique d'accès public (à modifier selon vos besoins de sécurité)
CREATE POLICY "Enable all access for formateurs" ON formateurs FOR ALL USING (true);
CREATE POLICY "Enable all access for candidats" ON candidats FOR ALL USING (true);
CREATE POLICY "Enable all access for besoins" ON besoins FOR ALL USING (true);
```

---

### **ÉTAPE 2 : Déploiement GitHub**

#### 1. Créer un repo GitHub
```bash
git init
git add .
git commit -m "🚀 Initial commit - Dashboard Formateurs"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/dashboard-formateurs.git
git push -u origin main
```

#### 2. Fichiers à committer
- ✅ `index.html` (le dashboard)
- ✅ `server-supabase.js` (backend)
- ✅ `api-client.js` (client API)
- ✅ `package.json`
- ✅ `vercel.json`
- ✅ `.gitignore`
- ✅ `.env.example`
- ✅ `README.md`
- ❌ `.env` (NE PAS committer - contient les secrets)

---

### **ÉTAPE 3 : Déploiement Vercel**

#### Option A : Via l'interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Import Project"
3. Sélectionnez votre repo GitHub
4. Ajoutez les variables d'environnement :
   - `SUPABASE_URL` = votre URL Supabase
   - `SUPABASE_ANON_KEY` = votre clé anon Supabase
5. Cliquez sur "Deploy"

#### Option B : Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter les variables d'environnement
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Redéployer avec les variables
vercel --prod
```

---

### **ÉTAPE 4 : Configuration des variables d'environnement**

Dans Vercel :
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez :
   - `SUPABASE_URL` = `https://xxxxx.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGc...`

---

## 💻 Développement Local

### Installation

```bash
# Cloner le repo
git clone https://github.com/VOTRE-USERNAME/dashboard-formateurs.git
cd dashboard-formateurs

# Installer les dépendances
npm install

# Créer .env
cp .env.example .env

# Éditer .env avec vos credentials Supabase
nano .env
```

### Lancement

```bash
# Développement avec serveur Node.js
npm run dev

# Ou simplement ouvrir index.html dans le navigateur
open index.html
```

L'app sera accessible sur `http://localhost:3000`

---

## 🔧 Structure du Projet

```
dashboard-formateurs/
├── index.html              # Frontend du dashboard
├── server-supabase.js      # Backend API avec Supabase
├── api-client.js           # Client API JavaScript
├── package.json            # Dépendances Node.js
├── vercel.json             # Configuration Vercel
├── .env.example            # Template variables d'environnement
├── .gitignore              # Fichiers à ignorer
└── README.md               # Ce fichier
```

---

## 📊 Utilisation

### **Gestion des Formateurs**
1. Ajouter rapidement : Bouton "➕ Ajouter ligne rapide"
2. Formulaire complet : Bouton "✏️ Formulaire complet"
3. Édition inline : Cliquez sur n'importe quelle cellule
4. Tags : Cliquez sur la cellule Tags → Tapez "Natif, Expert"
5. Calendly : Cliquez sur la cellule → OK/KO/Désactivé

### **Messages de Recrutement**
1. Onglet "Recrutement"
2. Bouton "💬 Messages de Recrutement"
3. Cliquez "📋 Copier" sur un template
4. Collez dans votre email/WhatsApp
5. Remplacez [NOM], [FORMATION], etc.

### **Graphiques**
- Scrollez en bas du tableau
- Consultez les statistiques détaillées
- Répartition par type + Coût moyen

---

## 🔐 Sécurité

### Pour la production :
1. **Activez RLS** sur Supabase avec des politiques strictes
2. **Utilisez l'authentification** Supabase Auth
3. **Limitez l'accès** aux tables sensibles
4. **Activez HTTPS** (automatique sur Vercel)

### Exemple de politique RLS sécurisée :
```sql
-- Seulement les utilisateurs authentifiés
CREATE POLICY "Authenticated users only" ON formateurs
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## 🐛 Dépannage

### Les données ne se sauvegardent pas
- ✅ Vérifiez que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont bien configurées
- ✅ Vérifiez les tables dans Supabase
- ✅ Consultez la console (F12) pour les erreurs

### Le site ne se déploie pas sur Vercel
- ✅ Vérifiez que `vercel.json` existe
- ✅ Vérifiez que les variables d'environnement sont ajoutées
- ✅ Consultez les logs de build sur Vercel

### "Ajouter ligne" ne fonctionne pas
- ✅ Rafraîchissez la page (CTRL+F5)
- ✅ Videz le cache du navigateur
- ✅ Vérifiez la console pour les erreurs

---

## 📝 Changelog

### Version 2.0.0 (2026-03-17)
- ✅ Ajout colonne Tags avec badge "Natif"
- ✅ Ajout colonne Calendly (OK/KO/Désactivé)
- ✅ Graphiques statistiques compacts en bas
- ✅ Messages de recrutement (5 templates)
- ✅ KPI Coût Moyen
- ✅ Corrections bugs ajout de ligne

---

## 📄 Licence

MIT License - Vous êtes libre d'utiliser, modifier et distribuer ce code.

---

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez d'abord ce README
2. Consultez les logs Vercel
3. Vérifiez la console du navigateur
4. Consultez la documentation Supabase

---

**🎉 Bon déploiement !**
