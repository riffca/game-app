<template>
	<div id="timestamps">
		<span>{{timestamps.createdAt }}</span>
		<br>
		<span>{{timestamps.updatedAt }}</span>		
	</div>
</template>

<script>
export default {
  props: ['timestamps'],
 
};
</script>

<style lang="sass">
</style>	