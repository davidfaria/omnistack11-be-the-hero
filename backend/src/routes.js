const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

/**
 * Controllers
 */

const SessionController = require('./app/controllers/SessionController');
const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const ProfileController = require('./app/controllers/ProfileController');

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.store
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);
routes.post('/incidents', IncidentController.store);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.destroy
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

module.exports = routes;
