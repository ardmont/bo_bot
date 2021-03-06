(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('FiltrosController', FiltrosController);

    FiltrosController.$inject = ['$timeout', '$scope', '$uibModalInstance', '$filter', 'ViolenceTipo', '$rootScope', '$q'];

    function FiltrosController ($timeout, $scope, $uibModalInstance, $filter, ViolenceTipo, $rootScope, $q) {
        var vm = this;
        	vm.tiposOcorrencias = [{tipo:"Assalto", value:"assalto"}, {tipo:"Roubo", value:"roubo"}, {tipo:"Violência Sexual", value:"abuso_sexual"}
            , {tipo:"Vandalismo", value:"vandalismo"}, {tipo:"Homicídio", value:"homicidio"}, {tipo:"Racismo/Gênero", value:"racismo_genero"}, {tipo:"Volência escolar", value:"violencia_escolar"}
            , {tipo:"Tráfico de drogas", value:"trafico_de_drogas"}, {tipo:"Violência policial", value:"violencia_policial"}, {tipo:"Violência contra a mulher", value:"violencia_mulher"}];

        vm.clear = clear;
        vm.save = save;
      
        function clear () {
            vm.tipoList=[];
            $rootScope.$broadcast("clearFilters");
            $uibModalInstance.dismiss('cancel');
        }
        vm.results = [];
        vm.vil=[];
        function save () {
            if(vm.tipoList && vm.tipoList.length > 0){
                vm.tipoList.forEach(function (filtro) {

                        vm.vil.push(ViolenceTipo.query({id:filtro.value}).$promise);



                });
                $q.all(vm.vil).then(function (ob) {
                    if(ob.length > 0){
                      for(var i =0; i < vm.vil.length; i++){
                          for(var j =0; j < ob.length; j++){
                              if(ob[i].length > 0){
                                  vm.results.push(ob[i][j]);
                              }

                          }
                      }
                      if(vm.results.length > 0 && vm.results[0] != undefined){
                          $rootScope.$broadcast("filtroSuccess", vm.results);
                          $uibModalInstance.close(vm.results);
                          vm.tipoList=[];
                      }
                      else{
                          vm.alert = "Nenhum resultado para os filtros informados.";
                      }


                    }
                })


            }
            else{

                 $uibModalInstance.close(null);
            }
            
        }
        vm.selectedTipo = function () {
             vm.tipoList = $filter('filter')(vm.tiposOcorrencias, {checked: true});
        }
       

    }
})();