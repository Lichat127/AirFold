const express = require("express");
const fournisseurController = require("../controllers/fournisseurController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const fournisseurs = await fournisseurController.getAllFournisseurs();
        res.json(fournisseurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const fournisseur = await fournisseurController.getFournisseurById(req.params.id);
        res.json(fournisseur);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newFournisseurId = await fournisseurController.createFournisseur(req.body);
        res.status(201).json({ id: newFournisseurId, message: "Fournisseur créé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await fournisseurController.updateFournisseur(req.params.id, req.body);
        res.json({ message: "Fournisseur mis à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await fournisseurController.deleteFournisseur(req.params.id);
        res.json({ message: "Fournisseur supprimé avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
