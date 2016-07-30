<template>
<div id="game-play">
	<div class="game-section">
		<h2>Game: {{$route.query.gamename}}</h2>
		<h1 v-if="!playerJoined">waiting for second player</h1>	
		<tic-tac-toe-game :room="room" v-if="playerJoined"></tic-tac-toe-game>
	</div>
	<div class="chat-section">
		<h2>Chat</h2>
		<chat :room="room"></chat>
	</div>
</div>
</template>

<script>
//socket io
import socketService from 'service/socket';
//html
import chat from '../components/chat';
import ticTacToeGame from '../components/tic-tac-toe-game';
//Component
export default {
  components: {ticTacToeGame,chat},
  data(){
  	return {
  		playerJoined: false,
  		firstPlayer: '',
  		secondPalyer: ''
  	}
  },
  created(){
  	socketService.on('get creator',data=>{
  		this.firstPlayer = new Player({
  			name: data.name,
  			action: data.action
  		});
  	});
  	socketService.on('join game',data=>{
  		this.playerJoined = true;
  		this.secondPalyer = new Player({
  			name: data.name,
  			action: data.action
  		});
  	});
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