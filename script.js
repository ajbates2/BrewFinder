const yelpKey = 'bearer xayaX2zcNWshNIUUXWL1ejHLyjysVwNRV9VrBaW-gWDcx8IpE4awC6eFudFVjscmJUKwJdPSiifHVSrg_pkjh79BSnRNLe6-VPAWttmnw_6jAFSzkonBZRtnqCuOXnYx'; 
const clientID = 'bwYJJmIW6MYYSCklgSIFsQ'
const searchURL = 'https://api.yelp.com/v3/businesses/search?categories=ramen';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.businesses.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.businesses[i].name}</h3>
      <p>${responseJson.businesses[i].rating}</p>
      <a href='${responseJson.businesses[i].url}>website</a>'>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
};

function getResource(searchTerm) {
  const params = {
    location: searchTerm
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '&' + queryString;
  console.log(url);
  const options = {
    mode: "no-cors",
    headers: new Headers({
      "Authorization": yelpKey})};

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
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