// TODO: Kevin 2019-10 Mock with in memory db
const Fastify = require("fastify");
const { appInit } = require("../helpers/router");

describe("routes/project", () => {
  let app;
  let mongoose;

  beforeAll(async () => {
    ({ app, mongoose } = appInit({ logger: true }));
  });

  afterAll(async () => {
    app.close();
    await mongoose.stop();
  });

  describe("getProjectList()", () => {
    it("success", async () => {
      try {
        const res = await app.inject({ method: "GET", url: "/api/v1/projects" });
        expect(res.statusCode).toBe(200);
        expect(res.body.projects[0]._id).toBe("fS50wWyBY");
      } catch (err) {
        return err;
      }
    });
  });

  describe("getProject()", () => {
    it("success", async () => {
      const res = await app.inject({ method: "GET", url: "/api/v1/projects/fS50wWyBY" });
      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
      expect(JSON.parse(res.body)._id).toBe("fS50wWyBY");
    });
  });

  describe("getProjectByName()", () => {
    it("success", async () => {
      const res = await app.inject({ method: "GET", url: "/api/v1/projects/project/kowalla;" });
      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
      expect(JSON.parse(res.body)._id).toBe("fS50wWyBY");
    });
  });
});
