(function() {
    'use strict';
    angular
        .module('bobotApp')
        .factory('ViolenceTipo', ViolenceTipo);

    ViolenceTipo.$inject = ['$resource'];

    function ViolenceTipo ($resource) {
        var resourceUrl =  'https://hackfestbot.herokuapp.com/messenger/get_violence_by_type/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();