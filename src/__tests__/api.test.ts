import request from "supertest";
import { expect } from "chai";
import app from "../app.js"; // Note the .js extension
import { describe, it } from "node:test";

describe("API Endpoints", () => {
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const response = await request(app).get("/");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Welcome to Cat Café API"
      );
    });
  });

  describe("GET /api/cats", () => {
    it("should return list of cats", async () => {
      const response = await request(app).get("/api/cats");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });
});
