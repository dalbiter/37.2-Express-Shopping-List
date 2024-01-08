process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");


let newItem = {
    name: "Lion's Mane Mushrooms",
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
    })
})