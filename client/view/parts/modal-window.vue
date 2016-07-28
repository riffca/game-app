<template>
<div id="modal-window" v-bind:class="{'show-modal': show}">
	<div class="modal-target" v-if="!show">
		<span @click="show=!show">{{ action }}</span>
	</div>
	<div class="modal-content" v-if="show">
		<slot></slot>
		<click-button @click="show=!show" class="close-window">Закрыть</click-button>	
	</div>
</div>

</template>

<script>
import clickButton from './click-button';
export default {
  components: {clickButton},
  props: {
  	action:String
  },
  data () {
    return {
		show: false
    };
  }
};
</script>

<style lang="sass">
#modal-window{
	.modal-target {
		span{
			margin:8px;
			font-size: 1.3rem;
			cursor: pointer;
			&:hover {
				background: white;
			}
		}
	}
	.modal-content{
		position: relative;
		margin: 20% auto 0 auto;
		width: 70%;
		background: white;
		.close-window {
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	&.show-modal{
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	    position: fixed;
	    background: rgba(black,.4);	
	}
}
</style>