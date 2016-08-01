//http://codepen.io/schwartz-world/pen/RaJBXb?editors=0100
var game = new Vue({
  el: '#grid',
  data: {
    myTurn: false,
    modal: true,
    message: "Beach Tic Tac Toe",
    //You'll eventually be able to choose your token
    myToken: 'x',
    compToken: 'o',
    // 2d grid of squares. this.rows[0][1]
    board: [
      [
        {id: 0, contents: '', background: 'unmarked'},
        {id: 1, contents: '', background: 'unmarked'}, 
        {id: 2, contents: '', background: 'unmarked'}
      ],
      [
        {id: 3, contents: '', background: 'unmarked'},
        {id: 4, contents: '', background: 'unmarked'}, 
        {id: 5, contents: '', background: 'unmarked'}
      ],[
        {id: 6, contents: '', background: 'unmarked'},
        {id: 7, contents: '', background: 'unmarked'}, 
        {id: 8, contents: '', background: 'unmarked'},
      ]
    ],
    winVectors: function() {
      var board = this.board;
      var vectors = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
      ];
      return vectors;
    }
  },
  
  computed: {
    //produces a flat array of all available choices for the computer's turn. There's a bunch of functionality in this.checkWin() that could be moved here.
    available: function(){
      var flattened = this.board.reduce(function(a, b) {
        return a.concat(b);
      }, []);
      return flattened.filter(this.empty);
    },
  },
  
  methods: {
    //User turn
    startGame: function() {
      this.modal = false;
      this.myTurn = true;
    },
    startCPU: function() {
      this.modal = false;
      this.computerTurn();
    },
    mark: function(square) {
      if (this.myTurn) {
        if (this.empty(square)) {
          square.contents = this.myToken;
          square.background = "player"
          this.message = "Computer turn!";
          //Did I win?
          this.myTurn = false;
          this.checkWin(square);
        } else {
          this.message = 'This square is not empty. Try again.';
        }
      } 
    },
    //Is the square empty?
    empty: function(square) {
      if (square.contents === "") {
        return true;
      } else {
        return false;
      }
    },
    // New game
    clearAll: function() {
      this.board.forEach(function(row) {
        row.forEach(function (square) {
          square.contents = "";
          square.background = "unmarked";
        })
      })
      this.newGame();
    },
    newGame: function() {
      var coin = Math.floor(Math.random() * 2);
      if (coin === 0) {
        this.myTurn = false;
        this.message = "Computer goes first";
        setTimeout(function() {game.computerTurn();}, 1500);
      } else {
        this.message = "New game! Your turn!"
        this.myTurn = true;
      }
    },
    
    computerTurn: function() {
      var choices = this.planMove();
      if (choices[0]) {
        var square = choices[Math.floor(Math.random() * choices.length)];
      } else {
      // random square from this.available
        var square = this.available[Math.floor(Math.random() * this.available.length)];
      }
      square.contents = this.compToken;
      square.background = "computer"
      this.message = "Your turn!";
      this.myTurn = true;
      console.log(square.contents);
      this.checkWin(square);
    },
    
    planMove: function() {
      var choices = [];
      this.winVectors().forEach(function(vector) {
        if (planMove(vector)) {
          choices.push(planMove(vector));
        }
      });
      return choices;
    },
    
    checkWin: function(square) {
      var won;
      this.winVectors().forEach(function(elem) {
        if (checkMe(elem)) {
          won = elem;
        }
      });
      if (won) {
        if (square.contents == this.myToken) {
          this.message = "You won! New Game!";
        } else if (won && square.contents == this.compToken) {
          this.message = "I won! You suck! New Game!";
        } 
        won.forEach(function(square) {
          square.background = 'winner';
        });
        this.myTurn = false;
        setTimeout(function() {game.clearAll();}, 3000);
      } else if (square.contents == this.myToken) {
        setTimeout(function() {game.computerTurn();}, 750);
      }  
      if (!won && this.available == false) {
        this.message = 'Game over! Tie!';
        setTimeout(function() {game.clearAll();}, 3000);
      }
    }
  }
});

var checkMe = function(arr) {
  var one = arr[0].contents;
  return one != "" && one == arr[1].contents && one == arr[2].contents;
};

var planMove = function(arr) {
  // checks for potential wins with two of the same marker
  var unmarked = [];
  var marked = [];
  arr.forEach(function(el) {
    if (game.empty(el)) {
      unmarked.push(el);
    } else {
      marked.push(el);
    }
  });
  if (marked.length === 2 && marked[0].contents == marked[1].contents) {
    return unmarked[0];
  }
}
