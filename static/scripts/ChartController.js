(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$scope', 'DateUtils', 'Violence','$http', '$uibModal', '$sessionStorage', '$q', '_'];

    function ChartController ($scope,DateUtils,Violence, $http, $uibModal, $sessionStorage, $q, _) {
        var vm = this;
        vm.violencias = Violence.query();
        $q.all([vm.violencias.$promise]).then(function () {
            var groupedByMonth = _.groupBy(vm.violencias, function(item) {
                if(item.violence_date) {
                    return item.violence_date.substring(6, 7);
                }
            });
            var groupdByTipo = _.countBy(vm.violencias, 'violence_type');
            vm.pie.labels = _.map(groupdByTipo, function (value, key) {
                return key;
            });
            vm.pie.data = _.map(groupdByTipo, function (value, key) {
                return value;
            });
            console.log(vm.pie.labels);
            var dataMes = [];
            delete groupedByMonth[undefined];
            for(var i = 0; i < 12; i++){

                dataMes[i] = (groupedByMonth[i+1] ? groupedByMonth[i+1].length : 0);
            }
            vm.bar.data.push(dataMes);
            console.log(vm.bar.data);
        });

        vm.bar = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            series: ['Series A'],
            data:[]

        };

        vm.pie = {
        };
}
})();