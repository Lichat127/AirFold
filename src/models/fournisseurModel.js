const Joi = require('joi');
const { getConnection } = require("../config/db");

const fournisseurSchema = Joi.object({
    nom: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'Le nom du fournisseur est obligatoire',
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne peut pas dépasser 100 caractères'
        }),
    
    adresse: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required()
        .messages({
            'string.empty': 'L\'adresse est obligatoire',
            'string.min': 'L\'adresse doit contenir au moins 5 caractères',
            'string.max': 'L\'adresse ne peut pas dépasser 255 caractères'
        }),
    
    email: Joi.string()
        .email()
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'L\'email est obligatoire',
            'string.email': 'Format d\'email invalide',
            'string.max': 'L\'email ne peut pas dépasser 100 caractères'
        }),
    
    telephone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.empty': 'Le numéro de téléphone est obligatoire',
            'string.pattern.base': 'Le numéro de téléphone doit contenir 10 chiffres'
        }),
    
    produits: Joi.array()
        .items(Joi.number().integer().positive())
        .min(1)
        .required()
        .messages({
            'array.base': 'La liste des produits doit être un tableau',
            'array.min': 'Au moins un produit doit être associé au fournisseur',
            'number.base': 'Chaque produit doit être un identifiant valide'
        })
});

const validateFournisseur = (data) => {
    const { error, value } = fournisseurSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

const validateFournisseurId = (id) => {
    const idSchema = Joi.number().integer().positive().required();
    
    const { error } = idSchema.validate(id);
    
    if (error) {
        throw new Error('ID de fournisseur invalide');
    }
    
    return id;
};

const validateProduitId = (produitId) => {
    const produitIdSchema = Joi.number().integer().positive().required();
    
    const { error } = produitIdSchema.validate(produitId);
    
    if (error) {
        throw new Error('ID de produit invalide');
    }
    
    return produitId;
};

async function checkProductsExists(produits) {
    let connection;
    try {
        connection = await getConnection();
        for (const id_produit of produits) {
            const [rows] = await connection.query('SELECT id FROM Produit WHERE id = ?', [id_produit]);
            if (rows.length === 0) {
                throw new Error(`Produit avec l'ID ${id_produit} n'existe pas`);
            }
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}


module.exports = {
    validateFournisseur,
    validateFournisseurId,
    validateProduitId,
    checkProductsExists,
};
