/**
 * For each player (not less than 0 or more than 10) use ``createPlayerForm()`` to create a input text to
 * insert the player name.
 * 
 * @param {number} number the number of total players.
 */
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

/**
 * Creates the text (e.g. 'Player-0') and input text to used to insert the player's name. 
 * 
 * @param {number} index the index of the player
 */
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