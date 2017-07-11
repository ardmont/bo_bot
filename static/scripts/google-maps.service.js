(function() {
    'use strict';

    angular
        .module('bobotApp')
        .factory('GoogleMapsService',GoogleMapsService);
        GoogleMapsService.$inject = ['$http'];

function GoogleMapsService($http){

  var apiKey = false;
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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      };

				//Verifica se o mapa ainda não foi iniciado e inializa caso seja null
				if(map === null){
					map = new google.maps.Map(document.getElementById("mapViewDiv"), mapOptions);
					 var imagem = 'img/alerta.png';

                 // Cria um elemento de pesquisa integrado ao mapa
				  var input = document.getElementById('localConsultado');
				  var searchBox = new google.maps.places.SearchBox(input);
				 // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); se desejar colocar o serachBox sobre o mapa descomente essa linha

				  // Bias the SearchBox results towards current map's viewport.
				  map.addListener('bounds_changed', function() {
				    searchBox.setBounds(map.getBounds());
				  });
                  var markers = [];
				  // Estcuta o evento para quando o usuario selecionar um local no campo de consulta

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

				    // Para cada pondo pegar o nome, localização e o icone
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

				      if (place.geometry.viewport) {

				        bounds.union(place.geometry.viewport);
				      } else {
				        bounds.extend(place.geometry.location);
				      }
				    });
				    map.fitBounds(bounds);

				  });


      //Aguardar até o mapa ser carregado para carregar as informações de violencia
      google.maps.event.addListenerOnce(map, 'idle', function(){

      });
			}
			else{
				map.Map(document.getElementById("mapViewDiv"), mapOptions);
			}

}

//Remove todos os marcadores do mapa
function clearMap() {

        for (var i = 0; i < markersmap.length; i++) {
            markersmap[i].setMap(null);
        }
        markersmap=[];
        heatmap.setMap(null);
        markerCluster.clearMarkers();

};

  function addMarkers(data){

        var records = data;

        for (var i = 0; i < records.length; i++) {

          var record = records[i];
          var markerPosition = new google.maps.LatLng(record.latitude, record.longitude);
          //Array de posiçoes
             heatmapData.push(markerPosition);

          // Adiciona um marcador no mapa
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPosition,
              icon:"../Img/"+record.tipo+".png"
          });
          //Array de marcadores
          markersmap.push(marker);

          addInfoWindow(marker, record);

        }
        markerCluster = new MarkerClusterer(map, markersmap,
      	                {
                            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                        });

          google.maps.event.addListener(map, 'zoom_changed', function () {
                     heatmap.setOptions({radius:getNewRadius()});
        });

         heatmap = new google.maps.visualization.HeatmapLayer({
							data: heatmapData,
							map: map,
							dissipating: true,
							radius: getNewRadius()

		});




  }

  function addInfoWindow(marker, record) {
       var message = '<div id="iw-container">' +
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

      var infoWindow = new google.maps.InfoWindow({
          content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });

  }
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
function MercatorProjection() {
				this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
				this.pixelsPerLonDegree_ = TILE_SIZE / 360;
				this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}
function bound(value, opt_min, opt_max) {
				if (opt_min !== null) value = Math.max(value, opt_min);
				if (opt_max !== null) value = Math.min(value, opt_max);
				return value;
			}

function degreesToRadians(deg) {
				return deg * (Math.PI / 180);
			}

 //Retorna uma funçao para ser usada como serviço
  return {
    init: function(position, filtro){
      initMap(position, filtro);
    },
		addMarker:function(data){
			addMarkers(data);
		}
  }

}
})();
