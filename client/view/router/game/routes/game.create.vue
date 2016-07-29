<template>
<div id="game-create">
<form-wrapper>		
	<form @submit.prevent="createGame()">
		<div class="input-control">
			<label for="gamename">Game name:</label>
			<input type="text" id="gamename" v-model="gamename" placeholder="Enter game name" required>
		</div>
		<div class="input-control">
			<label for="username">Your nickname:</label>
			<input type="text" id="username" v-model="username" placeholder="Enter user name" required>
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
    	gamename: '',
    	username: ''
    };
  },
  methods: {
  	createGame(){
  		this.$http
  			.post('/api/game/create')
  			.then(res=>{
  				this.$route.router.go({
  					name: 'gamePlay',
  					query:{
  						username: this.username,
  						gamename: this.gamename,
              action: 'X'
  					}
  				});
  			});
  	}
  }
};
</script>

<style lang="sass">
#game-create {

}
</style>