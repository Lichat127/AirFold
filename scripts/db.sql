CREATE DATABASE IF NOT EXISTS AirFold ;

USE AirFold ;

CREATE TABLE IF NOT EXISTS Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    adresse TEXT,
    email VARCHAR(50),
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Fournisseur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    adresse TEXT,
    email VARCHAR(50),
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Produit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    quantite_stock INT NOT NULL,
    id_categorie INT,
    FOREIGN KEY (id_categorie) REFERENCES Categorie(id)
);

CREATE TABLE IF NOT EXISTS Produit_Fournisseur (
    id_produit INT,
    id_fournisseur INT,
    PRIMARY KEY (id_produit, id_fournisseur),
    FOREIGN KEY (id_produit) REFERENCES Produit(id),
    FOREIGN KEY (id_fournisseur) REFERENCES Fournisseur(id)
);

CREATE TABLE IF NOT EXISTS Commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_client INT NOT NULL,
    date_commande DATE NOT NULL,
    FOREIGN KEY (id_client) REFERENCES Client(id)
);

CREATE TABLE IF NOT EXISTS Ligne_commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT NOT NULL,
    id_produit INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire_applique DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES Commande(id),
    FOREIGN KEY (id_produit) REFERENCES Produit(id)
);
