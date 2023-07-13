var players = new Map();
var agents = new Map();
var maps = new Map();

function readDataMaps() {
    players = new Map(Object.entries(JSON.parse(sessionStorage.players)));
    agents = new Map(Object.entries(JSON.parse(sessionStorage.agents)));
    maps = new Map(Object.entries(JSON.parse(sessionStorage.maps)));
    // For each map takes the inner stringifyied map and decodes it
    for (const [key, value] of maps.entries())
        maps.set(key, new Map(Object.entries(JSON.parse(value))));
}

function setMap(name, image, layout) {
    // document.body.style.backgroundImage = "url('../images/splash.png')";

    // Set the map as background image
    document.body.style.backgroundImage = "url('" + image + "')";
    // Set the map name
    let mapName = document.createElement('p');
    mapName.innerText = name;
    document.getElementById('map-name-div').innerHTML = '';
    document.getElementById('map-name-div').appendChild(mapName);
    // Set the map layout image (in the center)
    let mapLayout = document.createElement('img');
    mapLayout.src = layout;
    mapLayout.id = 'map-icon';
    document.getElementById('map-layout-div').innerHTML = '';
    document.getElementById('map-layout-div').appendChild(mapLayout);
}