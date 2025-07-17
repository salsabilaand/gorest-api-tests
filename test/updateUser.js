const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const baseUrl = server().baseUrl;
const authToken = server().authToken;

// Ganti dengan ID user valid yang ingin diupdate
const userId = '8014424';

describe('UPDATE User', () => {
  it('should return 200 on update user', async () => {
    const updatedUser = {
      name: "Salsabila Updated",
      email: "salsabila.updated@example.com",
      gender: "female",
      status: "active"
    };

    const response = await request(baseUrl)
      .put(`/users/${userId}`)
      .set('Authorization', authToken)
      .send(updatedUser);

    console.log('Update Data:', response.body);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'active');
    expect(response.body).to.have.property('name', updatedUser.name);
  });
});
