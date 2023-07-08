const players = [];

function createPlayers(number){
    if(number < 0)
        number = 0;
    else if(number > 10)
        number = 10;

    document.getElementById('players-inserter-div').innerHTML = '';
    for (let i = 0; i < number; i++) {
        createPlayerForm(i);  
    }
}

function createPlayerForm(index){
    // Creates the container
    let div = document.createElement('div');
    div.className = "deselect-div player-name-div";
    // Creates the text
    let text = document.createElement('p');
    text.innerText = 'Player-' + index;
    // Creates the input
    let input = document.createElement('input');
    input.id = 'input-player-' + index;
    input.type = 'text';

    // Appends the elements
    div.appendChild(text);
    div.appendChild(input);
    document.getElementById('players-inserter-div').appendChild(div);
}

/*
    <div class="deselect-div player-name-div">
        <p>Player1:</p>
        <input type="text">
    </div>
*/