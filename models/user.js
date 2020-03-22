const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
// const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, select: false },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, },
  organization: { type: String, },
  year: { type: Number, },
  height: { type: String, },
  weight: { type: String, },
  city: { type: String, },
  state: { type: String, },
  zip: { type: Number, },
  hudl: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  posts : [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favorites : [{ type: Schema.Types.ObjectId, ref: "User"}],
  videoFile: { type: String },
  highlights: { type: String},
  weightedGpa: { type: Number },
  unweightedGpa: { type: Number },
});

UserSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    // ENCRYPT PASSWORD
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  });
  
  // Need to use function to enable this.password to work.
  UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      done(err, isMatch);
    });
};

// UserSchema.plugin(mongoose_fuzzy_searching, {fields: ['username, year, height, weight, city, state, zip']});
  
module.exports = mongoose.model("User", UserSchema);