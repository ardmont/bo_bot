(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', 'GoogleMapsService', '$http', '$uibModal'];

    function MapController ($scope,GoogleMapsService, $http, $uibModal) {
        var vm = this;
        vm.selectedTipo;
        vm.openModalFiltros = openModalFiltros;
        vm.filtrarPorTipo = filtrarPorTipo;

        function filtrarPorTipo(){
            GoogleMapsService.init(undefined, $scope.selectedTipo);
        }
        //GoogleMaps.init();
    
        navigator.geolocation.getCurrentPosition(function(position){
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            GoogleMapsService.init(latlng);
      
 
        }, function(error){
            console.log("Could not get location");
 
        GoogleMapsService.init();
    });
        function openModalFiltros(){
		 $uibModal.open({
                    templateUrl: 'filtros.html',
                    controller: 'FiltrosController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg'
                    
                }).result.then(function(result) {
                   $scope.selectedTipo = result;
                }, function() {
                    
                });
        }

    }
})();