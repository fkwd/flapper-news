var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upVotes: {type: Number, default: 0},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.upVote = function (cb) {
  this.upVotes += 1;
  this.save(cb);
};

mongoose.model('Post', PostSchema);
