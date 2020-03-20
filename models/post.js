const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require('../utils/autopopulate');

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  url: { type: String, required: false },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  totalLikes : {type: Number}
});

PostSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  });

module.exports = mongoose.model("Post", PostSchema);