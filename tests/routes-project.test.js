// TODO: Kevin 2019-10 Mock with in memory db
const request = require("supertest");
const { mongooseConnect } = require("../helpers/mongoose");
const { appInit } = require("../helpers/express");

describe("routes/project", () => {
  let app;
  let mongoose;

  beforeAll(async () => {
    mongoose = await mongooseConnect();
    app = appInit();
  });

  afterAll(async () => {
    await mongoose.stop();
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
