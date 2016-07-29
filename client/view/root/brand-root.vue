<template>
<div id="brand-root">
	<a v-link="{name: 'index'}" class="brand-logo">Tic Tac Toe Game</a>
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
#brand-root {
	width: 100%;
	position: fixed;
	padding:20px;
	max-height: 100px;
	border-bottom: 1px solid grey;
	z-index: 9999;
	.brand-logo {
		margin-left: 20%;
		font-size: 1.4rem;
		color: black;
	}
}
</style>