<template>
<div class="no-games" v-if="!anyGames || !games.length">
	No games to play. Create or wait!
</div>
<div id="game-join" v-if="anyGames">
	<div class="select-game">
		<div class="game" 
			v-for="game in games"
			@click="selectedGame = $index"
			v-bind:class="{'selected': selectedGame === $index}">
			{{ game.name }}
		</div>
	</div>
	<form-wrapper>	
		<form @submit.prevent="joinGame">
			<div class="input-control">
				<label for="username">Your nickname</label>
				<input type="text" 
				       required
					   id="username" 
					   v-model="username" 
					   autocomplete="off"
					   placeholder="Enter your nickname">
			</div>
			<button type="submit" disabled="{{disableButton}}">Play</button>
		</form>
	</form-wrapper>
</div>
</template>
<script>
/**
/*
/*J O I N  G A M E
/*
*/
import socketService from 'service/socket';
import formWrapper from 'parts/form-wrapper';
export default {
  components: {formWrapper},
  data () {
    return {
    	disableButton: false,
    	anyGames: false,
    	selectedGame: '',
    	username: '',
		games: ''
    };
  },

  asyncData(resolve, reject){
  	this.$http.get('/api/game/join').then(res=>{
  		//check for games
  		if(res.data === 'No games'){
  			//change view
  			this.anyGames = false;
  			return;
  		}
  		//change view
  		this.anyGames = true;
  		resolve({
  			games: res.data
  		})
  	},()=>{alert('Server error')});
  },
  methods:{
 	joinGame(){
		let game = this.games[this.selectedGame];
  			if(!game){
  				alert('Choose game');
  				return;
  			}
  			this.disableButton = true;
  			this.$route.router.go({
  				name: 'gamePlay',
  				query:{
  					state: 'visitor',
  					gamename: game.name,
  					username: this.username
  				}
  			}); 		
  		}  	
  },
  created(){
  	/**
  	/*Listen to socket evets
  	*/
  	socketService.on('new rooms',rooms=>{
  		if(!rooms.length){
  		   this.anyGames = false;
  		}
  		this.games = rooms;
  		this.anyGames = true;
  	})
  }
};
</script>

<style lang="sass">
@import '../../../variables';

.no-games {
	position: relative;
	height: 100%;
	text-align: center;
	font-size: 1.6rem;
	padding-top:20%;
	@include change-animation(100%,100%);
}
#game-join {
	.select-game {
		text-align: center;
		margin: 0 auto;
			.game {
			color: lighten($brand-bg,24%);
			cursor: pointer;
			user-select: none;
			display: inline-block;
			height: 100px;
			width: 100px;
			text-align: center;
			line-height: 100px;
			font-size:1.5rem;
			&.selected {
				background:lighten($application-bg,2%);
				border:1px solid darken($application-bg,10%);
			}
		}
	}
}
</style>