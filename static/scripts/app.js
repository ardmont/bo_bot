var map = null;
var markersmap = [];
var heatmapData = [];
var heatmap;
var markerCluster;
var TILE_SIZE = 256;
var desiredRadiusPerPointInMeters = 300;
angular.module("bobotApp"
    ,['ui.bootstrap'
    ,'ui.router'
    ,'ngResource'
    , 'ngStorage'
    , 'chart.js'
    ]).run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
