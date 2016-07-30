<template>
	<brand-root></brand-root>
  <router-view></router-view>
</template>

<script>

//html
import socketService from 'service/socket';
import BrandRoot from './brand-root';

export default {
  replace: false,
  components:{
    BrandRoot
  },
  data(){
  	return {
  		playerSocketId: ''
  	}
  },
  created(){
  	socketService.on('get user id', data=>{
  		this.playerSocketId = data;
  	})
  }
};
</script>

<style lang="sass">
</style>