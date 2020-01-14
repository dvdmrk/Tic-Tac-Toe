var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        appInfo: {
            developer: "David Merk",
            appName: "Tic-Tac-Toe"
        },
        winner: ''
    },

    methods: {
        performMove(x,y) {
            if (this.winner == '' && this.board[x][y] == '') {
                this.board[x][y] = "x";
                this.$forceUpdate();
                if (this.gameWon('x')) {
                    this.winner = 'Humans Win!';
                    return;
                }
                //add a delay
                this.computerMove();
            }
        },
        computerMove() {
            var possibleMoves = this.getAllPossibleMoves();
            var move = Math.floor(Math.random() * possibleMoves.length);
            this.board[possibleMoves[move].x][possibleMoves[move].y] = "o";
            this.$forceUpdate();
            if (this.gameWon('o')) this.winner = 'Machines Win!';
        },
        getAllPossibleMoves() {
            var possibleMoves = [];
            this.board.map((y, indexY) => {
                y.map((x, indexX) => {
                    if (this.board[indexX][indexY] == '') {
                        possibleMoves.push({
                            'x':[indexX],
                            'y':[indexY]
                        });
                    }
                })
            })
            return possibleMoves;
        },
        gameWon(player) {
            // Horizontal rows
            for (let i=0; i<3; i++) {
                if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) {
                    return true;
                }
            }
            // Vertical rows
            for (let i=0; i<3; i++) {
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
                ['','',''],
                ['','',''],
                ['','','']
            ];
            this.winner = '';
            this.$forceUpdate();
        }
    }
})