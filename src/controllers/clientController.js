const { getConnection } = require("../config/db");

async function getAllClients() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Client`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des clients.");
    }
}

async function getClientById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Client WHERE id = ${id}`);
        if (rows.length === 0) {
            throw new Error("Client introuvable.");
        }
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération du client.");
    }
}

async function createClient(clientData) {
    const { nom, prenom, adresse, email, telephone } = clientData;
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Client (nom, prenom, adresse, email, telephone) VALUES ('${nom}', '${prenom}', '${adresse}', '${email}', '${telephone}')`;
        const [result] = await connection.query(query);
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
        const query = `UPDATE Client SET nom = '${nom}', prenom = '${prenom}', adresse = '${adresse}', email = '${email}', telephone = '${telephone}' WHERE id = ${id}`;
        const [result] = await connection.query(query);
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
        const query = `DELETE FROM Client WHERE id = ${id}`;
        const [result] = await connection.query(query);
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