import supertest from "supertest";
import { expect } from "chai";
import app from "./app.js";
import { Adopter } from "./types/adopter.js";

describe("/api/adopters", () => {
  describe("GET /api/adopters", () => {
    it("should return a list of adopters", async () => {
      const response = await supertest(app)
        .get("/api/adopters")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).to.be.an("array");
      // Check each adopter object has the required properties
      response.body.forEach((adopter: Adopter) => {
        expect(adopter).to.include.keys(
          "id",
          "name",
          "lastName",
          "dateOfBirth",
          "phone",
          "address"
        );
      });
    });
  });

  describe("GET /api/adopters/:id", () => {
    it("should return a single adopter when given a valid id", async () => {
      const adopterId = 1;
      const response = await supertest(app)
        .get(`/api/adopters/${adopterId}`)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).to.be.an("object");
      expect(response.body.id).to.equal(adopterId);
      expect(response.body).to.include.keys(
        "name",
        "lastName",
        "dateOfBirth",
        "phone",
        "address"
      );
    });

    it("should return 404 when the adopter does not exist", async () => {
      const nonExistentId = 999;
      await supertest(app).get(`/api/adopters/${nonExistentId}`).expect(404);
    });
  });

  describe("POST /api/adopters", () => {
    it("should create a new adopter", async () => {
      const newAdopter = {
        name: "Jane",
        lastName: "Doe",
        dateOfBirth: new Date(1995, 5, 15).toISOString(),
        phone: 123456789,
        address: "New Address 9999",
      };

      const response = await supertest(app)
        .post("/api/adopters")
        .send(newAdopter)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("id");
      expect(response.body.name).to.equal(newAdopter.name);
      expect(response.body.lastName).to.equal(newAdopter.lastName);
      expect(response.body.dateOfBirth).to.equal(newAdopter.dateOfBirth);
      expect(response.body.phone).to.equal(newAdopter.phone);
      expect(response.body.address).to.equal(newAdopter.address);
    });
  });
});
