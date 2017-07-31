(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', 'GoogleMapsService', 'Violence','$http', '$uibModal', '$sessionStorage'];

    function MapController ($scope,GoogleMapsService,Violence, $http, $uibModal, $sessionStorage) {
        var vm = this;
        vm.selectedTipo;
        vm.filtrarPorTipo = filtrarPorTipo;
        
        function filtrarPorTipo(){
            GoogleMapsService.init(undefined, $scope.selectedTipo);
        }
        //GoogleMaps.init();
        if(!$sessionStorage.location) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                $sessionStorage.location = latlng;
                GoogleMapsService.init(latlng);
                Violence.query(function (result) {
                    console.log(result);
                    GoogleMapsService.addMarker(result);
                });

            }, function (error) {
                console.log("Could not get location");
                alert("Erro: Não foi possivel obter sua localização, parece que você não está conectado a internet.");

                //GoogleMapsService.init();
            }, {timeout:10000});
        }
        else{
            if(map) {
                GoogleMapsService.clear();
            }
            GoogleMapsService.init($sessionStorage.location);
            Violence.query(function (result) {
                // console.log(result);
                GoogleMapsService.addMarker(result);
            });
        }

        $scope.$on('filtroSuccess', function (event, result){
            // console.log(result);
            if(map) {
                GoogleMapsService.clear();
            }
           // GoogleMapsService.init($sessionStorage.location);
            GoogleMapsService.addMarker(result);
        } )
         $scope.$on('clearFilters', function (event, result){
            if(map) {
                GoogleMapsService.clear();
            }
            GoogleMapsService.init($sessionStorage.location);
            Violence.query(function (result) {
                // console.log(result);
                GoogleMapsService.addMarker(result);
            });
        } )
}
})();