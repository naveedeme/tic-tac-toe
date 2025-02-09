const TicTacToe = (() => {
    const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let player = [];
    let computer = [];
    let turn = 0;
    let gameOver = false;

    const createGameContainer = () => {
        const gameContainer = document.createElement('div');
        gameContainer.className = 'game-container';
        document.body.appendChild(gameContainer);

        const title = document.createElement('h1');
        title.textContent = 'Tic-Tac-Toe';
        gameContainer.appendChild(title);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'container';
        gameContainer.appendChild(gridContainer);

        return gridContainer;
    };

    const createGridCells = (container) => {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            container.appendChild(cell);
        }
    };

    const createResultModal = () => {
        const modal = document.createElement('div');
        modal.id = 'resultModal';
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const resultMessage = document.createElement('span');
        resultMessage.id = 'resultMessage';
        modalContent.appendChild(resultMessage);

        const playAgainButton = document.createElement('button');
        playAgainButton.id = 'playAgainButton';
        playAgainButton.textContent = 'Play Again';
        modalContent.appendChild(playAgainButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        playAgainButton.addEventListener('click', resetGame);
    };

    const makeMove = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (gameOver || cell.textContent !== '') return;

                if (turn % 2 === 0) {
                    player.push(parseInt(cell.id));
                    cell.textContent = 'X';
                    cell.style.color = '#ff4757';
                    if (checkWin(player)) {
                        endGame('Player Wins!', 'winner-message');
                        return;
                    }
                } else {
                    computer.push(parseInt(cell.id));
                    cell.textContent = 'O';
                    cell.style.color = '#2ed573';
                    if (checkWin(computer)) {
                        endGame('Computer Wins!', 'computer-winner-message');
                        return;
                    }
                }

                turn++;
                updateHoverClass();
                if (turn === 9) {
                    endGame('It\'s a Draw!', 'draw-message');
                }
            });
        });
    };

    const updateHoverClass = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (cell.textContent === '') {
                if (turn % 2 === 0) {
                    cell.classList.remove('computer-turn');
                    cell.classList.add('player-turn');
                } else {
                    cell.classList.remove('player-turn');
                    cell.classList.add('computer-turn');
                }
            }
        });
    };

    const checkWin = (moves) => {
        return win.some(combo => combo.every(val => moves.includes(val)));
    };

    const endGame = (message, className) => {
        gameOver = true;
        const modal = document.getElementById('resultModal');
        const resultMessage = document.getElementById('resultMessage');
        resultMessage.textContent = message;
        resultMessage.className = className;
        modal.style.display = 'flex';
    };

    const resetGame = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('player-turn', 'computer-turn');
        });
        player = [];
        computer = [];
        turn = 0;
        gameOver = false;
        updateHoverClass();
        const modal = document.getElementById('resultModal');
        modal.style.display = 'none';
    };

    const playGame = () => {
        const gridContainer = createGameContainer();
        createGridCells(gridContainer);
        createResultModal();
        makeMove();
        updateHoverClass();
    };

    return {
        playGame
    };
})();

TicTacToe.playGame();