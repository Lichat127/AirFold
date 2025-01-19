const { getConnection } = require("../config/db");

async function getAllCategories() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Categorie`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits.");
    }
}

async function getCategoryById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Categorie WHERE id = ${id}`);
        if (rows.length === 0) {
            throw new Error("Catégorie introuvable.");
        }
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la catégorie.");
    }
}

async function createCategory(categoryData) {
    const { nom, description } = categoryData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Categorie (nom, description) VALUES ('${nom}', '${description}')`;
        const [result] = await connection.query(query);
        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la catégorie.");
    }
}

async function updateCategory(id, categoryData) {
    const { nom, description } = categoryData;
    try {
        const connection = await getConnection();
        const query = `UPDATE Categorie SET nom = '${nom}', description = '${description}' WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Catégorie introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la catégorie.");
    }
}

async function deleteCategory(id) {
    try {
        const connection = await getConnection();
        const query = `DELETE FROM Categorie WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Catégorie introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la catégorie.");
    }
}

async function getProductsByCategoryId(categoryId) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Produit WHERE id_categorie = ${categoryId}`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits de la catégorie.");
    }
}


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getProductsByCategoryId,
};
