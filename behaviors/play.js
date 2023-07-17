var players = new Map();
var agents = new Map();
var maps = new Map();

function readDataMaps() {
    players = JSON.parse(sessionStorage.players);
    agents = new Map(Object.entries(JSON.parse(sessionStorage.agents)));
    maps = new Map(Object.entries(JSON.parse(sessionStorage.maps)));

    // For each map takes the inner stringifyied map and decodes it
    for (const [key, value] of maps.entries())
        maps.set(key, new Map(Object.entries(JSON.parse(value))));    
}

function buildMap(name, image, layout) {
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

function buildSquads(defenseArr, attackArr){
    updateSquad(defenseArr, document.querySelectorAll('div#defenders div.players-div > div.player-row'), 'p');
    updateSquad(attackArr, document.querySelectorAll('div#attackers div.players-div > div.player-row'), 'p');
}

function buildAgents(){
    updateSquad(extract(defendersAgents), document.querySelectorAll('div#defenders div.players-div > div.player-row'), 'img');
    updateSquad(extract(attackersAgents), document.querySelectorAll('div#attackers div.players-div > div.player-row'), 'img');
}

function extract(arr) {
    let result = [];
    for (const subarr of arr) {
        result.push(subarr[1]);
    }
    return result;
}

function updateSquad(dataArr, divArr, element){
    for (let i = 0; i < divArr.length; i++) {
        if(i < dataArr.length){
            if(divArr[i].childNodes.length > 1){
                for (const child of divArr[i].childNodes) {
                    if(element == 'p'){ // Change the paragraph
                        if(child.nodeName.toString().toUpperCase() == 'P'){
                            child.innerText = dataArr[i];
                        }
                    }else{ // Change the image
                        if(child.nodeName.toString().toUpperCase() == 'IMG'){
                            child.src = dataArr[i];
                        }
                    }
                }
            }else{
                let DOMelement = document.createElement(element);
                if(element == 'p'){
                    DOMelement.className = 'player-name';
                    DOMelement.innerText = dataArr[i];
                    divArr[i].appendChild(DOMelement);
                }else{
                    DOMelement.className = 'agent-img';
                    DOMelement.src = dataArr[i];
                    divArr[i].insertBefore(DOMelement, divArr[i].firstChild)
                }
            }
        }else{
            divArr[i].innerHTML = '';
        }
    }
}