const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const IntegrationSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, default: "" },
  description: { type: String, default: "" }
});

const Integration = mongoose.model("integration", IntegrationSchema);

module.exports = Integration;
