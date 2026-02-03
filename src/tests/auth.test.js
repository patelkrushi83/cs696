const supertest = require("supertest");
const serverApp = require("../../server");
//tets case for signup
describe("User signup", () => {
    test("creates a new user account", async () => {
        const output = await supertest(serverApp)
            .post("/api/auth/signup")
            .send({
                name: "Krushi Patel945",
                username: "KrushiPatel965",
                email: "krushipatel97@gmail.com",
                password: "Krushi@145"
            });

        expect(output.status).toEqual(201);
    });
});

//test case for the login
const supertest = require("supertest");
const serverApp = require("../../server");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const SALT_ROUNDS = 10;

describe("POST /api/auth/login", () => {

    let testUser;

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        //clearing the DB to avoid the duplication
        await mongoose.connection.dropDatabase();
        const passwordHash = await bcrypt.hash("Krushi@145", SALT_ROUNDS);
        testUser = await User.create({
            name: "Krushi Patel945",
            username: "KrushiPatel965",
            email: "krushipatel97@gmail.com",
            passwordHash
        });
    });

    afterAll(async () => {
        //cleaning up the user
        await User.deleteMany({});
    });

    it("should login successfully with email", async () => {
        const res = await supertest(serverApp)
            .post("/api/auth/login")
            .send({
                emailOrUsername: "krushipatel97@gmail.com",
                password: "Krushi@145"
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});