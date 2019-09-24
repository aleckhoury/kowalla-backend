const request = require("supertest");
const _ = require("lodash");
const { mongooseConnect } = require("../helpers/mongoose");
const { appInit } = require("../helpers/express");

describe("routes/project", () => {
  let app;

  beforeAll(async () => {
    await mongooseConnect();
    app = appInit();
  });

  describe("getProjectList()", () => {
    it("success", async () => {
      const res = await request(app)
        .get("/api/v1/projects")
        .set("Accept", "application/json")
        .expect(200);

      expect(res.body.projects[0]._id).toBe("fS50wWyBY");
    });
  });

  describe("getProject()", () => {
    it("success", async () => {
      const res = await request(app)
        .get("/api/v1/projects/fS50wWyBY")
        .set("Accept", "application/json")
        .expect(200);

      expect(res.body._id).toBe("fS50wWyBY");
    });
  });

  describe("getProjectByName()", () => {
    it("success", async () => {
      const res = await request(app)
        .get("/api/v1/projects/project/kowalla;")
        .set("Accept", "application/json")
        .expect(200);

      expect(res.body._id).toBe("fS50wWyBY");
    });
  });
});
