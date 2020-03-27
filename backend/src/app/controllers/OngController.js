const generateUniqueId = require('../util/generateUniqueId');
const db = require('../../database');

module.exports = {
  async index(req, res) {
    const ongs = await db('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.status(201).json({ id });
  }
};
