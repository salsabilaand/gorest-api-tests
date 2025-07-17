const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const baseUrl = server().baseUrl;
const authToken = server().authToken;

let userId;

describe('User API Tests (GoREST)', () => {

  it('should return 201 for valid new user', async () => {
    const newUser = {
      name: "Salsabila",
      email: `salsabila.${Date.now()}@example.com`,
      gender: "female",
      status: "active"
    };

    const response = await request(baseUrl)
      .post('/users')
      .set('Authorization', authToken)
      .send(newUser);

    console.log('CREATE RESPONSE:', response.body);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");

    userId = response.body.id;
  });

  it('should return 422 when creating user without email', async () => {
    const newUser = {
      name: "Invalid User",
      gender: "male",
      status: "active"
    };

    const response = await request(baseUrl)
      .post('/users')
      .set('Authorization', authToken)
      .send(newUser);

    console.log('CREATE NEGATIVE RESPONSE:', response.body);

    expect(response.status).to.equal(422);
    expect(response.body[0]).to.have.property("field", "email");
  });

  it('should return 200 on get created user details', async () => {
    const response = await request(baseUrl)
      .get(`/users/${userId}`)
      .set('Authorization', authToken);

    console.log('GET RESPONSE:', response.body);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("id", userId);
  });

  it('should return 200 on update user', async () => {
    const updatedData = {
      name: "Salsabila Updated",
      status: "inactive"
    };

    const response = await request(baseUrl)
      .put(`/users/${userId}`)
      .set('Authorization', authToken)
      .send(updatedData);

    console.log('UPDATE RESPONSE:', response.body);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("name", "Salsabila Updated");
  });

  it('should return 204 on delete user', async () => {
    const response = await request(baseUrl)
      .delete(`/users/${userId}`)
      .set('Authorization', authToken);

    console.log('DELETE RESPONSE:', response.status);
    expect(response.status).to.equal(204);
  });

});
