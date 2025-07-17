const request = require('supertest');
const { expect } = require('chai');
const server = require('../env');

const baseUrl = server().baseUrl;
const authToken = server().authToken;

// Ganti dengan ID user
const userId = '8014797';

describe('DELETE User', () => {
  it('should return 204 on delete user', async () => {
    const response = await request(baseUrl)
      .delete(`/users/${userId}`)
      .set('Authorization', authToken);

    console.log(`Deleted user ID: ${userId}`);
    console.log('Status:', response.status);

    expect(response.status).to.equal(204);
  });
});
