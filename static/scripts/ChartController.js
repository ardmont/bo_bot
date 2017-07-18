(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$scope', 'GoogleMapsService', 'Violence','$http', '$uibModal', '$sessionStorage'];

    function ChartController ($scope,GoogleMapsService,Violence, $http, $uibModal, $sessionStorage) {
        var vm = this;
        vm.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.4)",
                    strokeColor: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(151,187,205,0.4)",
                    strokeColor: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
}
})();