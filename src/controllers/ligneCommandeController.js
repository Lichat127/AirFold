const { getConnection } = require("../config/db");

async function getAllLigneCommandes() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande');
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des lignes de commande.");
    }
}

async function getLigneCommandeById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        await connection.end();
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la ligne de commande.");
    }
}

async function createLigneCommande(ligneCommandeData) {
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = ligneCommandeData;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Ligne_commande (id_commande, id_produit, quantite, prix_unitaire_applique) VALUES (?, ?, ?, ?)',
            [id_commande, id_produit, quantite, prix_unitaire_applique]
        );
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
        const [result] = await connection.query(
            'UPDATE Ligne_commande SET id_commande = ?, id_produit = ?, quantite = ?, prix_unitaire_applique = ? WHERE id = ?',
            [id_commande, id_produit, quantite, prix_unitaire_applique, id]
        );
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
        const [result] = await connection.query('DELETE FROM Ligne_commande WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la ligne de commande.");
    }
}

async function getLignesByCommandeId(commandeId) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id_commande = ?', [commandeId]);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des lignes de la commande.");
    }
}

module.exports = {
    getAllLigneCommandes,
    getLigneCommandeById,
    createLigneCommande,
    updateLigneCommande,
    deleteLigneCommande,
    getLignesByCommandeId,
};
