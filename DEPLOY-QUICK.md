# 🚀 DÉPLOIEMENT RAPIDE - 5 MINUTES

Guide ultra-rapide pour déployer sur GitHub + Vercel + Supabase.

---

## ⚡ ÉTAPE 1 : SUPABASE (2 minutes)

### 1. Créer le projet
- Va sur [supabase.com](https://supabase.com)
- Clique "New project"
- Note ton **URL** et **anon key**

### 2. Créer les tables
- Va dans "SQL Editor"
- Copie-colle tout le contenu de `supabase-setup.sql`
- Clique "Run"
- ✅ Tables créées !

---

## 📦 ÉTAPE 2 : GITHUB (1 minute)

```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Sur GitHub, crée un nouveau repo puis :
git remote add origin https://github.com/TON-USERNAME/dashboard-formateurs.git
git push -u origin main
```

✅ Code sur GitHub !

---

## 🌐 ÉTAPE 3 : VERCEL (2 minutes)

### 1. Import
- Va sur [vercel.com](https://vercel.com)
- Clique "Import Project"
- Sélectionne ton repo GitHub

### 2. Variables d'environnement
Ajoute ces 2 variables :
```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGc...
```

### 3. Deploy
- Clique "Deploy"
- Attends 30 secondes
- ✅ C'est en ligne !

---

## ✅ VÉRIFICATION

1. Ouvre ton URL Vercel (ex: `dashboard-formateurs.vercel.app`)
2. Ajoute un formateur
3. Rafraîchis la page
4. Le formateur est toujours là ? **✅ SUCCÈS !**

---

## 🐛 Problème ?

### Les données ne se sauvegardent pas
```bash
# Vérifie les variables d'environnement sur Vercel
# Settings → Environment Variables
# SUPABASE_URL et SUPABASE_ANON_KEY doivent être présentes
```

### Le site ne s'affiche pas
```bash
# Vérifie les logs de build sur Vercel
# Deployment → Build Logs
```

### Erreur 500
```bash
# Vérifie que les tables Supabase existent
# Supabase → Table Editor → formateurs, candidats, besoins
```

---

## 🎉 C'EST TOUT !

Ton dashboard est maintenant **EN LIGNE** et les données sont **SAUVEGARDÉES** sur Supabase !

**URL publique** : `https://votre-projet.vercel.app`
