const mysql = require("mysql2/promise");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true, 
};

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const schema = fs.readFileSync("scripts/db.sql", "utf8");
        await connection.query(schema);
        console.log("Base de données initialisée avec succès !");
        
        const seedData = fs.readFileSync("scripts/seed_data.sql", "utf-8");
        await connection.query(seedData);
        await connection.end();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base :", error);
    }
}

module.exports = { initializeDatabase };
