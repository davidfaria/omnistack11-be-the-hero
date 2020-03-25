const kenx = require('knex');
const kenxConfig = require('../../knexfile');

const connection = kenx(kenxConfig.development);

module.exports = connection;
