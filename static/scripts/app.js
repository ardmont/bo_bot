var map = null;
var markersmap = [];
var heatmapData2 = [];
var heatmap;
var markerCluster;
angular.module("bobotApp",[]).factory('GoogleMaps', function($http){
 
  var apiKey = false;
  
 
  function initMap(position, filtro){
 
    var options = {timeout: 10000, enableHighAccuracy: true};
		var zoom = 15;
      if(!position){
        position = new google.maps.LatLng(-14.0491211, -60.4393422);
				zoom = 5;
      }
      var mapOptions = {
        center: position,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

				
				if(map === null){
					map = new google.maps.Map(document.getElementById("mapViewDiv"), mapOptions);
					 var imagem = 'img/alerta.png';

       // Create the search box and link it to the UI element.
				  var input = document.getElementById('localConsultado');
				  var searchBox = new google.maps.places.SearchBox(input);
				  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				 
                   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
						
				  // Bias the SearchBox results towards current map's viewport.
				  map.addListener('bounds_changed', function() {
				    searchBox.setBounds(map.getBounds());
				  });
                  var markers = [];
				  // Listen for the event fired when the user selects a prediction and retrieve
				  // more details for that place.
				  searchBox.addListener('places_changed', function() {
				    var places = searchBox.getPlaces();

				    if (places.length == 0) {
				      return;
				    }

				    // Clear out the old markers.
				    markers.forEach(function(marker) {
				      marker.setMap(null);
				    });
				    markers = [];

				    // For each place, get the icon, name and location.
				    var bounds = new google.maps.LatLngBounds();
				    places.forEach(function(place) {
				      if (!place.geometry) {
				        console.log("Returned place contains no geometry");
				        return;
				      }
				      var icon = {
				        url: place.icon,
				        size: new google.maps.Size(71, 71),
				        origin: new google.maps.Point(0, 0),
				        anchor: new google.maps.Point(17, 34),
				        scaledSize: new google.maps.Size(25, 25)
				      };

				      // Create a marker for each place.
				      markers.push(new google.maps.Marker({
				        map: map,
				        icon: icon,
				        title: place.name,
				        position: place.geometry.location
				      }));
                        loadMarkers(place.geometry.location);
				      if (place.geometry.viewport) {
				        // Only geocodes have viewport.
				        bounds.union(place.geometry.viewport);
				      } else {
				        bounds.extend(place.geometry.location);
				      }
				    });
				    map.fitBounds(bounds);
                     
				  });
					
 
      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){
			
 			loadMarkers();
      });
			}
			if(filtro){
				DeleteMarkers();
				loadMarkersByFilter(filtro);
			}
		
     
  }

	 function DeleteMarkers() {
        //Loop through all the markers and remove
				heatmap.setMap(null);
				markerCluster = null;
        for (var i = 0; i < markersmap.length; i++) {
            markersmap[i].setMap(null);
        }
				 
        markersmap = [];
				heatmapData2 = [];
    };
 
  function loadMarkers(){
      //Get all of the markers from our Markers factory
      $http.get('http://196904bf.ngrok.io/getOcorrencias').then(function(markers){
 
        console.log("Markers: ", markers);
 
        var records = markers.data;
      
        
        for (var i = 0; i < records.length; i++) {
 
          var record = records[i];   
          var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
             heatmapData2.push(markerPos);

          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos,
              icon:"../Img/"+record.tipo+".png"
          });
          markersmap.push(marker);
          
          var infoWindowContent = '<div id="iw-container">' +
                    '<div class="iw-title">'+record.tipo+'</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Período da ocorrência: '+record.turno+'</div>' +
											'<div class="iw-subTitle">Descrição do fato</div>' +
                      '<p>'+record.descricao+'</p>' +
                      '<div class="iw-subTitle">Motivo</div>' +
                      '<p>'+record.motivo+'</p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';     
 
          addInfoWindow(marker, infoWindowContent, record);
 
        }
        	 markerCluster = new MarkerClusterer(map, markersmap,
      		{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

          google.maps.event.addListener(map, 'zoom_changed', function () {
          heatmap.setOptions({radius:getNewRadius()});
      });

			function bound(value, opt_min, opt_max) {
				if (opt_min !== null) value = Math.max(value, opt_min);
				if (opt_max !== null) value = Math.min(value, opt_max);
				return value;
			}

			function degreesToRadians(deg) {
				return deg * (Math.PI / 180);
			}

			var TILE_SIZE = 256;

			function MercatorProjection() {
				this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
				this.pixelsPerLonDegree_ = TILE_SIZE / 360;
				this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
			}

			MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
				var me = this;
				var point = opt_point || new google.maps.Point(0, 0);
				var origin = me.pixelOrigin_;
				point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
				var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
				point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
				return point;
			};

			MercatorProjection.prototype.fromPointToLatLng = function(point) {
				var me = this;
				var origin = me.pixelOrigin_;
				var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
				var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
				var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
				return new google.maps.LatLng(lat, lng);
			};

			var desiredRadiusPerPointInMeters = 300;
			function getNewRadius() {
				var numTiles = 1 << map.getZoom();
				var center = map.getCenter();
				var moved = google.maps.geometry.spherical.computeOffset(center, 10000, 90); /*1000 meters to the right*/
				var projection = new MercatorProjection();
				var initCoord = projection.fromLatLngToPoint(center);
				var endCoord = projection.fromLatLngToPoint(moved);
				var initPoint = new google.maps.Point(
				initCoord.x * numTiles,
				initCoord.y * numTiles);
				var endPoint = new google.maps.Point(
				endCoord.x * numTiles,
				endCoord.y * numTiles);
				var pixelsPerMeter = (Math.abs(initPoint.x - endPoint.x)) / 10000.0;
				var totalPixelSize = Math.floor(desiredRadiusPerPointInMeters * pixelsPerMeter);
				console.log(totalPixelSize);
				return totalPixelSize;

				}


         heatmap = new google.maps.visualization.HeatmapLayer({
							data: heatmapData2,
							map: map,
							dissipating: true,
							radius: getNewRadius()

							});
 
 
      }); 
 
  }
 
  function addInfoWindow(marker, message, record) {
 
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
 
  }

	function loadMarkersByFilter(filtro){
      //Get all of the markers from our Markers factory
			
				
      $http.get('http://196904bf.ngrok.io/getOcorrenciasPorTipo?tipo='+filtro).then(function(markers){
 
        console.log("Markers: ", markers);
 
        var records = markers.data;
        
        for (var i = 0; i < records.length; i++) {
 
          var record = records[i];   
          var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
             heatmapData2.push(markerPos);

          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos,
              icon:"../Img/"+record.tipo+".png"
          });
          markersmap.push(marker);
				  
          var infoWindowContent = '<div id="iw-container">' +
                    '<div class="iw-title">'+record.tipo+'</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Período da ocorrência: '+record.turno+'</div>' +
                      '<p>'+record.descricao+'</p>' +
                      '<div class="iw-subTitle">'+record.motivo+'</div>' +
                      '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
                      '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';     
 
          addInfoWindow(marker, infoWindowContent, record);
 
        }
        	
          google.maps.event.addListener(map, 'zoom_changed', function () {
          heatmap.setOptions({radius:getNewRadius()});
      });

			function bound(value, opt_min, opt_max) {
				if (opt_min !== null) value = Math.max(value, opt_min);
				if (opt_max !== null) value = Math.min(value, opt_max);
				return value;
			}

			function degreesToRadians(deg) {
				return deg * (Math.PI / 180);
			}

			var TILE_SIZE = 256;

			function MercatorProjection() {
				this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
				this.pixelsPerLonDegree_ = TILE_SIZE / 360;
				this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
			}

			MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
				var me = this;
				var point = opt_point || new google.maps.Point(0, 0);
				var origin = me.pixelOrigin_;
				point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
				var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
				point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
				return point;
			};

			MercatorProjection.prototype.fromPointToLatLng = function(point) {
				var me = this;
				var origin = me.pixelOrigin_;
				var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
				var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
				var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
				return new google.maps.LatLng(lat, lng);
			};

			var desiredRadiusPerPointInMeters = 300;
			function getNewRadius() {
				var numTiles = 1 << map.getZoom();
				var center = map.getCenter();
				var moved = google.maps.geometry.spherical.computeOffset(center, 10000, 90); /*1000 meters to the right*/
				var projection = new MercatorProjection();
				var initCoord = projection.fromLatLngToPoint(center);
				var endCoord = projection.fromLatLngToPoint(moved);
				var initPoint = new google.maps.Point(
				initCoord.x * numTiles,
				initCoord.y * numTiles);
				var endPoint = new google.maps.Point(
				endCoord.x * numTiles,
				endCoord.y * numTiles);
				var pixelsPerMeter = (Math.abs(initPoint.x - endPoint.x)) / 10000.0;
				var totalPixelSize = Math.floor(desiredRadiusPerPointInMeters * pixelsPerMeter);
				console.log(totalPixelSize);
				return totalPixelSize;

				}


        	heatmap = new google.maps.visualization.HeatmapLayer({
							data: heatmapData2,
							map: map,
							dissipating: true,
							radius: getNewRadius()

							});
 
 
      }); 
 
  }
 
  return {
    init: function(position, filtro){
      initMap(position, filtro);
    }
  }
 
})
.controller('listOcorrencias', ['$scope', 'GoogleMaps', '$http', function($scope, GoogleMaps, $http){
	$scope.tiposOcorrencias = [{tipo:"Assalto", value:"assalto"}, {tipo:"Roubo", value:"roubo"}, {tipo:"Violência Sexual", value:"vio_sexual"}
    , {tipo:"Vandalismo", value:"vandalismo"}, {tipo:"Homicídio", value:"homicidio"}];

    $scope.selectedTipo;
    $scope.filtrarPorTipo = filtrarPorTipo;

    function filtrarPorTipo(){
      GoogleMaps.init(undefined, $scope.selectedTipo);
    }
    //GoogleMaps.init();
    
    navigator.geolocation.getCurrentPosition(function(position){
      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      GoogleMaps.init(latlng);
      
 
    }, function(error){
      console.log("Could not get location");
 
        GoogleMaps.init();
    });
   
}]); 