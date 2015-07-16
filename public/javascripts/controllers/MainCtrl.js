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
