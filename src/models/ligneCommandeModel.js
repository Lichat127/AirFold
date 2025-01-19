const Joi = require('joi');
const { getConnection } = require("../config/db");

const ligneCommandeSchema = Joi.object({
    id_commande: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'L\'ID de commande doit être un nombre',
            'number.integer': 'L\'ID de commande doit être un entier',
            'number.positive': 'L\'ID de commande doit être un nombre positif',
            'any.required': 'L\'ID de commande est obligatoire'
        }),
    
    id_produit: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'L\'ID de produit doit être un nombre',
            'number.integer': 'L\'ID de produit doit être un entier',
            'number.positive': 'L\'ID de produit doit être un nombre positif',
            'any.required': 'L\'ID de produit est obligatoire'
        }),
    
    quantite: Joi.number()
        .integer()
        .positive()
        .min(1)
        .required()
        .messages({
            'number.base': 'La quantité doit être un nombre',
            'number.integer': 'La quantité doit être un entier',
            'number.positive': 'La quantité doit être un nombre positif',
            'number.min': 'La quantité doit être au moins 1',
            'any.required': 'La quantité est obligatoire'
        }),
    
    prix_unitaire_applique: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.base': 'Le prix unitaire doit être un nombre',
            'number.positive': 'Le prix unitaire doit être un nombre positif',
            'number.precision': 'Le prix unitaire doit avoir au maximum 2 décimales',
            'any.required': 'Le prix unitaire est obligatoire'
        })
});

const validateLigneCommande = (data) => {
    const { error, value } = ligneCommandeSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

const validateLigneCommandeId = (id) => {
    const idSchema = Joi.number().integer().positive().required();
    
    const { error } = idSchema.validate(id);
    
    if (error) {
        throw new Error('ID de ligne de commande invalide');
    }
    
    return id;
};

const validateCommandeId = (commandeId) => {
    const commandeIdSchema = Joi.number().integer().positive().required();
    
    const { error } = commandeIdSchema.validate(commandeId);
    
    if (error) {
        throw new Error('ID de commande invalide');
    }
    
    return commandeId;
};

async function checkOrderExists(id_commande) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT id FROM Commande WHERE id = ?', [id_commande]);
        if (rows.length === 0) {
            throw new Error(`Commande avec l'ID ${id_commande} n'existe pas`);
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

async function checkProductExists(id_produit) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.query('SELECT id FROM Produit WHERE id = ?', [id_produit]);
        if (rows.length === 0) {
            throw new Error(`Produit avec l'ID ${id_produit} n'existe pas`);
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    validateLigneCommande,
    validateLigneCommandeId,
    validateCommandeId,
    checkOrderExists,
    checkProductExists,
};
