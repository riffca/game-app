<template>
<div id="brand-root">
	<a href="/" class="brand-logo">Tic Tac Toe Game</a>
	<div class="links-wrapper" v-show="$route.name !== 'index'">
		<a class="links" @click="joinGame" v-show="$route.name !== 'gameJoin'">Join game</a>
		<a class="links" @click="createGame" v-show="$route.name !== 'gameCreate'">Create game</a>
	</div>	
</div>
</template>

<script>
import socketService from 'service/socket';
export default {
	methods:{
		createGame(){
			//if user disconect from aother game
			let game = this.$route.query.gamename;
			if(game){
				socketService.emit('leave room',{room: game});
			}
			this.$route.router.go({name:'gameCreate'});
		},
		joinGame(){
			this.$route.router.go({name:'gameJoin'});
		}
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
		&:hover{
			color: grey;
		}
	}
	.links-wrapper{
		display:inline-block;
		margin-left:30px;
		.links {
			cursor:pointer;
			margin-left: 10px;
			display: inline-block;
			position: relative;
			transform:translateY(70%);
			&:hover{
				color: darken(white,50%);
			}
		}
	}
}
</style>