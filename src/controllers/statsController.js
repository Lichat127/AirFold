const { getConnection } = require("../config/db");


async function getTopSellingProducts(limit = 10, startDate = null, endDate = null) {
    let connection;
    
    try {
        connection = await getConnection();
        
        let query = `
            SELECT 
                p.id, 
                p.nom, 
                SUM(lc.quantite) as total_vendu
            FROM Produit p
            JOIN Ligne_commande lc ON p.id = lc.id_produit
            JOIN Commande c ON lc.id_commande = c.id
        `;
        
        const queryParams = [];
        
        if (startDate && endDate) {
            query += ' WHERE c.date_commande BETWEEN ? AND ?';
            queryParams.push(startDate, endDate);
        }
        
        query += `
            GROUP BY p.id, p.nom
            ORDER BY total_vendu DESC
            LIMIT ?
        `;
        
        queryParams.push(limit);
        
        const [rows] = await connection.query(query, queryParams);
        return rows;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des produits les plus vendus: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

async function getSalesSummary(startDate = null, endDate = null) {
    let connection;
    try {
        connection = await getConnection();
        
        let query = `
            SELECT 
                COUNT(DISTINCT c.id) as nombre_commandes,
                SUM(lc.quantite * p.prix_unitaire) as total_ventes,
                AVG(lc.quantite * p.prix_unitaire) as panier_moyen
            FROM Commande c
            JOIN Ligne_commande lc ON c.id = lc.id_commande
            JOIN Produit p ON lc.id_produit = p.id
        `;
        
        const queryParams = [];
        
        if (startDate && endDate) {
            query += ' WHERE c.date_commande BETWEEN ? AND ?';
            queryParams.push(startDate, endDate);
        }
        
        const [rows] = await connection.query(query, queryParams);
        return rows[0];
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des statistiques de vente: ${error.message}`);
    } finally {
        if (connection) await connection.end();
    }
}


module.exports = {
    getTopSellingProducts,
    getSalesSummary,
};