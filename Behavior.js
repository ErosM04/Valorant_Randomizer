var maps = ["SPLIT","HAVEN","ASCENT","ICEBOX","BIND"]; //Fracture non la vuole nessuno
var agents = ["JETT","SAGE","SOVA","REYNA","OMEN","BREACH","BRIMSTONE","PHOENIX","RAZE","KILLJOY","CYPHER","VIPER","SKYE","YORU","ASTRA","KAY/O","CHAMBER","NEON"];
var background1 = "Background1";
var background2 = "Background2"; //To define


function start(){
    set_background(background1);
}

function set_background(img){
    document.body.style.backgroundImage = "url('\\images\\" + img + ".png')";
}