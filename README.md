# AirFold API 🛩️

## Sommaire
1. Introduction
2. Fonctionnalités V1
3. Audit de Sécurité
4. Fonctionnalités V2
5. Installation

## Introduction 🌐
AirFold est une solution de gestion complète pour les passionnés de maquettes aéronautiques. Cette API permet de gérer efficacement un catalogue de maquettes, les commandes, les clients et les fournisseurs.

## Fonctionnalités V1 🚀
### Gestion des Ressources
- 📦 Produits
- 📂 Catégories
- 🏭 Fournisseurs
- 👥 Clients
- 📋 Commandes
- 📝 Lignes de commande

### Caractéristiques Principales
- CRUD complet sur chaque ressource
- Base de données MySQL
- Endpoints REST simples
- Initialisation automatique de la base de données

## Audit de Sécurité 🕵️
Un audit approfondi a révélé des vulnérabilités critiques :
- 🔓 Injections SQL non maîtrisées
- 🚨 Absence de validation des entrées
- 🔌 Gestion incorrecte des connexions à la base de données
Ces failles exposaient l'application à des risques majeurs de compromission de données.

## Fonctionnalités V2 🛡️
### Améliorations Sécuritaires
- ✅ Validation comprehensive des entrées
- 🔒 Protection contre les injections SQL
- 🔐 Gestion robuste des connexions BDD

### Nouvelles Fonctionnalités Métier
- 📅 Liste des commandes par année
- 📦 Liste des commandes par produit
- ✔️ Validation de la disponibilité des produits
- 📊 Ajustement automatique des stocks
- 🧮 Statistiques

## Installation 💻
```bash
# Cloner le repository
git clone https://github.com/airfold/api.git

# Aller dans le dossier du projet
cd airfold

# Installer les dépendances
npm install // ou pnpm i

# Lancer l'application
node app
```
