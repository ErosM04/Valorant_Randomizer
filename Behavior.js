var maps = ["SPLIT","HAVEN","ASCENT","ICEBOX","BIND"]; //Fracture non la vuole nessuno
var agents = ["JETT","SAGE","SOVA","REYNA","OMEN","BREACH","BRIMSTONE","PHOENIX","RAZE","KILLJOY","CYPHER","VIPER","SKYE","YORU","ASTRA","KAY/O","CHAMBER","NEON"];
var background1 = "Background1";
var background2 = "Background2"; //To define
var players = ["a", "b", "c", "d", "e", "f"] //An array that contains all the players' nicknames
var attackers = new Array()
var defenders = new Array()

function addPlayer(name){
    players[players.length] = name
}

function reRandomize(){

}

async function randomize(){
    randomizeSquad()

    await updateLabels()

    await ramdomizeAgents()
    
    updateAgents()
}

function ramdomizeAgents(){
    buff = [...agents]
    for(i = 0 ; i < attackers.length ; i++){ 
        r = Math.floor(Math.random()*(buff.length-1))
        while(buff[r] == 0){
            r = Math.floor(Math.random()*(buff.length-1))
        }
        attackers[i] = buff[r]
        buff[r] = 0
    }

    buff = [...agents]
    for(i = 0 ; i < defenders.length ; i++){ 
        r = Math.floor(Math.random()*(buff.length-1)) 
        while(buff[r] == 0){
            r = Math.floor(Math.random()*(buff.length-1))
        }
        defenders[i] = buff[r]
        buff[r] = 0
    }
}

function randomizeSquad(){
    for(i = 0 ; i < (players.length)/2 ; i++){
        r = Math.floor(Math.random()*(players.length-1)) 
        while(players[r] == 0){
            r = Math.floor(Math.random()*(players.length-1)) 
        }
        attackers[i] = players[r]
        players[r] = 0  
    }
    for(i = 0 ; i < players.length ; i++){
        if(players[i] != 0){
            defenders[defenders.length] = players[i]
        }
    }
}

function updateLabels(){
    let input = document.createElement("input")
    for(i = 0; i < attackers.length; i++){
        let elm = document.querySelector("#attackers").querySelector("#nicknames")
        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.value = attackers[i]
        input.readOnly = true
        elm.appendChild(input)
    }
    for(i = 0; i < defenders.length; i++){
        let elm = document.querySelector("#defenders").querySelector("#nicknames")
        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.value = defenders[i]
        input.readOnly = true
        elm.appendChild(input)
    }
}

function updateAgents(){
    //la faro' giuro
}
