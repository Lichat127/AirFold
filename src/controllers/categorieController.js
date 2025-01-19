const { getConnection } = require("../config/db");

async function getAllCategories() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Categorie');
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des catégories.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getCategoryById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Categorie WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Catégorie introuvable.");
        }
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la catégorie.");
    } finally {
        if (connection) await connection.end();
    }
}

async function createCategory(categoryData) {
    const { nom, description } = categoryData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Categorie (nom, description) VALUES (?, ?)',
            [nom, description]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la catégorie.");
    } finally {
        if (connection) await connection.end();
    }
}

async function updateCategory(id, categoryData) {
    const { nom, description } = categoryData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Categorie SET nom = ?, description = ? WHERE id = ?',
            [nom, description, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Catégorie introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la catégorie.");
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteCategory(id) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Categorie WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Catégorie introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la catégorie.");
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
