var maps = ["SPLIT","HAVEN","ASCENT","ICEBOX","BIND", "PEARL"]; //Fracture non la vuole nessuno
var agents = ["JETT","SAGE","SOVA","REYNA","OMEN","BREACH","BRIMSTONE","PHOENIX","RAZE","KILLJOY","CYPHER","VIPER","SKYE","YORU","ASTRA","KAY/O","CHAMBER","NEON"];
var background1 = "Background1";
var background2 = "Background2"; //To define


function start(){
    // set_background(background1);
}

function set_background(img){
    document.body.style.backgroundImage = "url('./images/" + img + ".jpg')";
}

function getSquadsArray(players){
    console.log(typeof(players));
}

function getRandomMap(){
    return maps[Math.floor(Math.random() * maps.length) + 1];
}