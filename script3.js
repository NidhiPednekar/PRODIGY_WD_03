let audioTurn = new Audio('click.mp3');
let gameover = new Audio('gameover.mp3');
let win = new Audio('win.wav');
let gameEnd = false;

let turn = 'X';

const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    // Check for win conditions
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + ' Won!!';
            gameEnd = true;
            win.play()
            document.querySelector('.img-box img').classList.add('visible');
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width = "20vw";
        }
    });

    // Check for tie condition
    let allFilled = true;
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === '') {
            allFilled = false;
            break;
        }
    }
    if (allFilled && !gameEnd) {
        document.querySelector('.info').innerText = "It's a Tie!";
        gameEnd = true;
        document.querySelector('.img-box img').src = "well_played.gif";
        document.querySelector('.img-box img').classList.add('visible');
        gameover.play();
    }
};

// Add event listeners to boxes
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!gameEnd) {
                document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
            }
        }
    });
});

// Reset button event listener
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = 'X';
    gameEnd = false;
    document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
    document.querySelector('.img-box img').classList.remove('visible');
    document.querySelector(".line").style.width = "0vw";
});
