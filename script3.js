console.log("welcome to  nidhi's tictactoe")

let audioTurn = new Audio('click.mp3')
let gameover = new Audio('turnover.mp3')
let win = new Audio('win.wav')
let gameEnd = false;

let turn = 'X'

const changeTurn = () => {
    return turn === 'X' ? '0' : 'X'
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + ' Won!!';
            gameEnd = true;
            document.querySelector('.img-box img').classList.add('visible');
        }
    })
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', (e) => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!gameEnd) {
                document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
            }
        }
    })
})




