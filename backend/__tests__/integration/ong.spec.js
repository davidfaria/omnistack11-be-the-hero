const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database');

describe('ONG', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const res = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'apad@gmail.com',
        whatsapp: '31988697196',
        city: 'Ipatinga',
        uf: 'MG'
      });

    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });
});
