const { getConnection } = require("../config/db");

async function getAllCommandes() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande');
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des commandes.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getCommandeById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Commande introuvable.");
        }
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function createCommande(commandeData) {
    const { id_client, date_commande } = commandeData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Commande (id_client, date_commande) VALUES (?, ?)',
            [id_client, date_commande]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création de la commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function updateCommande(id, commandeData) {
    const { id_client, date_commande } = commandeData;
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Commande SET id_client = ?, date_commande = ? WHERE id = ?',
            [id_client, date_commande, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Commande introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteCommande(id) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Commande WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Commande introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la commande.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getCommandesByClientId(clientId) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Commande WHERE id_client = ?', [clientId]);
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des commandes du client.");
    } finally {
        if (connection) await connection.end();
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
