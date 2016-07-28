<template>
<div id="game-create">
<form-wrapper>		
	<form @submit.prevent="createUser()">
		<div class="input-control">
			<label for="gamename">Game name:</label>
			<input type="text" id="gamename" v-model="gamename" placeholder="Enter game name">
		</div>
		<div class="input-control">
			<label for="username">Your nickname:</label>
			<input type="text" id="username" v-model="username" placeholder="Enter user name">
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
		
    };
  }
};
</script>

<style lang="sass">
#game-create {

}
</style>