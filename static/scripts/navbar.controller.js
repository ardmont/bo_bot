(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('NavBarController', NavBarController);

    NavBarController.$inject = ['$scope', '$http', '$uibModal'];

    function NavBarController($scope, $http, $uibModal) {
        var vm = this;
        vm.selectedTipo;
        vm.openModalFiltros = openModalFiltros;
       
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