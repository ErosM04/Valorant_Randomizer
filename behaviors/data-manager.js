var selectedAgents = new Map();
var selectedMaps = new Map();
var players = new Array();

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

function loadGamePage() {
    window.location = 'pages/play.html';
}