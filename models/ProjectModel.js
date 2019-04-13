const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

//import SubscriptionModel from './SubscriptionModel';

const Subscription = require('./SubscriptionModel');

const ProjectSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  isProject: { type: String, default: true },
  name: String,
  description: String,
  profilePicture: String, // TODO: change to actual image storage
  headerPicture: String, // TODO: change to actual image storage
  admins: [String],
  //subscribers: { type: Number, default: 0 }, // need to implement update
  reputation: { type: Number, default: 0 }, // need to implement update
  //postCount: { type: Number, default: 0 }, // need to implement update
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
},
/*{
  timestamps: true
}*/);

ProjectSchema.virtual('subscribers', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'projectId',
  count: true,
});

ProjectSchema.virtual('postCount', {
  ref: 'post',
  localField: '_id',
  foreignField: 'projectId',
  count: true,
});


const Project = mongoose.model('project', ProjectSchema);



module.exports = Project;
