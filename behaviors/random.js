var attackers = new Array();
var defenders = new Array();
var attackersAgents = new Array();
var defendersAgents = new Array();

function randomizeAll(){
    readDataMaps();
    randomizeMaps();
    randomizeSquads();
    // randomizeAgents() is included in `randomizeSquads()
}

function randomizeMaps(){
    let randomMap = getRandomElementFromMap(maps);
    buildMap(randomMap[0], randomMap[1].get('map'), randomMap[1].get('layout'));
}


function randomizeSquads() {
    // Clean arrays to avoid errors
    attackers = [];
    defenders = [];

    // If the number of players is odd, than this randomize which squad has one more players
    let splitRand = 0;
    if(players.length % 2 != 0)
        splitRand = Math.floor(Math.random() * 2);

    // To avoid the higher probability of the second half of the array to end up in the second squad, the array is randomly reversed;
    // Randomize attackers
    let buff = randomize(players, ((players.length) / 2) - splitRand, attackers, Math.floor(Math.random() * 2));

    // Set remaining players as defenders
    let n = 0
    for (i = 0; i < buff.length; i++) {
        if (buff[i] != 0) {
            defenders[n] = buff[i]
            n++
        }
    }

    buildSquads(attackers, defenders);

    // As the squads may change (2 v 3 --> 3 v 2), also agents must be rotated
    randomizeAgents();
}

/**
 * Randomize both attackers and defenders agents using ``randomize`` and than updates the UI using ````.
 */
function randomizeAgents(){
    // Clean arrays to avoid errors
    attackersAgents = [];
    defendersAgents = [];

    //Randomize attackers
    randomize(agents, attackers.length, attackersAgents);
    //Randomize defenders
    randomize(agents, defenders.length, defendersAgents);
    // updateAgents();
}

/**
 * Takes an array and randomizes its content saving the randomized elements in ``assignedArr`` and than returns the initial arr (now modified).
 * @param {Array} arr the array containg the elements to randomize (a deep copy is used in order not to alter the original array).
 * @param {} condition the amount of elements inside ``arr`` to randomize. if you want to randomize all the elements in ``arr`` just use ``arr.length``.
 * @param {Array} assignedArr the array which will revcieve the values in a randomized order.
 * @param {boolean} reverse a boolean to decide to reverse or not the array before randomizing it, used to increase randomicity.
 * @returns the resulting array copied by ``arr``, all the values used (and so moved to ``assignedArr``) are now equals to ``0``.
 */
function randomize(arr, condition, assignedArr, reverse = false){
    let buff = [...arr] // deep copy

    if(reverse)
        buff.reverse();

    for (i = 0; i < condition; i++) {
        let r = Math.floor(Math.random() * (buff.length - 1))
        while (buff[r] == 0) {
            r = Math.floor(Math.random() * (buff.length - 1))
        }
        assignedArr[i] = buff[r]
        buff[r] = 0
    }
    return buff;
}

/**
 * Takes a maps as parameter, than converts it into an array and return an array containing only a random element of the map.
 * @param {Map} map the map containing the elements.
 * @returns {Array} an array containg at the first position (arr[0]) the key of the map,
 * and at the second position (arr[1]) the value associated with that key.
 */
function getRandomElementFromMap(map){
    let items = Array.from(map);
    return items[Math.floor(Math.random() * items.length)];
}