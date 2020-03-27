const kenx = require('knex');
const kenxConfig = require('../../knexfile');

const config =
  process.env.NODE_ENV === 'test' ? kenxConfig.test : kenxConfig.development;

const connection = kenx(config);

module.exports = connection;
