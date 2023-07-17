// Array of all the players name
var players = new Array();
// Map of all the agent name with the respecitive image, e.g. {'Omen' : 'https://...jpg'}
var agents = new Map();
// Map of all the maps name with the respecitive image, e.g. {'Ascent' : 'https://...jpg'}
var maps = new Map();

/**
 * Reads the ``players`` array and the ``agents`` and ``maps`` Maps saved in the ``sessionStorage``, then parse the data and save
 * them respectively in the ``players`` global array and the ``agents`` and ``maps`` global Maps.
 */
function readDataMaps() {
    players = JSON.parse(sessionStorage.players);
    agents = new Map(Object.entries(JSON.parse(sessionStorage.agents)));
    maps = new Map(Object.entries(JSON.parse(sessionStorage.maps)));

    // For each map takes the inner stringifyied map and decodes it
    for (const [key, value] of maps.entries())
        maps.set(key, new Map(Object.entries(JSON.parse(value))));    
}

/**
 * Clean the background map image and insert a new image with the ``image`` link, and does the same with
 * the ``name`` of the map and ``layout`` link image.
 * 
 * @param {String} name the name of the map.
 * @param {String} image the link to the image of the map (using the valorant api).
 * @param {String} layout the link to the image of the layout of the map (using the valorant api).
 */
function buildMap(name, image, layout) {
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

/**
 * Use the ``updateSquad()`` method to either create or update the name (as a paragraph) of the players of both squads. 
 * 
 * @param {Array} defenseArr the array of players name of the defending squad.
 * @param {Array} attackArr the array of players name of the attacking squad.
 */
function buildSquads(defenseArr, attackArr){
    updateSquad(defenseArr, document.querySelectorAll('div#defenders div.players-div > div.player-row'), 'p');
    updateSquad(attackArr, document.querySelectorAll('div#attackers div.players-div > div.player-row'), 'p');
}

/**
 * Use the ``updateSquad()`` method to either create or update the images of the agents of both squads. 
 * 
 * @param {Array} defenseArr the array of agents images of the defending squad.
 * @param {Array} attackArr the array of agents images of the attacking squad.
 */
function buildAgents(defenseArr, attackArr){
    updateSquad(defenseArr, document.querySelectorAll('div#defenders div.players-div > div.player-row'), 'img');
    updateSquad(attackArr, document.querySelectorAll('div#attackers div.players-div > div.player-row'), 'img');
}

/**
 * Iterates the ``divArr`` and for each cell, if at the same index in the ``dataArr`` there are any data, then the data is insert
 * (created or updated) in the div, with differents procedures based on the tag specified by ``element``.
 * 
 * @param {Array} dataArr the array containg the data to inser in the DOM, e.g. ['Gino', 'Marco', ...].
 * @param {Array} divArr the array of divs, in each div the data of a cell of the ``dataArr`` array is inserted.
 * @param {String} element the type of element to insert, only supported are 'p' (for players name) and 'img' (for agents image).
 */
function updateSquad(dataArr, divArr, element){
    // Iterates the 5 div used as player row
    for (let i = 0; i < divArr.length; i++) {
        // If at this position we have some data (like a plyer name) we either create or update it
        if(i < dataArr.length){
            // If the div has only one child, it has to be a paragraph (as it's the first created)
            // So in this particular case if we are creating for the first time the agent img, we 
            // must go for the else block
            if(divArr[i].childNodes.length > 1){ // Case to update existing paragraph or img
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
            }else{ // Case to create for the first time a paragraph or img
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
        }else{ // If there are no more data this cell must be cleared
            divArr[i].innerHTML = '';
        }
    }
}