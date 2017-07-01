(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', 'GoogleMapsService', 'Violence','$http', '$uibModal'];

    function MapController ($scope,GoogleMapsService,Violence, $http, $uibModal) {
        var vm = this;
        vm.selectedTipo;
        vm.filtrarPorTipo = filtrarPorTipo;
        
        function filtrarPorTipo(){
            GoogleMapsService.init(undefined, $scope.selectedTipo);
        }
        //GoogleMaps.init();
        
        navigator.geolocation.getCurrentPosition(function(position){
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            GoogleMapsService.init(latlng);
            Violence.query(function(result){
            console.log(result);
            GoogleMapsService.addMarker('result');
        });
      
        }, function(error){
            console.log("Could not get location");
 
            GoogleMapsService.init();
        });
}
})();