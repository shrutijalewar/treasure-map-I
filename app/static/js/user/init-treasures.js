/*global google:true*/
/*jshint camelcase:false*/
(function(){
  'use strict';
  $(document).ready(function(){
    $('form').submit(addTreasure);

  });
  function addTreasure(e){
    var lat = $('#lat').val();
    if(!lat){
      var name = $('#name').val();
      geocode(name);
      e.preventDefault();
    }
  }
  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng(),
          name = results[0].formatted_address;
      $('#name').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);
      $('form').submit();
    });
  }
})();
