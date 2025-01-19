const { getConnection } = require("../config/db");
const { validateFournisseur, validateFournisseurId, validateProduitId, checkProductsExists } = require("../models/fournisseurModel");

async function getAllFournisseurs() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Fournisseur');
        return rows;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des fournisseurs: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function getFournisseurById(id) {
    validateFournisseurId(id);

    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Fournisseur WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            throw new Error("Fournisseur introuvable.");
        }
        
        const [produits] = await connection.query('SELECT id_produit FROM Produit_Fournisseur WHERE id_fournisseur = ?', [id]);
        rows[0].produits = produits.map(p => p.id_produit);
         
        return rows[0];
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du fournisseur: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function createFournisseur(fournisseurData) {
    const validatedData = validateFournisseur(fournisseurData);
    const { nom, adresse, email, telephone, produits } = validatedData;
    
    await checkProductsExists(produits);

    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Fournisseur (nom, adresse, email, telephone) VALUES (?, ?, ?, ?)',
            [nom, adresse, email, telephone]
        );
       
        for (const id_produit of produits) {
            validateProduitId(id_produit);
            await connection.query(
                'INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (?, ?)',
                [id_produit, result.insertId]
            );
        }

        return result.insertId;
    } catch (error) {
        throw new Error(`Erreur lors de la création du fournisseur: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function updateFournisseur(id, fournisseurData) {
    validateFournisseurId(id);
    const validatedData = validateFournisseur(fournisseurData);
    const { nom, adresse, email, telephone, produits } = validatedData;
    
    await checkProductsExists(produits);

    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(
            'UPDATE Fournisseur SET nom=?, adresse=?, email=?, telephone=? WHERE id=?',
            [nom, adresse, email, telephone, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Fournisseur introuvable.");
        }

        await connection.query('DELETE FROM Produit_Fournisseur WHERE id_fournisseur=?', [id]);
        for (const id_produit of produits) {
            validateProduitId(id_produit);
            await connection.query(
                'INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (?, ?)',
                [id_produit, id]
            );
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du fournisseur: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteFournisseur(id) {
    validateFournisseurId(id);
    let connection;
    try {
        connection = await getConnection();

        await connection.query('DELETE FROM Produit_Fournisseur WHERE id_fournisseur=?', [id]);

        const [result] = await connection.query('DELETE FROM Fournisseur WHERE id=?', [id]);

        if (result.affectedRows === 0) {
            throw new Error("Fournisseur introuvable.");
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du fournisseur: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    getAllFournisseurs,
    getFournisseurById,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur,
};
