function start(){
    set_background(background1);
}

function set_background(img){
    document.body.style.backgroundImage = "url('./images/" + img + ".jpg')";
}