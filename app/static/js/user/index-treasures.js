/* global google:true */
(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(0, 0, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP , icon: '/img/flag.png'});
  }
  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
    var name =  $(tr).attr('data-name'),
    lat =  $(tr).attr('data-lat'),
    lng =  $(tr).attr('data-lng'),
    pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
    return(pos);

  });
    return positions;
  }

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'water','elementType':'geometry','stylers':[{'color':'#004358'}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#1f8a70'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#1f8a70'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#fd7400'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#1f8a70'},{'lightness':-20}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#1f8a70'},{'lightness':-17}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#ffffff'},{'visibility':'on'},{'weight':0.9}]},{'elementType':'labels.text.fill','stylers':[{'visibility':'on'},{'color':'#ffffff'}]},{'featureType':'poi','elementType':'labels','stylers':[{'visibility':'simplified'}]},{'elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#1f8a70'},{'lightness':-10}]},{},{'featureType':'administrative','elementType':'geometry','stylers':[{'color':'#1f8a70'},{'weight':0.7}]}],
     mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
