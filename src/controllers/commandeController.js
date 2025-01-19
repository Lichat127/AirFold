const { getConnection } = require("../config/db");

async function getAllCommandes() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Commande`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des commandes.");
    }
}

async function getCommandeById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Commande WHERE id = ${id}`);
        if (rows.length === 0) {
            throw new Error("Commande introuvable.");
        }
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la commande.");
    }
}

async function createCommande(commandeData) {
    const { id_client, date_commande } = commandeData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Commande (id_client, date_commande) VALUES (${id_client}, '${date_commande}')`;
        const [result] = await connection.query(query);
        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la commande.");
    }
}

async function updateCommande(id, commandeData) {
    const { id_client, date_commande } = commandeData;
    try {
        const connection = await getConnection();
        const query = `UPDATE Commande SET id_client = ${id_client}, date_commande = '${date_commande}' WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la commande.");
    }
}

async function deleteCommande(id) {
    try {
        const connection = await getConnection();
        const query = `DELETE FROM Commande WHERE id = ${id}`;
        const [result] = await connection.query(query);
        if (result.affectedRows === 0) {
            throw new Error("Commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la commande.");
    }
}

module.exports = {
    getAllCommandes,
    getCommandeById,
    createCommande,
    updateCommande,
    deleteCommande,
};