const unwantedMaps = ['District', 'Kasbah', 'Piazza', 'The Range'];
var totalAgentsMap = new Map();
var totalMapsMap = new Map();

async function buildMenus(){
    let agents = await getAgentsMap();
    let maps = await getMapsMap();
    console.log(maps);
    for (const [key, value] of agents.entries()) {
        buildAgentCell(key, value);
    }

    for (const key of maps.keys()) {
        buildMapCell(key, maps.get(key).get('map'));
    }
}

function buildAgentCell(name, image){
    // Creates the div
    let div = document.createElement('div');
    div.className = "deselect-div";
    // Creates the image
    let img = document.createElement('img');
    // img.src = image;
    img.className = 'agent-deselect-img';
    // Creates the checkbox
    let check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'deselect-checkbox';
    check.id = 'check-agent-' + name;
    check.checked = true;

    // Appends the elements
    div.appendChild(img);
    div.appendChild(check);
    document.getElementById('agent-selector-div').appendChild(div);
}

function buildMapCell(name, image){
    // Creates the div
    let div = document.createElement('div');
    div.className = "deselect-div";
    // Creates the image
    let img = document.createElement('img');
    // img.src = image;
    img.className = 'map-deselect-img';
    // Creates the text
    let text = document.createElement('p');
    text.className = 'map-text';
    text.innerText = name;
    // Creates the checkbox
    let check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'deselect-checkbox';
    check.id = 'check-map-' + name;
    check.checked = true;

    // Appends the elements
    div.appendChild(img);
    div.appendChild(text);
    div.appendChild(check);
    document.getElementById('map-selector-div').appendChild(div);
}

/**
 * Map['agent-name'] => icon-link
 */
async function getAgentsMap(){
    const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const agents = await res.json();
    const agentsMap = new Map();
    agents['data'].forEach(agent => agentsMap.set(agent['displayName'], agent['displayIcon']));
    totalAgentsMap = agentsMap;
    return agentsMap;
}

/**
 * ```
 * Map{
 *      'map-name' : Map{
 *              'map' : 'https://...map.png
 *              'layout' : 'https://...map.png
 *          }
 * }
 * ```
 */
async function getMapsMap(){
    const res = await fetch("https://valorant-api.com/v1/maps");
    const maps = await res.json();
    const mapsMap = new Map();
    maps['data'].forEach(map => {
        if(!unwantedMaps.includes(map['displayName'])){
            let tempMap = new Map();
            tempMap.set('map', map['splash']);
            tempMap.set('layout', map['displayIcon']);
            mapsMap.set(map['displayName'], tempMap);
        }
    });
    totalMapsMap = mapsMap;
    return mapsMap;
}