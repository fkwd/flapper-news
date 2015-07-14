var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function () {
  return {posts: []};
}]);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {

  $scope.posts = posts.posts;

  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upVotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upVotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upVotes: 0}
      ]
    });
    $scope.title = '';
  };

  $scope.incrementUpVotes = function (post) {
    post.upVotes += 1;
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