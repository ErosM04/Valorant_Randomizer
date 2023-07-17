// Array of defenders squad players name
var defenders = new Array();
// Array of attackers squad players name
var attackers = new Array();
// Array of defenders squad agents name and image, e.g. [['Omen', 'link'], ...]
var defendersAgents = new Array();
// Array of attackers squad agents name and image, e.g. [['Omen', 'link'], ...]
var attackersAgents = new Array();

/**
 * Reads the data saved in the session using ``readDataMaps()``, then randomize and updates maps and squads (both players and agents)
 * with ``randomizeMaps()`` and ``randomizeSquads()``. ``randomizeSquads()`` includes also ``randomizeAgents()``.
 */
function randomizeAll(){
    readDataMaps();
    randomizeMaps();
    randomizeSquads();
}

/**
 * Uses ``getRandomElementFromMap()`` to get a random element from the ``maps`` array and then updates the UI using ``buildMap()``.
 */
function randomizeMaps(){
    let randomMap = getRandomElementFromMap(maps);
    // Updates UI
    buildMap(randomMap[0], randomMap[1].get('map'), randomMap[1].get('layout'));
}

/**
 * Uses ``randomize()`` to randomize half of the ``players`` array (uses a buffer) and insert it in the ``defenders`` array.
 * The remeaning half will be inserted in the ``attackers`` array.
 * 
 * If the numer of players is odd, then randomizes which half has one more players, meaning that if there is a total of 5 players,
 * then there is a probaility of 50% that the attackers squad will have 3 players and the defender squad 2, and the 50% of
 * probability to result the opposite.
 * 
 * Then updates the UI using ``buildSquads()``. Finally as the squads may change in number (ex. 2 vs 3 --> 3 vs 2), also the
 * agents are re-randomized using ``randomizeAgents()``.
 */
function randomizeSquads() {
    // Cleans arrays to avoid errors
    defenders = [];
    attackers = [];

    // If the number of players is odd, then this randomize which squad has one more players
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

    // Updates UI
    buildSquads(defenders, attackers);

    // As the squads may change (ex. 2 v 3 --> 3 v 2), also agents must be rotated
    randomizeAgents();
}

/**
 * For each player in the ``defenders`` and ``attackers`` arrays pick up a random agent image link and saves the results in
 * the ``defendersAgents`` and ``attackersAgents`` arrays. Then updates the UI using ``buildAgents()``.
 */
function randomizeAgents(){
    // Clean arrays to avoid errors
    defendersAgents = [];
    attackersAgents = [];

    //Randomize defenders
    randomize(agents, defenders.length, defendersAgents);
    //Randomize attackers
    randomize(agents, attackers.length, attackersAgents);
    
    // Updates UI
    buildAgents(extract(defendersAgents, 1), extract(attackersAgents, 1));
}

/**
 * Takes an array and randomizes its content saving the randomized elements in ``assignedArr`` and then returns the initial arr (now modified).
 * 
 * @param {Array} arr the array containg the elements to randomize (a deep copy is used in order not to alter the original array).
 * @param {number} condition the amount of elements inside ``arr`` to randomize. if you want to randomize all the elements in ``arr`` just use ``arr.length``.
 * @param {Array} assignedArr the array which will revcieve the values in a randomized order.
 * @param {boolean} reverse a boolean to decide to reverse or not the array before randomizing it, used to increase randomicity.
 * @returns the resulting array copied by ``arr``, all the values used (and so moved to ``assignedArr``) are now equals to ``0``.
 */
function randomize(arr, condition, assignedArr, reverse = false){
    let buff = [...arr] // deep copy

    if(reverse)
        buff.reverse();

    for (i = 0; i < condition; i++) {
        // returns a number between 0 (included) and buff.length (excluded)
        let r = Math.floor(Math.random() * buff.length)
        while (buff[r] == 0) {
            r = Math.floor(Math.random() * buff.length);
        }
        assignedArr[i] = buff[r];
        buff[r] = 0;
    }
    
    return buff;
}

/**
 * Thakes an array containg sub arrays, and then creates an array extracting a value at a specific ``position`` for each subarray.
 * e.g.:
 * ```
 * arr : [['a', 'b'], ['c', 'd'], ['e', 'f']]
 * position: 1
 * result: ['b', 'd', 'f']
 * ```
 * 
 * @param {Array} arr the array to iterate.
 * @param {number} position the index of the subarry to use.
 * @returns {Array} the array of subelements.
 */
function extract(arr, position) {
    let result = [];
    for (const subarr of arr) {
        result.push(subarr[position]);
    }
    return result;
}

/**
 * Takes a maps as parameter, then converts it into an array and return an array containing only a random element of the map.
 * 
 * @param {Map} map the map containing the elements.
 * @returns {Array} an array containg at the first position (arr[0]) the key of the map, and at the second position (arr[1])
 * the value associated with that key.
 */
function getRandomElementFromMap(map){
    let items = Array.from(map);
    return items[Math.floor(Math.random() * items.length)];
}