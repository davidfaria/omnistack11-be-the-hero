const db = require('../../database');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await db('incidents').count();

    const incidents = await db('incidents')
      .join('ongs', 'ongs.id', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    console.log({ title, description, value, ong_id });

    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },
  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await db('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).jons({ error: 'Operation not permitted' });
    }

    await db('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  }
};
