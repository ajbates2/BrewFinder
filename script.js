const searchURL = 'https://api.openbrewerydb.org/breweries';
const mapsKey = 'AIzaSyAe4FTwPUmFTXLaXAqMZCGEHX1r-ZHs5LU'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p>${responseJson[i].brewery_type}</p>
      <a href="${responseJson[i].website_url}">website</a>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getResource(searchTerm) {
  const params = {
    by_city: searchTerm
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
    const searchTerm = $('#js-search-term').val();
    getResource(searchTerm);
  });
}

$(watchForm);

function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.977, lng: -93.265},
    zoom: 12
  });
}

function placeResource(responseJson) {
  for (let i = 0; i < responseJson.length; i++){
    let coords = [responseJson[i].latitude, responseJson[i].longitude];
    console.log(coords);
    let latLng = new google.maps.LatLng(coords);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
});
}}

