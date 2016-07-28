<template>
<div id="index">
	<div class="brand-action">
	   	<a v-link="{name: 'gameCreate'}">Create game</a>
	</div>
	<div class="brand-action">
	   	<a v-link="{name: 'gameJoin'}">Join game</a>
	</div>
</div>
</template>

<script>
//import brandButton from 'parts/brand-button';
export default {
  components: {/*brandButton*/},
  data () {
    return {

    };
  }
};
</script>

<style lang="sass">
@import '../variables.scss';
#index{
	@include center-page-container(70%);
	display: flex;
	justify-content:space-around;
	.brand-action {
		position: relative;
		background:$brand-bg;
		height: 400px;
		width: 400px;
		a {
			position: absolute;
			text-decoration:none;
			top: 50%;
			left: 30%;
			transform: translateY(-50%);
		  	color: white;
			font-size: 1.6rem;
		}
	}
}
</style>