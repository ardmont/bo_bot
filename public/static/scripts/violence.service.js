(function() {
    'use strict';
    angular
        .module('bobotApp')
        .factory('Violence', Violence);

    Violence.$inject = ['$resource'];

    function Violence ($resource) {
        var resourceUrl =  'https://hackfestbobot.herokuapp.com/messenger/get_violence/:id';

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