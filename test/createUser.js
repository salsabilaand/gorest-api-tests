const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const { baseUrl, authToken } = server();

describe('CREATE User', () => {
  it('should return 201 for valid new user', async () => {
    const newUser = {
      name: 'Salsabila',
      email: `salsabila${Date.now()}@test.com`,
      gender: 'female',
      status: 'inactive',
    };

    const response = await request(baseUrl)
      .post('/users')
      .set('Authorization', authToken)
      .send(newUser);

    console.log('Status:', response.status);
    console.log('Body:', response.body);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
  });
});
