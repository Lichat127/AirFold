const Joi = require('joi');

const clientSchema = Joi.object({
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
    
    prenom: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'Le prénom est obligatoire',
            'string.min': 'Le prénom doit contenir au moins 2 caractères',
            'string.max': 'Le prénom ne peut pas dépasser 100 caractères'
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
        })
});

const validateClient = (data) => {
    const { error, value } = clientSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

const validateClientId = (id) => {
    const idSchema = Joi.number().integer().positive().required();
    
    const { error } = idSchema.validate(id);
    
    if (error) {
        throw new Error('ID de client invalide');
    }
    
    return id;
};

module.exports = {
    validateClient,
    validateClientId
};
