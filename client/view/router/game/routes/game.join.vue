<template>
<div id="game-join">
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
					   placeholder="Enter your nickname">
			</div>
			<button type="submit">Go</button>
		</form>
	</form-wrapper>
</div>
</template>
<script>
import socketService from 'service/socket';
import formWrapper from 'parts/form-wrapper';
export default {
  components: {formWrapper},
  data () {
    return {
    	selectedGame: '',
    	username: '',
		games: ''
    };
  },
  asyncData(resolve, reject){
  	this.$http.get('/api/game/join').then(res=>{
  		if(res.data === 'No games'){
  			alert('No games to play!');
  			this.$route.router.go({name: 'index'});
  			return;
  		}
  		resolve({
  			games: res.data
  		})
  	});
  },
  methods:{
 	joinGame(){
		let game = this.games[this.selectedGame];
  			if(!game){
  				alert('Выберете игру');
  				return;
  			}
  			this.$route.router.go({
  				name: 'gamePlay',
  				query:{
  					state: 'visitor',
  					gamename: game.name,
  					username: this.username
  				}
  			}); 		
  		}  	
  }
};
</script>

<style lang="sass">
#game-join {
	.select-game {
		text-align: center;
		margin: 0 auto;
			.game {
			cursor: pointer;
			user-select: none;
			display: inline-block;
			height: 100px;
			width: 100px;
			text-align: conter;
			line-height: 100px;
			&.selected {
				background:red; 
			}
		}
	}
}
</style>