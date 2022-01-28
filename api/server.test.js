// const request = require('supertest');
// const server = require('../api/server');
// const User = require('../api/users/users-model');
const db = require("../data/dbConfig");
// const Jokes = require('./jokes/jokes-data');

test("Sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe("Testing on testing environment", () => {
  it("Check Environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});
