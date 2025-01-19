const { getConnection } = require("../config/db");

async function getAllProducts() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Produit`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits.");
    }
}

async function getProductById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Produit WHERE id = ${id}`);
        if (rows.length === 0) {
            throw new Error("Produit introuvable.");
        }
        
        const [fournisseurs] = await connection.query(`SELECT id_fournisseur FROM Produit_Fournisseur WHERE id_produit = ${id}`);
        rows[0].fournisseurs = fournisseurs.map(f => f.id_fournisseur);
        
        await connection.end();
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération du produit.");
    }
}

async function createProduct(productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie, fournisseurs } = productData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Produit (reference, nom, description, prix_unitaire, quantite_stock, id_categorie) VALUES ('${reference}', '${nom}', '${description}', ${prix_unitaire}, ${quantite_stock}, ${id_categorie})`;
        const [result] = await connection.query(query);
        
        for (const id_fournisseur of fournisseurs) {
            await connection.query(`INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (${result.insertId}, ${id_fournisseur})`);
        }

        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création du produit.");
    }
}

async function updateProduct(id, productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie, fournisseurs } = productData;
    try {
        const connection = await getConnection();
        
        const query = `UPDATE Produit SET reference = '${reference}', nom = '${nom}', description = '${description}', prix_unitaire = ${prix_unitaire}, quantite_stock = ${quantite_stock}, id_categorie = ${id_categorie} WHERE id = ${id}`;
        const [result] = await connection.query(query);
        
        if (result.affectedRows === 0) {
            throw new Error("Produit introuvable.");
        }

        await connection.query(`DELETE FROM Produit_Fournisseur WHERE id_produit = ${id}`);
        for (const id_fournisseur of fournisseurs) {
            await connection.query(`INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (${id}, ${id_fournisseur})`);
        }

        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit.");
    }
}

async function deleteProduct(id) {
    try {
        const connection = await getConnection();
        
        await connection.query(`DELETE FROM Produit_Fournisseur WHERE id_produit = ${id}`);
        
        const query = `DELETE FROM Produit WHERE id = ${id}`;
        const [result] = await connection.query(query);
        
        if (result.affectedRows === 0) {
            throw new Error("Produit introuvable.");
        }
        
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression du produit.");
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
