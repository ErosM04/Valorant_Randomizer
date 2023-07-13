var players = new Map();
var agents = new Map();
var maps = new Map();

function readDataMaps() {
    players = new Map(Object.entries(JSON.parse(sessionStorage.players)));
    agents = new Map(Object.entries(JSON.parse(sessionStorage.agents)));
    maps = new Map(Object.entries(JSON.parse(sessionStorage.maps)));
}

function setMap(name, image) {
    // Set the map as background image
    // document.body.style.backgroundImage = "url('../images/splash.png')";
    document.body.style.backgroundImage = "url('" + image + "')";
    // Set the map name
    let mapName = document.createElement('p');
    mapName.innerText = name;
    document.getElementById('map-name-div').appendChild(mapName);
}