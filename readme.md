# BrewFinder

A simple app to search for breweries in any city.

<a href="https://ajbates2.github.io/BrewFinder/">Live Site</a>

## Summary

A relatively simple app that utilizes the google map API to place data from an open-source brewery database. The user searches for a city and the app fetches data from the brewery database. That data is then used to place markers on the map. The user can then click on a marker to get the relevant information.

<img src="/bfhome.png">

<img src="/bfscreen.png">

## Inspiration

I really enjoy exploring new breweries and taprooms. One of my favorite things is the environment at the taproom. I feel it's just as important for a taproom to display their personality as it is for the beer to be tasty.

## Issues I ran into

The biggest problem I had when building this was the inconsistent data given from the OpenBreweryDB, half of the breweries either didn't have latitude, longitude coordinates or a street address. Also, the available data is pretty limited.

I initially wanted to use Yelp or Untappd. Yelp is not CORS enabled. Untappd reviews everyone requesting an API key, and turnaround takes about two weeks.

I realize this just sounds like excuses, but I would like to come back to this when I learn Node and other server side languages to make it more polished.

## Future Functionalites

I'd like to build on this once I learn more in this course
*   User is able to leave notes about the taproom and overall experience
*   Track whether they have been there or not and how many times they have been
*   Use an API with richer data, i.e. Yelp or Untappd
*   List beers on tap if I'm able to use Untappd
*   Overall rating using an API with richer data
*   Is it dog-friendly?
*   Implement googles Geocoding API to get more accurate locations

## Tech Used

*   JavaScript
*   HTML5
*   CSS3
*   jQuery

## API's Used

*   Google Maps JavaScript
*   APIOpenBreweryDB