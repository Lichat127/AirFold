const { getConnection } = require("../config/db");

async function getAllLigneCommandes() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Ligne_commande`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des lignes de commande.");
    }
}

async function getLigneCommandeById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Ligne_commande WHERE id = ${id}`);
        if (rows.length === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la ligne de commande.");
    }
}

async function createLigneCommande(ligneCommandeData) {
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = ligneCommandeData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Ligne_commande (id_commande, id_produit, quantite, prix_unitaire_applique) VALUES (${id_commande}, ${id_produit}, ${quantite}, ${prix_unitaire_applique})`;
        const [result] = await connection.query(query);
        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la ligne de commande.");
    }
}

async function updateLigneCommande(id, ligneCommandeData) {
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = ligneCommandeData;
    try {
        const connection = await getConnection();
        const query = `UPDATE Ligne_commande SET id_commande = ${id_commande}, id_produit = ${id_produit}, quantite = ${quantite}, prix_unitaire_applique = ${prix_unitaire_applique} WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la ligne de commande.");
    }
}

async function deleteLigneCommande(id) {
    try {
        const connection = await getConnection();
        const query = `DELETE FROM Ligne_commande WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la ligne de commande.");
    }
}

module.exports = {
    getAllLigneCommandes,
    getLigneCommandeById,
    createLigneCommande,
    updateLigneCommande,
    deleteLigneCommande,
};