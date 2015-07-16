app.factory('posts', ['$http', 'auth', function ($http, auth) {
  var service = {
    posts: [],
    getAll: function () {
      return $http.get('/posts').success(function (data) {
        angular.copy(data, service.posts);
      });
    },
    create: function (post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function (data) {
        service.posts.push(data);
      });
    },
    upVote: function (post) {
      return $http.put('/posts/' + post._id + '/upVote', null, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function (data) {
        post.upVotes += 1;
      });
    },
    get: function (id) {
      return $http.get('/posts/' + id).then(function (res) {
        return res.data;
      });
    },
    addComment: function (id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      });
    },
    upVoteComment: function (post, comment) {
      return $http.put('/posts/'  + post._id + '/comments/' + comment._id  + '/upVote', null, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data) {
        comment.upVotes += 1;
      });
    }
  };
  return service;
}]);
