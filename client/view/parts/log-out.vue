<template>
<div id="log-out" @click="logOut">
	Выход
</div>
</template>
<script>
export default {
  methods: {
  	logOut(){
  		let app = this.$root.app;
  		app.logOut();
  		window.location = '/';
  	}
  }
};
</script>

<style lang="sass">
#log-out {
	font-weight: normal;
	display: inline-block;
	font-size: 1.1rem;
	cursor: pointer;
	margin-left: 20px;
	&:hover {
		outline: 1px solid darkred;
	}
}
</style>