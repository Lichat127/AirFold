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
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération du produit.");
    }
}

async function createProduct(productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie } = productData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Produit (reference, nom, description, prix_unitaire, quantite_stock, id_categorie) \
                       VALUES ('${reference}', '${nom}', '${description}', ${prix_unitaire}, ${quantite_stock}, ${id_categorie})`; 
        const [result] = await connection.query(query);
        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création du produit.");
    }
}

async function updateProduct(id, productData) {
    const { reference, nom, description, prix_unitaire, quantite_stock, id_categorie } = productData;
    let connection;
    try {
        const connection = await getConnection();
        const query = `UPDATE Produit SET \
                       reference = '${reference}', \
                       nom = '${nom}', \
                       description = '${description}', \
                       prix_unitaire = ${prix_unitaire}, \
                       quantite_stock = ${quantite_stock}, \
                       id_categorie = ${id_categorie} \
                       WHERE id = ${id}`; 
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Produit introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit.");
    }
}

async function deleteProduct(id) {
    try {
        const connection = await getConnection();
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
