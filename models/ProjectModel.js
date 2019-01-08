const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  profilePicture: String, // TODO: change to actual image storage
  headerPicture: String, // TODO: change to actual image storage
  admins: [String] // need to change to direct object references?
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
