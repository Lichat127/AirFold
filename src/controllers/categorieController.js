const { getConnection } = require("../config/db");

async function getAllCategories() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Categorie');
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits.");
    }
}

async function getCategoryById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Categorie WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Catégorie introuvable.");
        }
        await connection.end();
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la catégorie.");
    }
}

async function createCategory(categoryData) {
    const { nom, description } = categoryData;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Categorie (nom, description) VALUES (?, ?)',
            [nom, description]
        );
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
        const [result] = await connection.query(
            'UPDATE Categorie SET nom = ?, description = ? WHERE id = ?',
            [nom, description, id]
        );
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
        const [result] = await connection.query('DELETE FROM Categorie WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Catégorie introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la catégorie.");
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
