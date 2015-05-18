angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope) {




var viewportHeight;
var viewportWidth;
if (document.compatMode === 'BackCompat') {
    viewportHeight = document.body.clientHeight;
    viewportWidth = document.body.clientWidth;
} else {
    viewportHeight = document.documentElement.clientHeight;
    viewportWidth = document.documentElement.clientWidth;
};

console.log("Width: " + viewportWidth);
$scope.VW = 300;//(viewportWidth).toString();
console.log("Width: " + $scope.VW);

	var data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
	};

	var ctx = document.getElementById("myChart").getContext("2d");
	console.log("ctx: " + ctx);
	var myNewChart =  new Chart(ctx).Line(data, {});
})

.controller('SandboxCtrl', function($scope, $stateParams, Chats) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
