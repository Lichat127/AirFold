const Joi = require('joi');

const categorieSchema = Joi.object({
    nom: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .required()
        .messages({
            'string.empty': 'Le nom de la catégorie est obligatoire',
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne peut pas dépasser 50 caractères'
        }),
    
    description: Joi.string()
        .min(5)
        .max(500)
        .trim()
        .optional()
        .messages({
            'string.min': 'La description doit contenir au moins 5 caractères',
            'string.max': 'La description ne peut pas dépasser 500 caractères'
        })
});

const validateCategorie = (data) => {
    const { error, value } = categorieSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

const validateCategorieId = (id) => {
    const idSchema = Joi.number().integer().positive().required();
    
    const { error } = idSchema.validate(id);
    
    if (error) {
        throw new Error('ID de catégorie invalide');
    }
    
    return id;
};

module.exports = {
    validateCategorie,
    validateCategorieId
};
