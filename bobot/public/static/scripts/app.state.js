(function() {
    'use strict';

    angular
        .module('bobotApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('app', {
            abstract:true,
            views: {
                'navbar@': {
                    templateUrl: 'navbar.html',
                    controller: 'NavBarController',
                    controllerAs: 'vm'
                }
            }
        }).state('home', {
            parent:'app',
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'home.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                   
                }
            }
        }).state('dashbord', {
            parent:'app',
            url: '/estatistica',
            views: {
                'content@': {
                    controller:'ChartController',
                    controllerAs: 'vm',
                    templateUrl: 'estatisticas.html',

                }
            }
        });
    }
})();
