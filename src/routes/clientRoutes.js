const express = require("express");
const clientController = require("../controllers/clientController");
const commandeController = require("../controllers/commandeController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const clients = await clientController.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const client = await clientController.getClientById(req.params.id);
        res.json(client);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newClientId = await clientController.createClient(req.body);
        res.status(201).json({ id: newClientId, message: "Client créé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await clientController.updateClient(req.params.id, req.body);
        res.json({ message: "Client mis à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await clientController.deleteClient(req.params.id);
        res.json({ message: "Client supprimé avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get("/:id/commandes", async (req, res) => {
    try {
        const clientId = req.params.id;
        const commandes = await commandeController.getCommandesByClientId(clientId);
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;