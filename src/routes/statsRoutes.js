const express = require("express");
const statsController = require("../controllers/statsController");

const router = express.Router();

router.get("/top-vendus", async (req, res) => {
    try {
        const { limit, start, end } = req.query;
        const topProducts = await statsController.getTopSellingProducts(
            limit ? parseInt(limit) : 10, 
            start, 
            end
        );
        res.json(topProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/ventes", async (req, res) => {
    try {
        const { start, end } = req.query;
        const salesSummary = await statsController.getSalesSummary(start, end);
        res.json(salesSummary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;