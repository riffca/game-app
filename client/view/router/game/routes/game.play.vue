<template>
<div id="game-play">
	<div class="game-section">
		<h2>Game: {{$route.query.gamename}}, Creator: {{firstPlayer.name}}, Visitor: {{secondPlayer.name}}</h2>
		<h1 v-if="!playerJoined">waiting for second player</h1>	
		<tic-tac-toe-game v-if="playerJoined"></tic-tac-toe-game>
	</div>
	<div class="chat-section">
		<h2>Chat</h2>
		<chat></chat>
	</div>
</div>
</template>

<script>
//socket io
import socketService from 'service/socket';
//html
import chat from '../components/chat';
import ticTacToeGame from '../components/tic-tac-toe-game';
//class
import Player from 'class/player';
//Component
export default {
  components: {ticTacToeGame,chat},
  data(){
  	return {
  		playerJoined: false,
  		firstPlayer: {},
  		secondPlayer: {},
      currentPlayer: {}
  	}
  },
  created(){
  	let query = this.$route.query;
    //
    //if game creator
    //
  	if(query.state === 'creator'){

      //create new firstPlayer
  		this.firstPlayer = new Player({
        game: query.gamename,
  			name: query.username,
  			action: 'X'
  		});

      //choose current ui player
      this.currentPlayer = this.firstPlayer;

      //get secondPlayer
      socketService.on('join game',data=>{
        this.playerJoined = true;
        //create new secondPlayer
        this.secondPlayer = new Player({
          game: query.gamename,
          name: data.username,
          action: 'O'
        });
      });

      //send creator to  visitor ui
      socketService.on('get creator',data=>{
        socketService.emit('send creator',{
          username: this.firstPlayer.name
        })
      });

    //
    //if game visitor
    // 
  	} else if(query.state === 'visitor'){
      this.playerJoined = true;
      //create new secondPlayer
  		this.secondPlayer = new Player({
        game: query.gamename,
  			name: query.username,
  			action: 'O'
  		});
      //make current ui player
      this.currentPlayer = this.secondPlayer;

      //tell creator about joining
      socketService.emit('join room',{
        username: this.secondPlayer.name,
        room: query.gamename
      })
      //get second player
      socketService.emit('get creator','');
      socketService.on('send creator',data=>{
      //create new firstPlayer
        this.firstPlayer = new Player({
          game: query.gamename,
          name: data.username,
          action:'X'
        })
      });
    //
    //else
    //
  	} else {
      //pretent to break ui
      window.location = '/';
    }
  }
};
</script>

<style lang="sass">
@import '../../../variables'; 
#game-play {
	@media screen and(min-width: 1400px){
		margin-top: -3%;
	}
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	height: 100%;
	.chat-section,
	.game-section{
		background: white;
		border: 1px solid grey;
		margin: 10px;
		h2 {
			font-weight: normal;
		}
	}
	.chat-section {
		display: relative;
		min-width: 200px;
		flex: 3;
	}
	.game-section {
		min-width: 500px;
		flex:6;
	}
}
</style>