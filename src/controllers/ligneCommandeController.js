const { getConnection } = require("../config/db");

async function getAllLigneCommandes() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande');
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des lignes de commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getLigneCommandeById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la ligne de commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function createLigneCommande(ligneCommandeData) {
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = ligneCommandeData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Ligne_commande (id_commande, id_produit, quantite, prix_unitaire_applique) VALUES (?, ?, ?, ?)',
            [id_commande, id_produit, quantite, prix_unitaire_applique]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la ligne de commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function updateLigneCommande(id, ligneCommandeData) {
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = ligneCommandeData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Ligne_commande SET id_commande = ?, id_produit = ?, quantite = ?, prix_unitaire_applique = ? WHERE id = ?',
            [id_commande, id_produit, quantite, prix_unitaire_applique, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la ligne de commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteLigneCommande(id) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Ligne_commande WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la ligne de commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getLignesByCommandeId(commandeId) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id_commande = ?', [commandeId]);
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des lignes de la commande.");
    } finally {
        if (connection) await connection.end();
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
