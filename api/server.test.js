const request = require("supertest");
const server = require("../api/server");
// const User = require("../api/users/users-model");
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

describe("Registration Endpoint", () => {
  const user = { username: "harrypotter", password: "1234" };
  const userOnly = { username: "harrypotter" };

  it("[GET] /auth/register - username only, no password, returns 401", async () => {
    let res = await request(server).post("/api/auth/register").send(userOnly);
    expect(res.status).toBe(401);
  });

  it("[GET] /auth/register - credentials complete, returns 201", async () => {
    let res = await request(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
  });

  it("[GET] /auth/register - after 201, confirmation in the db", async () => {
    const [userExists] = await db("users").where("username", user.username);
    expect(userExists).toMatchObject({ username: user.username });
  });

  it("[GET] /auth/register - existing user, returns 422", async () => {
    let res = await request(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(422);
  });
});

describe("Login Endpoint", () => {
  const user = { username: "harrypotter", password: "1234" };
  const userWrongPass = { user: "harrypotter", password: "lkajsdklf" };

  it("[GET] /auth/login - user can login, returns 200", async () => {
    let res = await request(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
  });

  it("[GET] /auth/login - invalid password, returns 401", async () => {
    let res = await request(server).post("/api/auth/login").send(userWrongPass);
    expect(res.status).toBe(401);
  });
});
