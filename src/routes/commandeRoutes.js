const express = require("express");
const commandeController = require("../controllers/commandeController");
const ligneCommandeController = require("../controllers/ligneCommandeController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { start, end } = req.query;

        if (start && end) {
            const commandes = await commandeController.getCommandesByDateRange(start, end);
            res.json(commandes);
        } else {
            const commandes = await commandeController.getAllCommandes();
            res.json(commandes);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const commande = await commandeController.getCommandeById(req.params.id);
        res.json(commande);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCommandeId = await commandeController.createCommande(req.body);
        res.status(201).json({ id: newCommandeId, message: "Commande créée avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await commandeController.updateCommande(req.params.id, req.body);
        res.json({ message: "Commande mise à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await commandeController.deleteCommande(req.params.id);
        res.json({ message: "Commande supprimée avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get("/:id/lignes", async (req, res) => {
    try {
        const commandeId = req.params.id;
        const lignes = await ligneCommandeController.getLignesByCommandeId(commandeId);
        res.json(lignes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
