<template>
<div id="click-button">
	<slot></slot>	
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
#click-button {
	width: 100px;
	height: 50px;
	display: inline-block;
	cursor: pointer;
	&:hover {
		background: lighten(black,70%);
	}
}

</style>