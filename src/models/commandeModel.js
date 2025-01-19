const Joi = require('joi');

const commandeSchema = Joi.object({
    id_client: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'L\'ID du client doit être un nombre',
            'number.integer': 'L\'ID du client doit être un entier',
            'number.positive': 'L\'ID du client doit être un nombre positif',
            'any.required': 'L\'ID du client est obligatoire'
        }),
    
    date_commande: Joi.date()
        .iso()
        .max('now')
        .required()
        .messages({
            'date.base': 'La date de commande doit être une date valide',
            'date.format': 'La date de commande doit être au format ISO',
            'date.max': 'La date de commande ne peut pas être dans le futur',
            'any.required': 'La date de commande est obligatoire'
        })
});

const dateRangeSchema = Joi.object({
    start: Joi.date()
        .iso()
        .max('now')
        .required()
        .messages({
            'date.base': 'La date de début doit être une date valide',
            'date.format': 'La date de début doit être au format ISO',
            'date.max': 'La date de début ne peut pas être dans le futur',
            'any.required': 'La date de début est obligatoire'
        }),
    
    end: Joi.date()
        .iso()
        .min(Joi.ref('start'))
        .max('now')
        .required()
        .messages({
            'date.base': 'La date de fin doit être une date valide',
            'date.format': 'La date de fin doit être au format ISO',
            'date.min': 'La date de fin doit être postérieure ou égale à la date de début',
            'date.max': 'La date de fin ne peut pas être dans le futur',
            'any.required': 'La date de fin est obligatoire'
        })
});

const validateCommande = (data) => {
    const { error, value } = commandeSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

const validateCommandeId = (id) => {
    const idSchema = Joi.number().integer().positive().required();
    
    const { error } = idSchema.validate(id);
    
    if (error) {
        throw new Error('ID de commande invalide');
    }
    
    return id;
};

const validateClientId = (clientId) => {
    const clientIdSchema = Joi.number().integer().positive().required();
    
    const { error } = clientIdSchema.validate(clientId);
    
    if (error) {
        throw new Error('ID de client invalide');
    }
    
    return clientId;
};

const validateDateRange = (data) => {
    const { error, value } = dateRangeSchema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
    }
    
    return value;
};

module.exports = {
    validateCommande,
    validateCommandeId,
    validateClientId,
    validateDateRange,
};
