const express = require('express');

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
routes.post('/ongs', OngController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

routes.get('/profile', ProfileController.index);

module.exports = routes;
