<template>
	  <brand-root></brand-root>
    <router-view></router-view>
</template>

<script>

//html
import BrandRoot from './brand-root';

export default {
  replace: false,
  components:{
    BrandRoot
  }
};
</script>

<style lang="sass">
</style>