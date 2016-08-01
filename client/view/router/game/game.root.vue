<template>
<div id="game-root">
	<router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
		
    };
  }
};
</script>

<style lang="sass">
@import '../../variables';
#game-root {
	height: inherit;
	@include center-page-container(90%);
	padding-top:8%;
	@media screen and(max-width: 830px){
		padding-top:20%;
		width: 100%;
	}
}
</style>