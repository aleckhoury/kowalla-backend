const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ProjectSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: String,
  description: String,
  profilePicture: String, // TODO: change to actual image storage
  headerPicture: String, // TODO: change to actual image storage
  admins: [String] // need to change to direct object references?
},
{
  timestamps: true
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
