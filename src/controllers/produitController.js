const { getConnection } = require("../config/db");

async function getAllProducts() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Produit');
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getProductById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Produit WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Produit introuvable.");
        }
        
        const [fournisseurs] = await connection.query('SELECT id_fournisseur FROM Produit_Fournisseur WHERE id_produit = ?', [id]);
        rows[0].fournisseurs = fournisseurs.map(f => f.id_fournisseur);
        
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération du produit.");
    } finally {
        if (connection) await connection.end();
    }
}

async function createProduct(productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie, fournisseurs } = productData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Produit (reference, nom, description, prix_unitaire, quantite_stock, id_categorie) VALUES (?, ?, ?, ?, ?, ?)',
            [reference, nom, description, prix_unitaire, quantite_stock, id_categorie]
        );
        
        for (const id_fournisseur of fournisseurs) {
            await connection.query(
                'INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (?, ?)',
                [result.insertId, id_fournisseur]
            );
        }

        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création du produit.");
    } finally {
        if (connection) await connection.end();
    }
}

async function updateProduct(id, productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie, fournisseurs } = productData;
    let connection;
    try {
        connection = await getConnection();
        
        const [result] = await connection.query(
            'UPDATE Produit SET reference = ?, nom = ?, description = ?, prix_unitaire = ?, quantite_stock = ?, id_categorie = ? WHERE id = ?',
            [reference, nom, description, prix_unitaire, quantite_stock, id_categorie, id]
        );
        
        if (result.affectedRows === 0) {
            throw new Error("Produit introuvable.");
        }

        await connection.query('DELETE FROM Produit_Fournisseur WHERE id_produit = ?', [id]);
        for (const id_fournisseur of fournisseurs) {
            await connection.query(
                'INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (?, ?)',
                [id, id_fournisseur]
            );
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit.");
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteProduct(id) {
    let connection;
    try {
        connection = await getConnection();
        
        await connection.query('DELETE FROM Produit_Fournisseur WHERE id_produit = ?', [id]);
        
        const [result] = await connection.query('DELETE FROM Produit WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            throw new Error("Produit introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la suppression du produit.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getProductsByCategoryIds(categoryIds) {
    let connection;
    try {
        connection = await getConnection();
        const placeholders = categoryIds.map(() => '?').join(',');
        const [rows] = await connection.query(`SELECT * FROM Produit WHERE id_categorie IN (${placeholders})`, categoryIds);
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits des catégories.");
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategoryIds,
};
