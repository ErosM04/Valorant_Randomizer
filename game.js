// console.log('aaaa');
function test(){
    window.location = 'a.html';
    return true;
}

function printParameters() {
    console.log(JSON.parse(sessionStorage.players));
    console.log(JSON.parse(sessionStorage.agents));
    console.log(JSON.parse(sessionStorage.maps));
}