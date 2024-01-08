process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");


let newItem = {
    name: "lion's mane mushrooms",
    price: 9.99
};

beforeEach(() => {
    items.push(newItem)
});

afterEach(() => {
    items.length = 0
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items")

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [newItem] })
    });
});

describe("GET /items/:name", () =>{
    test("Get single item by name", async () => {
        const res = await request(app).get(`/items/${newItem.name}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: newItem })
    });
    test("Responds with 404 if not found", async () => {
        const res = await request(app).get("/items/1234")
        expect(res.statusCode).toBe(404)
        expect(res.body.error).toEqual("Item not found")
    });
});

describe("POST /items", () => {
    test("Create new item", async () => {
        const addItem = {
            name: "pink oyster mushrooms", 
            price: 10.99
        }
        const res = await await request(app).post("/items").send(addItem)

        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ added: addItem })
    });
    test("Respond with 400 if require data is missing", async () => {
        const res = await request(app).post("/items").send({})
        expect(res.statusCode).toBe(400)
    })
});

describe("PATCH /items/:name", () =>{
    test("Update name and/or price of item", async () => {
        const updateTo = { 
            name: "pink oyster mushroom", 
            price: 10.99}
        const res = await request(app).patch(`/items/${newItem.name}`).send(updateTo)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: updateTo })
    });
    test("Responds with 404 if not found", async () => {
        const res = await request(app).get("/items/1234")
        expect(res.statusCode).toBe(404)
        expect(res.body.error).toEqual("Item not found")
    });
});

describe("DELETE /items/:name", () =>{
    test("Delete an item", async () => {
        const res = await request(app).delete(`/items/${newItem.name}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: `${newItem.name} has been deleted` })
    });
    test("Responds with 404 if not found", async () => {
        const res = await request(app).get("/items/1234")
        expect(res.statusCode).toBe(404)
        expect(res.body.error).toEqual("Item not found")
    });
});