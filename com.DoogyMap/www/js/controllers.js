angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams) {
	
})

.controller('PlacesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('startCtrl', function($scope, $ionicModal, $timeout, $state) {
    
        // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
      id: '1',
    scope: $scope
  }).then(function(modal) {
    $scope.modalLo = modal; 
  });
    
    // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/registra.html', {
      id: '2',
    scope: $scope
  }).then(function(modal) {
    $scope.modalRe = modal; 
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function(index) {
          if (index == 1) $scope.modalLo.hide(); 
      else $scope.modalRe.hide();
  };

  // Open the login modal
  $scope.openModal = function(index) {
    if (index == 1) $scope.modalLo.show();
      else $scope.modalRe.show();
    };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(index) {
    console.log('Doing login', $scope.loginData);
	  
	   $timeout(function(index) {
      $state.go('tab.profile');
      $scope.closeModal(index);
    
    }, 1000);
  };

})

.controller('PlaceDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
        function initialize() {
        var myLatlng = new google.maps.LatLng(9.9352834,-84.0750603);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
});
