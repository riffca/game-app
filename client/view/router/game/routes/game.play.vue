<template>
<div id="game-play">
	<div class="game-section">
		<h2>Game: {{$route.query.gamename}}</h2>	
		<tic-tac-toe-game :room="room"></tic-tac-toe-game>
	</div>
	<div class="chat-section">
		<h2>User: {{$route.query.username}}</h2>
		<chat :room="room"></chat>
	</div>
</div>
</template>

<script>
import chat from '../components/chat';
import socketService from 'service/socket';
import ticTacToeGame from '../components/tic-tac-toe-game';
export default {
  components: {ticTacToeGame,chat},
  data(){
  	return {
  	   room: '',
  	}
  },
  created(){
  	this.room =  this.$route.query.gamename
  	socketService.emit('create room',this.room);
  	socketService.on('create room',msg=>{
  		logger('game created');
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