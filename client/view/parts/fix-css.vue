обератка для html блоков для быстрого редактирования

<template>
<div id="fix-css">

<slot>
	

</slot>

</div>
</template>
<script>
export default {
  props: ['background'],
  data () {
    return {
		background:[
			{id: 1, }

		]
    };
  },
};
</script>

<style lang="sass">
#name {

}
</style>