var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        appInfo: {
            developer: "David Merk",
            appName: "Tic-Tac-Toe"
        },
        winner: '',
        humanTurn: true
    },

    methods: {
        performMove(x, y) {
            if (this.canPlayerMove(x, y)) {
                this.board[x][y] = "x";
                this.$forceUpdate();
                if (this.hasPlayerWon('x')) return;
                var possibleMoves = this.getAllPossibleMoves();
                if (this.gameIsDraw(possibleMoves)) return;
                this.humanTurn = false;
                setTimeout(this.computerMove, Math.floor(Math.random() * 3000) + 1, possibleMoves);
            }
        },
        canPlayerMove(x, y) {
            return this.humanTurn && this.winner == '' && this.board[x][y] == '';
        },
        hasPlayerWon(symbol) {
            if (this.gameWon(symbol)) {
                this.winner = (symbol == 'x' ? 'Humans' : 'Machines') + ' Win!';
                return true;
            }
        },
        gameIsDraw(possibleMoves) {
            if (possibleMoves.length === 0) {
                this.winner = 'It\'s a draw!';
                return true;
            }
        },
        computerMove(possibleMoves) {
            var move = Math.floor(Math.random() * possibleMoves.length);
            this.board[possibleMoves[move].x][possibleMoves[move].y] = "o";
            this.$forceUpdate();
            if (this.hasPlayerWon('o')) return;
            this.humanTurn = true;
        },
        getAllPossibleMoves() {
            var possibleMoves = [];
            this.board.map((y, indexY) => {
                y.map((x, indexX) => {
                    if (this.board[indexX][indexY] == '') {
                        possibleMoves.push({
                            'x': [indexX],
                            'y': [indexY]
                        });
                    }
                })
            })
            return possibleMoves;
        },
        gameWon(player) {
            // Horizontal rows
            for (let i = 0; i < 3; i++) {
                if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) {
                    return true;
                }
            }
            // Vertical rows
            for (let i = 0; i < 3; i++) {
                if (this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player) {
                    return true;
                }
            }
            // Diagonals
            if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
                return true;
            }
            if (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player) {
                return true;
            }
        },
        resetBoard() {
            this.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            this.winner = '';
            this.humanTurn = true;
            this.$forceUpdate();
        }
    }
})