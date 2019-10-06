// TODO: Kevin 2019-10 Mock with in memory db
const { appInit } = require('../helpers/router');
const Project = require('../models/project');

describe('routes/project', () => {
  let app;
  let mongoose;

  beforeAll(async () => {
    ({ app, mongoose } = appInit({ logger: false, mongoUrl: global.__MONGO_URI__ }));
    app.register(async () => {
      await Project.create({
        _id: 'fS50wWyBY',
        isProject: true,
        admins: ['Stok1rmK8'],
        name: 'kowalla',
        reputation: 0,
        projectName: 'Kowalla',
        description: "The world's online coworking space, for testing!",
        profilePicture: 'https://ui-avatars.com/api/?name=Kowalla&background=0a2049&color=fff&bold=true&size=200&font-size=0.6',
        headerPicture: '',
        createdAt: new Date('2019-09-24T03:25:34.420Z'),
        updatedAt: new Date('2019-10-02T18:16:19.655Z')
      });
    });
  });

  afterAll(async () => {
    app.close();
    await mongoose.stop();
  });

  describe('getProjectList()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/projects' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body).projects[0]._id).toBe('fS50wWyBY');
    });
  });

  describe('getProject()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/projects/fS50wWyBY' });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(JSON.parse(res.body)._id).toBe('fS50wWyBY');
    });
  });

  describe('getProjectByName()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/projects/project/kowalla' });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(JSON.parse(res.body)._id).toBe('fS50wWyBY');
    });
  });
});
