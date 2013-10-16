Template.map.rendered = function () {
  var map = L.mapbox.map('map', 'guilhermedecampo.map-pwzv1lio');
  // This uses the HTML5 geolocation API, which is available on
  // most mobile browsers and modern browsers, but not in Internet Explorer
  //
  // See this chart of compatibility for details:
  // http://caniuse.com/#feat=geolocation
  if (!navigator.geolocation) {
      replace.innerHTML = 'geolocation is not available';
  } else {
          map.locate();
      }


  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds).setZoom(12);

      map.markerLayer.setGeoJSON({
          type: "Feature",
          geometry: {
              type: "Point",
              coordinates: [e.latlng.lng, e.latlng.lat]
          },
          properties: {
              'marker-color': '#fff',
              'marker-symbol': 'star-stroked'
          }
      });
      console.log(e.latlng.lng, e.latlng.lat);
      var lng = e.latlng.lng;
      var lat = e.latlng.lat;
      var url = "http://api.geonames.org/findNearbyJSON?lat="+lat+"&lng="+lng+"&username=guilhermedecampo";
      console.log(url);
  });



  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
      replace.innerHTML = 'position could not be found';
  });

};

/////////////////////////////////////////////////////////////////////////////////

Accounts.ui.config({
     passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

