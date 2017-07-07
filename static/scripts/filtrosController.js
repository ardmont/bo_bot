(function() {
    'use strict';

    angular
        .module('bobotApp')
        .controller('FiltrosController', FiltrosController);

    FiltrosController.$inject = ['$timeout', '$scope', '$uibModalInstance', '$filter'];

    function FiltrosController ($timeout, $scope, $uibModalInstance, $filter) {
        var vm = this;
        	vm.tiposOcorrencias = [{tipo:"Assalto", value:"assalto"}, {tipo:"Roubo", value:"roubo"}, {tipo:"Violência Sexual", value:"vio_sexual"}
            , {tipo:"Vandalismo", value:"vandalismo"}, {tipo:"Homicídio", value:"homicidio"}];


        vm.clear = clear;
        vm.save = save;
      
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            if(vm.tipoList && vm.tipoList.length > 0){
                $uibModalInstance.close(vm.tipoList);
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