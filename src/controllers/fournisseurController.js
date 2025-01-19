const { getConnection } = require("../config/db");

async function getAllFournisseurs() {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Fournisseur`);
        await connection.end();
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des fournisseurs.");
    }
}

async function getFournisseurById(id) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`SELECT * FROM Fournisseur WHERE id = ${id}`);
        
        if (rows.length === 0) {
            throw new Error("Fournisseur introuvable.");
        }
        
         const [produits] = await connection.query(`SELECT id_produit FROM Produit_Fournisseur WHERE id_fournisseur = ${id}`);
         rows.produits = produits.map(p => p.id_produit);
         
         await connection.end();
         return rows;
     } catch (error) {
         throw new Error("Erreur lors de la récupération du fournisseur.");
     }
}

async function createFournisseur(fournisseurData) {
    const { nom, adresse, email, telephone, produits } = fournisseurData;
    try {
       const connection = await getConnection();
       const query = `INSERT INTO Fournisseur (nom, adresse, email, telephone) VALUES ('${nom}', '${adresse}', '${email}', '${telephone}')`;
       const [result] = await connection.query(query);
       
       for (const id_produit of produits) {
           await connection.query(`INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (${id_produit}, ${result.insertId})`);
       }

       await connection.end();
       return result.insertId;
   } catch (error) {
       throw new Error("Erreur lors de la création du fournisseur.");
   }
}

async function updateFournisseur(id, fournisseurData) {
   const { nom, adresse, email, telephone, produits } = fournisseurData;
   try {
       const connection = await getConnection();

       const query = `UPDATE Fournisseur SET nom='${nom}', adresse='${adresse}', email='${email}', telephone='${telephone}' WHERE id=${id}`;
       const [result] = await connection.query(query);

       if (result.affectedRows === 0) {
           throw new Error("Fournisseur introuvable.");
       }

       await connection.query(`DELETE FROM Produit_Fournisseur WHERE id_fournisseur=${id}`);
       for (const id_produit of produits) {
           await connection.query(`INSERT INTO Produit_Fournisseur (id_produit, id_fournisseur) VALUES (${id_produit}, ${id})`);
       }

       await connection.end();
   } catch (error) {
       throw new Error("Erreur lors de la mise à jour du fournisseur.");
   }
}

async function deleteFournisseur(id) {
   try {
       const connection = await getConnection();

       await connection.query(`DELETE FROM Produit_Fournisseur WHERE id_fournisseur=${id}`);

       const query = `DELETE FROM Fournisseur WHERE id=${id}`;
       const [result] = await connection.query(query);

       if (result.affectedRows === 0) {
           throw new Error("Fournisseur introuvable.");
       }

       await connection.end();
   } catch (error) {
       throw new Error("Erreur lors de la suppression du fournisseur.");
   }
}

module.exports = {
   getAllFournisseurs,
   getFournisseurById,
   createFournisseur,
   updateFournisseur,
   deleteFournisseur,
};
