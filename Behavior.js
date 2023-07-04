var maps = ["SPLIT", "HAVEN", "ASCENT", "ICEBOX", "BIND", "FRACTURE", "BREEZE"];
var agents = ["JETT", "SAGE", "SOVA", "REYNA", "OMEN", "BREACH", "BRIMSTONE", "PHOENIX", "RAZE", "KILLJOY", "CYPHER", "VIPER", "SKYE", "YORU", "ASTRA", "KAYO", "CHAMBER", "NEON"];
var players = ["a", "b", "c", "d", "e", "f"] //An array that contains all the players' nicknames
var attackers = new Array()
var defenders = new Array()
var map

/**
 * Questo metodo aggiunge un nuovo giocatore
 * @param {String} name nome del giocatore
 */
function addPlayer(name) {
    players[players.length] = name
}

function reRandomize() {

}

/**
 * Questo metodo randomizza squadre, agenti e mappa
 */
async function randomize() {
    randomizeSquads()

    await ramdomizeAgents()

    ramdomizeMap()
}


/**
 * Questo metodo randomizza gli agenti
 */
function ramdomizeAgents() {
    buff = [...agents]
    for (i = 0; i < attackers.length; i++) {
        r = Math.floor(Math.random() * (buff.length - 1))
        while (buff[r] == 0) {
            r = Math.floor(Math.random() * (buff.length - 1))
        }
        attackers[i] = buff[r]
        buff[r] = 0
    }

    buff = [...agents]
    for (i = 0; i < defenders.length; i++) {
        r = Math.floor(Math.random() * (buff.length - 1))
        while (buff[r] == 0) {
            r = Math.floor(Math.random() * (buff.length - 1))
        }
        defenders[i] = buff[r]
        buff[r] = 0
    }
    updateAgents()
}

/**
 * Questo metodo randomizza le squadre
 */
function randomizeSquads() {
    buff = [...players]
    for (i = 0; i < (buff.length) / 2; i++) {
        r = Math.floor(Math.random() * (buff.length - 1))
        while (buff[r] == 0) {
            r = Math.floor(Math.random() * (buff.length - 1))
        }
        attackers[i] = buff[r]
        buff[r] = 0
    }
    n = 0
    for (i = 0; i < buff.length; i++) {
        if (buff[i] != 0) {
            defenders[n] = buff[i]
            n++
        }
    }
    updateNicknames()
}

/**
 * Questo metodo randomizza la mappa
 */
function ramdomizeMap() {
    r = Math.floor(Math.random() * (maps.length - 1))
    map = maps[r]
    updateMap()

}

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