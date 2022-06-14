const request = require("supertest");
const app = require("../../app");
const { mongoConnect } = require("../../utils/mongo.js");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeData = {
      mission: "Kepler Exploration X",
      rocket: "Explorer IS1",
      launchDate: "December 27, 2030",
      target: "Kepler-1410 b",
    };

    const dataWithoutDate = {
      ...completeData,
      launchDate: null,
    };

    for (let key in dataWithoutDate) {
      if (dataWithoutDate[key] === null) {
        delete dataWithoutDate[key];
      }
    }

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeData)
        .expect("Content-Type", /json/)
        .expect(201);
    });

    test("It should catch missing required launch property", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(dataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        code: 400,
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid launch date", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          ...dataWithoutDate,
          launchDate: "Hello",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        code: 400,
        error: "Invalid launch date",
      });
    });
  });
});
