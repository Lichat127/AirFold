const { getConnection } = require("../config/db");

async function getAllClients() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Client');
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des clients.");
    }
}

async function getClientById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Client WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Client introuvable.");
        }
        await connection.end();
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération du client.");
    }
}

async function createClient(clientData) {
    const { nom, prenom, adresse, email, telephone } = clientData;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Client (nom, prenom, adresse, email, telephone) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, adresse, email, telephone]
        );
        await connection.end();
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création du client.");
    }
}

async function updateClient(id, clientData) {
    const { nom, prenom, adresse, email, telephone } = clientData;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Client SET nom = ?, prenom = ?, adresse = ?, email = ?, telephone = ? WHERE id = ?',
            [nom, prenom, adresse, email, telephone, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Client introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du client.");
    }
}

async function deleteClient(id) {
    try {
        const connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Client WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Client introuvable.");
        }
        await connection.end();
    } catch (error) {
        throw new Error("Erreur lors de la suppression du client.");
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
};
