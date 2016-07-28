<template>
<div id="game-join">
	сделать выбор игры прямо в форме.
	<form-wrapper>		
		<form @submit.prevent="createUser()">
			<div class="input-control">
				<label for="username">Your nickname</label>
				<input type="text" id="username" v-model="username" placeholder="Enter your nickname">
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
#game-join {

}
</style>