const express = require("express");
const produitController = require("../controllers/produitController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const produits = await produitController.getAllProducts();
        res.json(produits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const produit = await produitController.getProductById(req.params.id);
        res.json(produit);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProductId = await produitController.createProduct(req.body);
        res.status(201).json({ id: newProductId, message: "Produit créé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await produitController.updateProduct(req.params.id, req.body);
        res.json({ message: "Produit mis à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await produitController.deleteProduct(req.params.id);
        res.json({ message: "Produit supprimé avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
