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

  describe("getProfilerByUsername()", () => {
    it("success", async () => {
      const res = await app.inject({ method: "GET", url: "/api/v1/profiles/user/alectestx" });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body)._id).toBe("vRhMPofG4");
    });
  });
});
