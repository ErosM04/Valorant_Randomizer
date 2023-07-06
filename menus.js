function buildMenu(){
    getMapsData().then((res) => console.log(res));
}

/**
 * Map['agent-name'] => icon-link
 */
async function getAgentsData(){
    const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const agents = await res.json();
    const agentsMap = new Map();
    agents['data'].forEach(agent => agentsMap.set(agent["displayName"], agent["displayIcon"]));
    return agentsMap;
}

/**
 * Map['map-name'] => icon-link
 */
async function getMapsData(){
    const res = await fetch("https://valorant-api.com/v1/maps");
    const maps = await res.json();
    const mapMap = new Map();
    maps['data'].forEach(map => mapMap.set(map["displayName"], map["splash"]));
    return mapMap;
}