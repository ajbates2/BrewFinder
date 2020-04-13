const searchURL = 'https://api.openbrewerydb.org/breweries';
const mapsKey = 'AIzaSyAe4FTwPUmFTXLaXAqMZCGEHX1r-ZHs5LU'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
      $('#result').html(`<h3>${responseJson.name}</h3>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${responseJson.latitude},${responseJson.longitude}" target="_blank">Directions</a>
      <a href="${responseJson.website_url}" target="_blank">website</a>
      `)
    };


function getResource(city, state) {
  const params = {
    by_city: city,
    by_state: state,
    per_page: 50
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(responseJson => placeResource(responseJson))
    .catch(error => console.log(error.message));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const city = $('#js-city').val();
    const state = $('#js-state').val();
    getResource(city, state);
  });
}

$(watchForm);

function initMap() {
  let mpls = {lat: 45, lng: -93.2650}
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: mpls
  });
}

function placeResource(responseJson) {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: findCenter(responseJson),
    zoom: 11
  });
  for (let i = 0; i < responseJson.length; i++){
    if (responseJson[i].latitude && responseJson[i].longitude) {
      let coords = {lat: parseFloat(responseJson[i].latitude), lng: parseFloat(responseJson[i].longitude)};
      let marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: responseJson[i].name
      });
      marker.addListener('click', function() {
        $('#result').removeClass('hidden');
        displayResults(responseJson[i])
      })
  }}
}

function findCenter(responseJson) {
  for (let i = 0; i < responseJson.length; i++){
    if (responseJson[i].latitude && responseJson[i].longitude) {
      return {lat: parseFloat(responseJson[i].latitude), lng: parseFloat(responseJson[i].longitude)};
    }
  }
}

