(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['Violence','$q', '_', '$scope'];

    function ChartController (Violence, $q, _, $scope) {
        var vm = this;
        vm.violencias = Violence.query();
        //Objeto que contem os dados do grafico pizza
        vm.pie = {};
        //Objeto que contem os dados do grafico de barras
        vm.bar = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            series: ['Series A'],
            data:[]

        };

        //Compila os dados indos do webservice e agrupa para apresentar nos graficos

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

        function compilaDadosFiltros(dados) {
            vm.bar.data = [];
            vm.pie.data =[];
            var groupedByMonth = _.groupBy(dados, function(item) {
                if(item.violence_date) {
                    return item.violence_date.substring(6, 7);
                }
            });
            var groupdByTipo = _.countBy(dados, 'violence_type');
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
        }

        $scope.$on('filtroSuccess', function (event, result) {
            compilaDadosFiltros(result);
        })


}
})();