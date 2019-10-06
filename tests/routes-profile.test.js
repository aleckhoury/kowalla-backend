const { appInit } = require('../helpers/router');
const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/comment');

describe('routes/project', () => {
  let app;
  let mongoose;

  beforeAll(async () => {
    ({ app, mongoose } = appInit({ logger: false, mongoUrl: global.__MONGO_URI__ }));
    app.register(async () => {
      await Profile.create({
        _id: 'vRhMPofG4',
        reputation: 0,
        integrations: ['Embed Video'],
        githubToken: '',
        firstName: 'alectestx',
        lastName: 'Tester',
        username: 'alectestx',
        description: '',
        profilePicture: 'https://ui-avatars.com/api/?name=alectestx&background=0a2049&color=fff&bold=true&size=200&font-size=0.6',
        userId: 'AT01WdXf',
        createdAt: new Date('2019-10-01T03:51:07.008Z'),
        updatedAt: new Date('2019-10-02T18:18:57.440Z')
      });

      await Post.create({
        _id: '5SF9u8S7',
        profileId: 'vRhMPofG4',
        spaceId: 'e6GfbuWDX',
        content: '<p>Test Post</p>',
        views: 0,
        duration: null,
        start: new Date('2019-09-27T13:51:08.480Z'),
        end: null,
        isActive: false,
        username: 'alec',
        createdAt: new Date('2019-09-27T13:51:08.491Z'),
        updatedAt: new Date('2019-09-27T13:51:08.491Z')
      });

      await Comment.create({
        _id: '5fFoj20dp',
        profileId: 'vRhMPofG4', // id of the poster
        postId: '5SF9u8S7',
        updateId: 'YYYYYY',
        commentId: 'XXXXXX',
        content: 'Hello',
        views: 25
      });
    });
  });

  afterAll(async () => {
    app.close();
    await mongoose.stop();
  });

  describe('getProfileList()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/profiles' });
      expect(res.statusCode).toBe(200);
      const list = JSON.parse(res.body);
      expect(list.profiles.length).toBe(1);
      expect(list.profiles[0]._id).toBe('vRhMPofG4');
    });
  });

  describe('getProfile()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/profiles/vRhMPofG4' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body)._id).toBe('vRhMPofG4');
    });
  });

  describe('getProfilerByUsername()', () => {
    it('success', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/profiles/user/alectestx' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body)._id).toBe('vRhMPofG4');
    });
  });

  describe('createProfile()', () => {
    it('success', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/profiles',
        payload: {
          reputation: 0,
          integrations: ['Embed Video'],
          githubToken: '',
          firstName: 'Second',
          lastName: 'User',
          username: 'seconduser',
          description: '',
          profilePicture: 'https://ui-avatars.com/api/?name=alectestx&background=0a2049&color=fff&bold=true&size=200&font-size=0.6',
          userId: 'h50fj0Adf'
        }
      });
      expect(res.statusCode).toBe(201);
      expect(JSON.parse(res.body).username).toBe('seconduser');
    });
  });

  describe('updateProfile()', () => {
    it('success', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/profiles/vRhMPofG4',
        payload: {
          username: 'alectestx',
          firstName: 'Third'
        }
      });
      expect(res.statusCode).toBe(200);
      const profile = JSON.parse(res.body);
      expect(profile.firstName).toBe('Third');
      expect(profile.lastName).toBe('Tester');
    });
  });
});
