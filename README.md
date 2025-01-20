# AirFold API 🛩️

## Sommaire
1. Introduction
2. Fonctionnalités V1
3. Audit de Sécurité
4. Fonctionnalités V2
5. Installation
6. Tester

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

## Test Manuel d'API avec Bruno 🧪
Bruno est un outil open-source puissant pour tester manuellement les API. 

Voici comment l'utiliser avec AirFold :
1. Installation de Bruno
- Téléchargez Bruno depuis le [site officiel](https://www.usebruno.com/).
- Installez-le sur votre système (disponible pour Windows, macOS et Linux).

2. Utilisation avec AirFold
- Lancez Bruno et créez une nouvelle collection pour AirFold.
- Importez les collections Bruno fournies dans le dossier collection-api/AirFold.
- Vous pouvez ensuite tester les différents Endpoint et visualiser des exemples de requêtes.
