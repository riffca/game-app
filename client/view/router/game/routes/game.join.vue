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
import formWrapper from 'parts/form-wrapper';

export default {
  components: {formWrapper},
  data () {
    return {
    	selectedGame: '',
    	username: '',
		games: [
			{
				name: 'stas'
			},
			{
				name: 'dina',
			}
		]
    };
  },
  asyncData(resolve, reject){
  	this.$http.get('/api/game/get-rooms');
  },
  methods:{
 	joinGame(){
  		this.$http
  			.post('/api/game/join')
  			.then(res=>{
  				let game = this.games[this.selectedGame];
  				if(!game){
  					alert('Выберете игру');
  					return;
  				}
  				this.$route.router.go({
  					name: 'gamePlay',
  					query:{
  						username: this.username,
  						gamename: game.name,
              			action: 'O'
  					}
  				});
  			})
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