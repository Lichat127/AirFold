const { getConnection } = require("../config/db");

async function getAllCommandes() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande');
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des commandes.");
    }
}

async function getCommandeById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Commande introuvable.");
        }
        await connection.end();
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la commande.");
    }
}

async function createCommande(commandeData) {
    const { id_client, date_commande } = commandeData;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Commande (id_client, date_commande) VALUES (?, ?)',
            [id_client, date_commande]
        );
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
        const [result] = await connection.query(
            'UPDATE Commande SET id_client = ?, date_commande = ? WHERE id = ?',
            [id_client, date_commande, id]
        );
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
        const [result] = await connection.query('DELETE FROM Commande WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Commande introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la commande.");
    }
}

async function getCommandesByClientId(clientId) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande WHERE id_client = ?', [clientId]);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des commandes du client.");
    }
}

module.exports = {
    getAllCommandes,
    getCommandeById,
    createCommande,
    updateCommande,
    deleteCommande,
    getCommandesByClientId,
};
