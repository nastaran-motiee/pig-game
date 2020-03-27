/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;

init();

//Example to change the content of the DOM:
/*
document.querySelector('#current-' + activePlayer).textContent = dice;//The object that gives us access to the DOM is the document object and querySelector selects elements from the web page usig id(in css to select id we use the # symbol)

document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>; //The textContent in the top line is used only for regular content, so here we used innerHTML to use HTML content and we will get the same result as the top line
*/

//Examles to eventListener:
/*
function btn(){
    //do something here

}

document.querySelector('.btn-roll').addEventListener('click', btn ); // The parameters are the event and the name of the function that we want to happen ( we write the function name without () because the event listener calls the function for us )
*/

//or we can write an anonymous function instead of the name of function (the anonymous function can not be reused )
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; //Math.random will give us a number betweenn 0 to 1 and Math.random*6 will give us a number between 0 to 6

        //2. Display the result 
        var diceDOM = document.querySelector('.dice');//Set a dice selector so we don't need to select the dice every time
        diceDOM.style.display = 'block'; //We set the display style to none. So, the first thing is to bring the style back to block.So, in CSS, when we want to display something as a block,we simply use the display property, and set it to block.
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the the rolled number was NOT 1
        if (dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
} ); 

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;
        
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent= scores[activePlayer];
        
        //Check if player won the game
        if (scores[activePlayer] >= 10){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    //Initialize the game
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';// In CSS to hide something we will change the style.display content to 'none' (dice is a class and not an id so we will use . to select it )(we hide the dice because before the game begins we don't want to see it )

    //Instead of querySelector we can use getElementByID method which only works for IDs but it is faster than querySelector (here we don't use # symbol as we did in CSS style)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

function nextPlayer(){
    //Next player
    activePlayer === 0 ? activePlayer =1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
   

    /*
    if (activePlayer === 1){
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    } else{
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
    */
    

    //We will do it diffrently, by toggle function (what toggle does is to add the class, it's not there, and if it's there, to remove.)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';//Every times a player rolls a one, the dice disapears
}

