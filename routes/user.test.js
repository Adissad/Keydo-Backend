var app = require("../app");
var request = require("supertest");

//    only one input field
test("only one input field", async () => {
    const { body } = await request(app).post("/signup").send({
      emailFromFront: "name",
    });
    expect(body).toStrictEqual({
      error: ["Format d'email incorrect"],
      result: false,
    });
  });