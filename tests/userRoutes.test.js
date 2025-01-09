const request = require('supertest');
const app = require('../app'); // Assuming your Express app is in 'app.js'
const mongoose = require('mongoose');
const User = require('../models/User'); // Your User model

describe('User API Tests', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up the test database
    await User.deleteMany();
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(res.body.name).toBe('Jane Doe');
    expect(res.body.email).toBe('jane@example.com');
    userId = res.body._id; // Save the user ID for future tests
  });

  it('should log in the user and return a token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'jane@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(res.body.token).toBeDefined();
    token = res.body.token; // Save the token for future tests
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0); // Should return at least 1 user
  });

  it('should access the secret route with valid token', async () => {
    const res = await request(app)
      .get('/secret')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.secret).toBe('This is protected data!');
  });

  it('should update the user', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Updated Jane Doe',
      })
      .expect(200);

    expect(res.body.name).toBe('Updated Jane Doe');
  });

  it('should delete the user', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .expect(200);

    expect(res.body.message).toBe('Användare borttagen');
  });
});
