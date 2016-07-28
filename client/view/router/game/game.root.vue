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
	@include center-page-container(70%);

}
</style>