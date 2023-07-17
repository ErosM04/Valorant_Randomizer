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
 * in the ``selectedElement`` map, using the data of the ``totalMap`` (containg all the elments). Finally if ``isMap`` is
 * false and there are at least 2 elements in ``selectedElement`` or ``isMap`` is true and there are at least 1 elements in
 * ``selectedElement`` the return value will be true. 
 * 
 * @param {Map} selectedElement the map where selected (✅) data will be saved.
 * @param {String} query the DOM query to extract all the checkbox values.
 * @param {Map} totalMap the map with all the data (even not selected).
 * @param {boolean} isMap boolean to indicate if we are working on maps (true) or agents (false, default).
 * @returns {boolean} true if there are at least 1 element (if we are working with a map, otherwise we are working with agents
 * and needs at least 2 elements).
 */
function extractSelectedCheckboxes(selectedElement, query, totalMap, isMap = false) {
    let checkboxes = document.querySelectorAll(query);
    for (const checkbox of checkboxes)
        if(checkbox.checked)
            selectedElement.set(checkbox.id.split('-')[2], totalMap.get(checkbox.id.split('-')[2]));
    
    if(selectedElement.size >= ((isMap) ? 1 : 2)){
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