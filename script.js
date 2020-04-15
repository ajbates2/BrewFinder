const searchURL = 'https://api.openbrewerydb.org/breweries';
const mapsKey = 'AIzaSyAe4FTwPUmFTXLaXAqMZCGEHX1r-ZHs5LU'

//formats search query into URI components
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//formats data from OpenBreweryDB
function displayResults(responseJson) {
  return `<div class="window-content">
      <h3>${responseJson.name}</h3>
      <a href="${responseJson.website_url}" target="_blank" class="links">Website</a>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${responseJson.latitude},${responseJson.longitude}" target="_blank" class="links">Directions</a>
      </div>`
};

//fetchs data from OpenBreweryDB
function getResource(city, state) {
  const params = {
    by_city: city,
    by_state: state,
    per_page: 50
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => placeResource(responseJson))
    .catch(error => $('.error').text(`Something went wrong: ${error.message}`).removeClass('hidden'));
}

//watches for submit event to perform styling actions and fetches the searched term
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const city = $('#js-city').val();
    const state = $('#js-state').val();
    $('.form-home').addClass('form-after');
    $('.hide').addClass('hidden');
    getResource(city, state);
  });
}

$(watchForm);

//initializes blank map on page load
function initMap() {
  const mpls = { lat: 45, lng: -93.2650 }
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: mpls,
    styles: initMapStyle,
    disableDefaultUI: true
  });
}

//initializes new map after search and places markers on map with event listseners on the markers
function placeResource(responseJson) {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: findCenter(responseJson),
    zoom: 13,
    styles: mapStyle,
    disableDefaultUI: true
  });
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].latitude && responseJson[i].longitude) {
      let coords = { lat: parseFloat(responseJson[i].latitude), lng: parseFloat(responseJson[i].longitude) };
      let marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: responseJson[i].name,
        icon: 'hop.svg'
      });
      let infoWindow = new google.maps.InfoWindow({
        content: displayResults(responseJson[i])
      });
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(14);
      });
      map.addListener('click', function () {
        infoWindow.close();
      });
    }
  }
}

//finds the center of the map based on first dataset in search
function findCenter(responseJson) {
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].latitude && responseJson[i].longitude) {
      return { lat: parseFloat(responseJson[i].latitude), lng: parseFloat(responseJson[i].longitude) };
    }
  }
}