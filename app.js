const express = require("express");
const bodyParser = require("body-parser");
const { initializeDatabase } = require("./src/config/db");
const produitRoutes = require("./src/routes/produitRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

(async () => {
    try {
        await initializeDatabase();

        app.use("/produits", produitRoutes)
    
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);
        })
    } catch (error) {
        console.error("Erreur :", error)
    }

})();