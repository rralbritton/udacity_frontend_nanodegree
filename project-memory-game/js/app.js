
let cardList = ["fas fa-dove", "fa fa-tree", "fas fa-moon", "fab fa-pagelines", " fa fa-certificate", "fa fa-leaf", "fa fa-cloud", " fas fa-sun"];
const deck = document.getElementById('deck');
let cards = document.getElementsByClassName('card');
let win = document.getElementById('win');
let game = document.getElementById('game');
let scoreClock = document.getElementById('timer');
let starList = document.getElementsByClassName('fa-star');
let gameClock,li, i, results; 
let moves = 0;
let matches = 0;
let timer = 0;
let starCount = 0;
let openCards = [];

function getCardClass(card) {
    return card.children[0];
}
function resetOpenCards(){
    openCards = [];
}
function showCards(card){
    card.parentElement.className += ' open show';
}
function noMatch(){
    openCards.forEach(function(elem){
        setTimeout(function(){
            elem.parentElement.className ='card'
    },1000);
});
}
function countMoves() {
    moves = moves + 1;
    startClock();
    document.getElementById('countMoves').textContent = moves;
}
function flipCard(card) {
    //get length of open cards array
    let length = openCards.length;
    starRating();

    if (length === 0) {
        openCards.push(card);
        showCards(card);
        countMoves();
    }

    if (length === 1 && card.parentElement.classList.contains('open')=== false) {
        openCards.push(card);
        showCards(card);
        countMoves();

        //determine match state
        if(openCards[0].className===openCards[1].className){
            matches = matches + 1;
            openCards.forEach(function(elem){
                elem.parentElement.className = 'card match'
            });
            resetOpenCards();
            getMatchCount();
            }   
        else {  
            //showCards(card);
            openCards.forEach(function(elem){
                elem.parentElement.className = 'card open show nomatch'
            });
            noMatch();
            resetOpenCards();
            }
        }
    };
function shuffle(array) { //from http://stackoverflow.com/a/2450976
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function createCards(){   //Review HTML lesson using `${}`
    cardList.forEach(function(elem){
        li = document.createElement('li');
        li.className = 'card';
        i = document.createElement('i');
        i.className = elem;
        li.appendChild(i);
        deck.appendChild(li);
    });
};
function collectCards() {
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    resetOpenCards();
}
function dealCards() {
    for (var i = 0; i < 2; i++) {
        cardList = shuffle(cardList);
        createCards();
    }
    //make cards clickable
    Array.from(cards).forEach(function(elem){
        elem.addEventListener('click',function(evt){
            let card = getCardClass(evt.target);
            flipCard(card);
        });
    });
}
function getMatchCount() {
    if(matches === 8){
        setTimeout(function(){
            winnerPage();
        },500);
    }
}
function clock(){ 
    ++timer;
    let hour = Math.floor(timer / 3600);
    let minute = Math.floor((timer - hour * 3600) / 60);
    let second = timer - hour * 3600 - minute * 60;
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    document.getElementById('timer').textContent = hour + ':' + minute + ':' + second;
}
function startClock() {
    if(moves === 1){
        gameClock = setInterval(function(){
            clock();
        },1000);
     } 
}
function stopTimer(){
    clearInterval(gameClock);
}
function starRating(){
        if(moves <= 24){
            document.getElementById('star1').style.display = 'block';
            document.getElementById('star2').style.display = 'block';
            document.getElementById('star3').style.display = 'block';
        }
        else if(moves > 24 && moves < 32){
            document.getElementById('star1').style.display = 'block';
            document.getElementById('star2').style.display = 'block';
            document.getElementById('star3').style.display = 'none';
        }
        else if(moves > 32 ){
            document.getElementById('star1').style.display = 'block';
            document.getElementById('star2').style.display = 'none';
            document.getElementById('star3').style.display = 'none';
        }
    }
function winnerPage() {
    stopTimer();
    game.style.display = 'none';
    win.style.display = 'block';
    document.getElementById('winMoves').textContent = moves;
    document.getElementById('winTime').textContent = scoreClock.textContent;

    //Count # of visible stars
    for(s = 0; s<starList.length; s++){
        if(starList[s].style.display ==='block'){
            starCount = starCount+1
        }
    }   
    document.getElementById('winStars').textContent = starCount;
}   
function resetGame() {
    moves = 0;
    timer = 0;
    matches = 0;
    starCount = 0;
    stopTimer();
    collectCards();
    dealCards();
    scoreClock.textContent = '00:00:00';
    document.getElementById('countMoves').textContent = moves;
    game.style.display = 'flex';
    win.style.display = 'none';
    document.getElementById('star1').style.display = 'none';
    document.getElementById('star2').style.display = 'none';
    document.getElementById('star3').style.display = 'none';
}

//Play Game
dealCards();

//Reset Board
document.getElementById('repeat').addEventListener('click', function(evt){
    resetGame();
    evt.target.classList.add('rotate','around');
    setTimeout(function(){
        evt.target.classList.remove('rotate','around'); 
    },2500);
});

//Play New Game
document.getElementById('playAgain').addEventListener('click',function(){
    resetGame();
})