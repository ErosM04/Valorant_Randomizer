function printParameters() {
    var players = new Map(Object.entries(JSON.parse(sessionStorage.players)));
    var agents = new Map(Object.entries(JSON.parse(sessionStorage.agents)));
    var maps = new Map(Object.entries(JSON.parse(sessionStorage.maps)));
    document.body.style.backgroundImage = "url('../images/splash.png')";
    // document.body.style.backgroundImage = "url('" + getRandomValueFromMap(maps) + "')";
}

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }

function getRandomValueFromMap(map){
    let items = Array.from(map);
    return items[Math.floor(Math.random() * items.length)][1];
}