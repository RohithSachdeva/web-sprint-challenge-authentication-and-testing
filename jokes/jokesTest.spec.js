const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');



describe('Joke Router Testing', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('Returns please provide credentials', () => {
        return request(server).get('/api/jokes')
            .then(data => {
                console.log(data.text)
                expect(data.body.message).toEqual("Please provide credentials")
            });
    });

    it('Returns correct unauthorized status code', () => {
        return request(server).get('/api/jokes')
        .then(data => {
            expect(data.status).toEqual(401)
        })
    });
})

// it('Creates and account and returns a joke', async () => {
    //     await request(server).post("/api/auth/register").send({ username: "Rohith555", password: "Secret50" });

    //    const login = await request(server).post("/api/auth/login").send({ username: "Rohith555", password: "Secret50" });

    //     await request(server).get("/api/jokes").set("authorization", login.body.token);
    //     const response = await request(server);
    //     expect(response.body).toHaveProperty("id");
    // })
    // it()




//Joke router 
//Returns proper message and status message?  





//Returns 20 jokes with an id, joke property
// {
//     "id": "0ozAXv4Mmjb",
//     "joke": "Why did the tomato blush? Because it saw the salad dressing."
// },

//How to set into authorization? .. does it need to be header specific or 
// {
//     "message": "Welcome",
//     "username": "RohithisCool",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvaGl0aGlzQ29vbCIsImlhdCI6MTU5ODAyNjk0NiwiZXhwIjoxNTk4MTEzMzQ2fQ.HwhYXctPJUjLWzPIw9Otdtv7rIJi5762hPS5LiIuon8"
// }

//body.token 

//Add awaits to register/login tests 
//


//Test jokes not returning without credentials... test successful return?  
//assign await to constants?  
// res = await request(server) .. login = await  etc... Won't be insertion directly to database .. we could add that to the model


// const res = await request(server).get("/");

//             expect(res.type).toMatch(/json/i);
//         });
//     });

//     describe("POST /hobbits", () => {
//         it("should add hobbits", async () => {
//             // truncate the table to make sure it's empty
//             // happens in the beforeEach() global

//             // make request, send data
//             await request(server).post("/hobbits").send({
//                 name: "gaffer",
//             });

//             // check the hobbit is in the database (without using the GET / route)
//             const hobbits = await db("hobbits");

//             expect(hobbits).toHaveLength(1);
//         });
//     });
// });

// it('Creates and account and returns a joke', async () => {
    //     await request(server).post("/api/auth/register").send({ username: "Rohith555", password: "Secret50" });

    //     await request(server).post("/api/auth/login").send({ username: "Rohith555", password: "Secret50" });

    //     const login = await request(server);

    //     await request(server).get("/api/jokes").set("authorization", login.body.token);
    //     const response = await request(server);
    //     expect(response.body).toHaveProperty("id");
    // })