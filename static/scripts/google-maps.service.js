(function() {
    'use strict';

    angular
        .module('bobotApp')
        .factory('GoogleMapsService',GoogleMapsService);
        GoogleMapsService.$inject = ['$http', '$sessionStorage'];

function GoogleMapsService($http, $sessionStorage){

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

      var zoom = 15;
      if(!position){
        position = new google.maps.LatLng(-14.0491211, -60.4393422);
				zoom = 5;
      }
      var mapOptions = {
        timeout: 10000,
        enableHighAccuracy: true,
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
				if(!$sessionStorage.map){
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
				//map = $sessionStorage.map;

			}

}

//Remove todos os marcadores do mapa
var clearmap = function clearMap() {

        for (var i = 0; i < markersmap.length; i++) {
            markersmap[i].setMap(null);
        }
        markersmap=[];
       // heatmap.setMap(null);
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
              position: markerPosition
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
       var message ='<div id="iw-container">' +
           '<div class="iw-title">'+record.violence_type+'</div>' +
           '<div class="iw-content">' +
           '<div class="iw-subTitle">'+record.violence_reason+'</div>' +
           '<p>'+record.violence_description +"."+'</p>' +
           '<div class="iw-subTitle">Pode ser informado contatos de denuncia aqui</div>' +
           '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
           '<br>Tel. +351 234 320 600<br>email: geral@vaa.pt<br>www: www.myvistaalegre.com</p>'+
           '</div>' +
           '<div class="iw-bottom-gradient"></div>' +
           '</div>';

      var infoWindow = new google.maps.InfoWindow({
          content: message

      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.close();
          infoWindow.open(map, marker);
      });
      // Evento que fecha a infoWindow com click no mapa
      google.maps.event.addListener(map, 'click', function() {
          infoWindow.close();
      });
      // *
      // INICIO DA PERSONALIZAÇÃO DA INFOWINDOW.
      // O evento google.maps.event.addListener() espera pela
      // criação da estrutura HTML da infowindow 'domready'
      // e antes da abertura da infowindow serão aplicados
      // os estilos definidos
      // *
      google.maps.event.addListener(infoWindow, 'domready', function() {

          // Referência ao DIV que agrupa o fundo da infowindow
          var iwOuter = $('.gm-style-iw');

          /* Uma vez que o div pretendido está numa posição anterior ao div .gm-style-iw.
           * Recorremos ao jQuery e criamos uma variável iwBackground,
           * e aproveitamos a referência já existente do .gm-style-iw para obter o div anterior com .prev().
           */
          var iwBackground = iwOuter.prev();

          // Remover o div da sombra do fundo
          iwBackground.children(':nth-child(2)').css({'display' : 'none'});

          // Remover o div de fundo branco
          iwBackground.children(':nth-child(4)').css({'display' : 'none'});

          // Desloca a infowindow 115px para a direita
          iwOuter.parent().parent().css({left: '115px'});

          // Desloca a sombra da seta a 76px da margem esquerda
          iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

          // Desloca a seta a 76px da margem esquerda
          iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

          // Altera a cor desejada para a sombra da cauda
          iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

          // Referência ao DIV que agrupa os elementos do botão fechar
          var iwCloseBtn = iwOuter.next();

          // Aplica o efeito desejado ao botão fechar
          iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

          // Se o conteúdo da infowindow não ultrapassar a altura máxima definida, então o gradiente é removido.
          if($('.iw-content').height() < 140){
              $('.iw-bottom-gradient').css({display: 'none'});
          }

          // A API aplica automaticamente 0.7 de opacidade ao botão após o evento mouseout. Esta função reverte esse evento para o valor desejado.
          iwCloseBtn.mouseout(function(){
              $(this).css({opacity: '1'});
          });
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
		},
      clear:clearmap
  }

}
})();
