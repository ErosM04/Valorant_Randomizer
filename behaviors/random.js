var attackers = new Array();
var defenders = new Array();
var attackersAgents = new Array();
var defendersAgents = new Array();

// --------------------------------------ROBA MIA-------------------------------------------------------------

function randomizeAll(){
    readDataMaps();
    randomizeMaps();
    randomizeSquads();
    randomizeAgents();
}

function randomizeMaps(){
    let randomMap = getRandomElementFromMap(maps);
    buildMap(randomMap[0], randomMap[1].get('map'), randomMap[1].get('layout'));
}


function randomizeSquads() {
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
}

/**
 * Randomize both attackers and defenders agents using ``randomize`` and than updates the UI using ````.
 */
function randomizeAgents(){
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


// --------------------------------------ROBA MIA-------------------------------------------------------------

/**
 * Questo metodo aggiorna gli input contenenti i nicknames dei giocatori
 */
function updateNicknames() {
    remove('N')
    let input = document.createElement("input")
    for (i = 0; i < attackers.length; i++) {
        let elm = document.querySelector("#attackers").querySelector("#nicknames")
        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.value = attackers[i]
        input.readOnly = true
        elm.appendChild(input)
    }
    for (i = 0; i < defenders.length; i++) {
        let elm = document.querySelector("#defenders").querySelector("#nicknames")
        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.value = defenders[i]
        input.readOnly = true
        elm.appendChild(input)
    }
}

/**
 * Questo metodo aggiorna le immagine degli agenti
 */
function updateAgents() {
    remove('A')
    let img = document.createElement("img")
    for (i = 0; i < attackers.length; i++) {
        let elm = document.querySelector("#attackers").querySelector("#agents")
        img = document.createElement("img")
        img.src = "images\\Agents\\" + attackers[i] + ".png"
        elm.appendChild(img)
    }
    for (i = 0; i < defenders.length; i++) {
        let elm = document.querySelector("#defenders").querySelector("#agents")
        img = document.createElement("img")
        img.src = "images\\Agents\\" + defenders[i] + ".png"
        elm.appendChild(img)
    }
}

/**
 * Questo metodo aggiorna l'immagine della mappa
 */
function updateMap() {
    remove('M')
    let elm = document.querySelector("#map")
    img = document.createElement("img")
    img.src = "images\\Maps\\" + map + ".png"
    elm.appendChild(img)
}

/**
 * Questo metodo rimuove degli elementi specifici a seconda del parametro in input:
 * 'A' : elimina tutte le immagini relative agli agenti
 * 'N' : elimina tutti gli input conteneti i nicknames dei giocatori
 * 'M' : elimina l'immmagine della mappa
 * @param {char} c carattere che indica la voce  
 */
function remove(c) {
    let elm
    switch (c) {
        case 'A':
            elm = document.querySelector("#attackers").querySelector("#agents")
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
            elm = document.querySelector("#defenders").querySelector("#agents")
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
            break;

        case 'N':
            elm = document.querySelector("#attackers").querySelector("#nicknames")
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
            elm = document.querySelector("#defenders").querySelector("#nicknames")
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
            break;

        case 'M':
            elm = document.querySelector("#map")
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
            break;

        default:
            break;
    }
}