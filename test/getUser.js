const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const baseUrl = server().baseUrl;
const authToken = server().authToken;
const userId = '8014424'; // Ganti dengan userId yang valid

describe('READ User', () => {
  it('should return 200 for user detail', async () => {
    const res = await request(baseUrl)
      .get(`/users/${userId}`)
      .set('Authorization', authToken); // ← pakai token dari env.js

    console.log('Tampil Data :', res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', Number(userId));
  });
});
