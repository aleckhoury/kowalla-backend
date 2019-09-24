const request = require("supertest");
const { mongooseConnect } = require("../helpers/mongoose");
const { appInit } = require("../helpers/express");

describe("routes/project", () => {
  let app;

  beforeAll(async () => {
    // TODO: Kevin 2019-10 Move into global Jest setup
    await mongooseConnect();
    app = appInit();
    return app;
  });

  describe("getProjectList()", () => {
    it("success", async () => {
      const res = await request(app)
        .get("/api/v1/projects")
        .set("Accept", "application/json")
        .expect(200);

      expect(res.body).toMatchSnapshot();
    });
  });
});
