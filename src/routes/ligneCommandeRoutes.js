const express = require("express");
const ligneCommandeController = require("../controllers/ligneCommandeController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const lignesCommandes = await ligneCommandeController.getAllLigneCommandes();
        res.json(lignesCommandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const ligneCommande = await ligneCommandeController.getLigneCommandeById(req.params.id);
        res.json(ligneCommande);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newLigneCommandeId = await ligneCommandeController.createLigneCommande(req.body);
        res.status(201).json({ id: newLigneCommandeId, message: "Ligne de commande créée avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await ligneCommandeController.updateLigneCommande(req.params.id, req.body);
        res.json({ message: "Ligne de commande mise à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await ligneCommandeController.deleteLigneCommande(req.params.id);
        res.json({ message: "Ligne de commande supprimée avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;