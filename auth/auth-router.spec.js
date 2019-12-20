const request = require("supertest");

const server = require("../api/server.js");

const db = require("../database/dbConfig.js");

const Users = require("./auth-router.js");


describe("server.js", function() {
    describe("environment", function() {
        it("should set environment to testing", function() {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("GET /api/auth", function() {
        it("should return a 200 OK", function() {
        return request(server)
            .get("/api/auth")
            .then(res => {
            expect(res.status).toBe(200);
            });
        });

        it("should return a JSON", function() {
        return request(server)
            .get("/api/auth")
            .then(res => {
            expect(res.type).toMatch(/json/i);
            });
        });

        it("should return {api: 'up'}", function() {
        return request(server)
            .get("/api/auth")
            .then(res => {
            expect(res.body.api).toBe("up");
            });
        });

    });

    describe("GET /api/auth/users", function() {
        it("should return a 200 OK", function() {
        return request(server)
            .get("/api/auth/users")
            .then(res => {
            expect(res.status).toBe(200);
            });
        });

        it("should return a JSON", function() {
        return request(server)
            .get("/api/auth/users")
            .then(res => {
            expect(res.type).toMatch(/json$/i);
            });
        });
    });

    describe("Post /api/register", function() {

        beforeEach(async() => {
            await db("users").truncate();
        });//end of async clean up function

        it('Should return the username and return the created id of 1', async function(){
            const user = { username: "Paris", password: "I am a fashion icon."}
            const res = await request(server)
                .post("/api/auth/register")
                .send(user);
            expect(res.body).toMatchObject({ username: "Paris" })
            expect(res.body).toMatchObject({ id: 1})
        })

        it('Should return status 201 created', async function(){
            const user = { username: "paris", password: "I am a fashion icon."}
            const res = await request(server)
                .post("/api/auth/register")
                .send(user);
                expect(res.status).toBe(201);
        })
    });

    describe("Post /api/login", function() {

        beforeEach(async() => {
            await db("users").truncate();
        });//end of async clean up function

        it('Should return the welcome message contain username', async function(){
            const user = { username: "Paris", password: "I am a fashion icon."}
            await request(server)
                .post("/api/auth/register")
                .send(user);
            const res= await request(server)
                .post("/api/auth/login")
                .send(user);
            expect(res.body.message).toContain(user.username)
            expect(res.body.message).toContain("Welcome")
        })

        it('Should return status 200 ok', async function(){
            const user = { username: "paris", password: "I am a fashion icon."}
            await request(server)
                .post("/api/auth/register")
                .send(user);
            const res = await request(server)
                .post("/api/auth/login")
                .send(user);
                expect(res.status).toBe(200);
        })

    });


})

