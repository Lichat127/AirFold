const Joi = require('joi');
const { getConnection } = require("../config/db");

const produitSchema = Joi.object({
    reference: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'La référence est obligatoire',
            'string.min': 'La référence doit contenir au moins 2 caractères',
            'string.max': 'La référence ne peut pas dépasser 100 caractères'
        }),

    nom: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'Le nom est obligatoire',
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne peut pas dépasser 100 caractères'
        }),

    description: Joi.string()
        .max(500)
        .optional()
        .messages({
            'string.max': 'La description ne peut pas dépasser 500 caractères'
        }),

    prix_unitaire: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.base': 'Le prix unitaire doit être un nombre',
            'number.positive': 'Le prix unitaire doit être positif',
            'number.precision': 'Le prix unitaire doit avoir au maximum 2 décimales',
            'any.required': 'Le prix unitaire est obligatoire'
        }),

    quantite_stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'La quantité en stock doit être un nombre entier',
            'number.integer': 'La quantité en stock doit être un entier',
            'number.min': 'La quantité en stock ne peut pas être négative',
            'any.required': 'La quantité en stock est obligatoire'
        }),

    id_categorie: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': "L'ID de catégorie doit être un nombre",
            'number.integer': "L'ID de catégorie doit être un entier",
            'number.positive': "L'ID de catégorie doit être positif",
            'any.required': "L'ID de catégorie est obligatoire"
        }),

    fournisseurs: Joi.array()
        .items(Joi.number().integer().positive())
        .min(1)
        .required()
        .messages({
            'array.base': "La liste des fournisseurs doit être un tableau",
            'array.min': "Au moins un fournisseur doit être associé au produit",
            'number.base': "Chaque fournisseur doit être un identifiant valide"
        })
});

const validateProduit = (data) => {
    const { error, value } = produitSchema.validate(data, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }

    return value;
};

const validateProduitId = (id) => {
    const idSchema = Joi.number().integer().positive().required();

    const { error } = idSchema.validate(id);

    if (error) {
        throw new Error("ID de produit invalide");
    }

    return id;
};

async function checkSupplierExists(fournisseurs) {
    let connection;
    try {
        connection = await getConnection();
        for (const id_fournisseur of fournisseurs) {
            const [rows] = await connection.query('SELECT id FROM Fournisseur WHERE id = ?', [id_fournisseur]);
            if (rows.length === 0) {
                throw new Error(`Fournisseur avec l'ID ${id_fournisseur} n'existe pas`);
            }
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}


module.exports = {
    validateProduit,
    validateProduitId,
    checkSupplierExists,
};
