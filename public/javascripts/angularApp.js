var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function (posts) {
          return posts.getAll();
        }]
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function ($http) {
  var o = {
    posts: [],
    getAll: function () {
      return $http.get('/posts').success(function (data) {
        angular.copy(data, o.posts);
      });
    },
    create: function (post) {
      return $http.post('/posts', post).success(function (data) {
        o.posts.push(data);
      });
    },
    upVote: function (post) {
      return $http.put('/posts/' + post._id + '/upVote')
        .success(function (data) {
          post.upVotes += 1;
        });
    }
  };
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {

  $scope.posts = posts.posts;

  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    posts.create({
      title: $scope.title,
      link: $scope.link
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpVotes = function (post) {
    posts.upVote(post);
  }

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts) {

  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function () {
    if ($scope.body === '') {
      return;
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upVotes: 0
    });
    $scope.body = '';
  }

}]);