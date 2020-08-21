const request = require("supertest");
const server = require("../api/server.js")
const db = require("../database/dbConfig.js")

describe('Auth Router Testing', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('Successful register returns "message" property', async () => {
        const res = await request(server) 
        .post('/api/auth/register')
        .send({ username: "Rohith1", password: "secret" })
        expect(res.body).toHaveProperty("message");
    });

    it('Successful register returns correct status code', async () => {
        const res = await request(server) 
        .post('/api/auth/register')
        .send({ username: "Rohith2", password: "secret" })
        expect(res.status).toBe(200);
    });

    it('Successful login returns token', async () => {
        await request(server).post('/api/auth/register')
        .send({ username: "Rohith3", password: "secret" })
        const res = await request(server)
        .post('/api/auth/login')
        .send({ username: "Rohith3", password: "secret" })
        expect(res.body).toHaveProperty("token");
    });

    it('Successful login returns correct status code', async () => {
        await request(server).post('/api/auth/register')
        .send({ username: "Rohith4", password: "secret" })
        const res = await request(server)
        .post('/api/auth/login')
        .send({ username: "Rohith4", password: "secret" })
        expect(res.status).toBe(200);
    });
})

// it('Returns correct status code', () => {
    //     return request(server).get('/api/jokes')
    //     .then(data => {
    //         expect(data.status).toEqual(401)
    //     })
    // });



//Can do returns type JSON .. returns body.message 

//REGISTER RESPONSE
// {
//     "message": "You made it",
//     "username": "RohithisCool"
// }


//LOGIN RESPONSE
// {
//     "message": "Welcome",
//     "username": "RohithisCool",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvaGl0aGlzQ29vbCIsImlhdCI6MTU5ODAzMTI4NywiZXhwIjoxNTk4MTE3Njg3fQ.LV0nupf8KOgCpJTNLky4osIfPsQzM78c9NfD9S5ul74"
// }


//GUIDED PROJECT
// describe("GET /", () => {
//     it("should return 200 OK", () => {
//         return request(server)
//             .get("/")
//             .then(res => {
//                 expect(res.status).toBe(200);
//             });
//     });

//     it("should return 200 OK using async/await", async () => {
//         const res = await request(server).get("/");

//         expect(res.status).toBe(200);
//     });
