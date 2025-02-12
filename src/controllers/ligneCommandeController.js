const { getConnection } = require("../config/db");
const { validateLigneCommande, validateLigneCommandeId, validateCommandeId, checkOrderExists, checkProductAvailability, updateProductStock } = require("../models/ligneCommandeModel");

async function getAllLigneCommandes() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande');
        return rows;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des lignes de commande : ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function getLigneCommandeById(id) {
    validateLigneCommandeId(id);

    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
        return rows[0];
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la ligne de commande : ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function createLigneCommande(ligneCommandeData) {
    const validatedData = validateLigneCommande(ligneCommandeData);
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = validatedData;
    
    await checkOrderExists(id_commande);
    await checkProductAvailability(id_produit, quantite);

    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Ligne_commande (id_commande, id_produit, quantite, prix_unitaire_applique) VALUES (?, ?, ?, ?)',
            [id_commande, id_produit, quantite, prix_unitaire_applique]
        );
        await updateProductStock(id_produit, quantite);
        return result.insertId;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la ligne de commande : ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function updateLigneCommande(id, ligneCommandeData) {
    validateLigneCommandeId(id);
    const validatedData = validateLigneCommande(ligneCommandeData);
    const { id_commande, id_produit, quantite, prix_unitaire_applique } = validatedData;
    
    let connection;
    try {
        connection = await getConnection();
        
        const [oldLineRows] = await connection.query(
            'SELECT id_produit, quantite FROM Ligne_commande WHERE id = ?', 
            [id]
        );

        if (oldLineRows.length === 0) {
            throw new Error("Ligne de commande introuvable.");
        }

        const oldLine = oldLineRows[0];
        const quantityDifference = quantite - oldLine.quantite;
        
        if (id_produit !== oldLine.id_produit) {
            await checkProductAvailability(id_produit, quantite);
            await updateProductStock(oldLine.id_produit, -oldLine.quantite);
            await updateProductStock(id_produit, quantite);
        } else if (quantityDifference > 0) {
            await checkProductAvailability(id_produit, quantityDifference);
            await updateProductStock(id_produit, quantityDifference);
        } else if (quantityDifference < 0) {
            await updateProductStock(id_produit, quantityDifference);
        }

        const [result] = await connection.query(
            'UPDATE Ligne_commande SET id_commande = ?, id_produit = ?, quantite = ?, prix_unitaire_applique = ? WHERE id = ?',
            [id_commande, id_produit, quantite, prix_unitaire_applique, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la ligne de commande : ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteLigneCommande(id) {
    validateLigneCommandeId(id);
    
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Ligne_commande WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Ligne de commande introuvable.");
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la ligne de commande : ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function getLignesByCommandeId(commandeId) {
    validateCommandeId(commandeId);
    
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Ligne_commande WHERE id_commande = ?', [commandeId]);
        return rows;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des lignes de la commande: ${error.message}`);
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
