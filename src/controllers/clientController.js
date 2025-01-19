const { getConnection } = require("../config/db");
const { validateClient, validateClientId } = require("../models/clientModel");

async function getAllClients() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Client');
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des clients.");
    } finally {
        if (connection) await connection.end();
    }
}

async function getClientById(id) {
    validateClientId(id);

    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Client WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error("Client introuvable.");
        }
        return rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la récupération du client.");
    } finally {
        if (connection) await connection.end();
    }
}

async function createClient(clientData) {
    const validatedData = validateClient(clientData);
    const { nom, prenom, adresse, email, telephone } = validatedData;

    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Client (nom, prenom, adresse, email, telephone) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, adresse, email, telephone]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Erreur lors de la création du client.");
    } finally {
        if (connection) await connection.end();
    }
}

async function updateClient(id, clientData) {
    validateClientId(id);
    const validatedData = validateClient(clientData);
    const { nom, prenom, adresse, email, telephone } = validatedData;
    
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Client SET nom = ?, prenom = ?, adresse = ?, email = ?, telephone = ? WHERE id = ?',
            [nom, prenom, adresse, email, telephone, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Client introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du client.");
    } finally {
        if (connection) await connection.end();
    }
}

async function deleteClient(id) {
    validateClientId(id);

    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Client WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error("Client introuvable.");
        }
    } catch (error) {
        throw new Error("Erreur lors de la suppression du client.");
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
};
