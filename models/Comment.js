var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upVotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

CommentSchema.methods.update = function (cb) {
  this.upVotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);
