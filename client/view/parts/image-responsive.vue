<template>
<div id="image-responsive">
	<img src="{{src}}" alt="{{alt}}">
</div>
</template>

<script>

export default {
  props:['src','alt'],
  data () {
    return {
		
    };
  }
};

</script>

<style lang="sass">

@import '../variables';

#image-responsive {
	img{
		@include responsiveWidth(600px);
	}
}


</style>