// Map containg the agents selected with the checkbox ✅
var selectedAgents = new Map();
// Map containg the maps selected with the checkbox ✅
var selectedMaps = new Map();
var players = new Array();

/**
 * Takes the data containd in the ``selectedAgents``, ``selectedMaps`` and ``players``, parse them into JSONs and save them in the
 * ``sessionStorage``. Than use ``loadGamePage()`` to load the second page (play.html).
 */
function saveDataOnSession() {
    selectedAgents.clear();
    selectedMaps.clear();

    if(extractPlayersName()
    && extractSelectedCheckboxes(selectedAgents, 'div#agent-selector-div div.deselect-div > input', totalAgentsMap)
    && extractSelectedCheckboxes(selectedMaps, 'div#map-selector-div div.deselect-div > input', totalMapsMap, true)){
        // Stringifyies and save on session both maps (agents and maps)
        sessionStorage.agents = JSON.stringify(Object.fromEntries(selectedAgents));
        // For the map of Maps, as it contains maps as value, every single value must be stringifyied
        for (const [key, value] of selectedMaps.entries())
            selectedMaps.set(key, JSON.stringify(Object.fromEntries(value)));
        sessionStorage.maps = JSON.stringify(Object.fromEntries(selectedMaps));

        // Stringifyies the players array and save it in the session
        sessionStorage.players = JSON.stringify(players);

        // Change HTML page
        loadGamePage();
    }
}

/**
 * Iterates all the input checkbox of the DOM obtained with the ``query`` and for each element if it checked, then is saved
 * in the ``selectedElement`` map, using the data of the ``totalMap`` (containg all the elments).
 * 
 * Finally if ``isMap`` is true means we are working with maps, and so ``selectedElements`` at the end of the cicle must have
 * at least 1 element (meaning that at least 1 checkbox has to be checked), otherwise it's going to return false.
 * 
 * While if ``isMap`` is false means we are working with agents, and so ``selectedElements`` at the end of the cicle must have
 * at least the same amount of elements (extracted by the checked checkboxes) as half of the length of the ``players`` array
 * (e.g. players = 3, length required = 2 or players = 6, length required = 3), otherwise it's going to return false.
 * 
 * @param {Map} selectedElement the map where selected (✅) data will be saved.
 * @param {String} query the DOM query to extract all the checkbox values.
 * @param {Map} totalMap the map with all the data (even not selected).
 * @param {boolean} isMap boolean to indicate if we are working on maps (true) or agents (false, default).
 * @returns {boolean} true if data were successfully extracted and there were enough elements.
 */
function extractSelectedCheckboxes(selectedElement, query, totalMap, isMap = false) {
    let checkboxes = document.querySelectorAll(query);
    for (const checkbox of checkboxes)
        if(checkbox.checked)
            selectedElement.set(checkbox.id.split('-')[2], totalMap.get(checkbox.id.split('-')[2]));
    
    if((isMap && selectedElement.size >= 1) || (!isMap && selectedElement.size >= Math.ceil(players.length / 2))){
        return true;
    }else{
        selectedElement.clear();
        return false;
    }
}

/**
 * For each input text tag extracts the name of the player inserted by the user and saves it in the ``players`` array.
 * If there are only one player or one player has no name, then false is returned, otherwise returns true.
 * 
 * @returns {boolean} true there aren't any errors, such as only one player or missing names.
 */
function extractPlayersName() {
    if (document.getElementById('plyrs_input').value > 1) {
        players = [];     
        let plyersInputs = document.querySelectorAll('div.player-name-div > input');
        for (const player of plyersInputs) {
            if(player.value == '' || player.value.length > 18 || players.includes(player.value)){
                players = [];
                return false;
            }else{
                players.push(player.value);
            }   
        }
        return true;
    }
    return false;
}

/**
 * Redirects to the second page: ``pages/play.html``.
 */
function loadGamePage() {
    window.location = 'pages/play.html';
}