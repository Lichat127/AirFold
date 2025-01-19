const express = require("express");
const categorieController = require("../controllers/categorieController");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await categorieController.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const categorie = await categorieController.getCategoryById(req.params.id);
        res.json(categorie);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCategoryId = await categorieController.createCategory(req.body);
        res.status(201).json({ id: newCategoryId, message: "Catégorie créée avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await categorieController.updateCategory(req.params.id, req.body);
        res.json({ message: "Catégorie mise à jour avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await categorieController.deleteCategory(req.params.id);
        res.json({ message: "Catégorie supprimée avec succès." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
