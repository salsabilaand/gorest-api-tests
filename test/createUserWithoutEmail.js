const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const baseUrl = server().baseUrl;
const authToken = server().authToken;

describe('NEGATIVE: Create User Without Email (GoREST)', () => {
  it('should return 422 when creating user without email', async () => {
    const invalidUser = {
      name: "Salsa",
      gender: "female",
      status: "active"
      // Missing 'email'
    };

    const response = await request(baseUrl)
      .post('/users')
      .set('Authorization', authToken)
      .send(invalidUser);

    console.log('NEGATIVE CREATE RESPONSE:', response.body);

    expect(response.status).to.equal(422);
    expect(response.body[0]).to.have.property("field", "email");
    expect(response.body[0]).to.have.property("message").that.includes("can't be blank");
  });
});
