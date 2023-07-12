var background1 = "Background1";
var background2 = "Background2"; //To define

function start(){
    set_background(background1);
}

function set_background(img){
    document.body.style.backgroundImage = "url('./images/" + img + ".jpg')";
}