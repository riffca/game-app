<template>
	<div id="actions-panel">
		<h4>{{title}}</h4>
		<slot>	
		</slot>
	</div>
</template>
<script>
export default {
  props: ['title'],
  data () {
    return {
		
    };
  }
};
</script>

<style lang="sass">
@import '../variables';
#actions-panel{
	max-height: 600px;
	@include defaultbg();

}
</style>