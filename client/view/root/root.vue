<template>
	<brand-root></brand-root>
  <router-view></router-view>
</template>

<script>
import socketService from 'service/socket';
//html
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
    if(this.$route.query.gamename){
      this.$route.router.go({name: 'index'});
    } 
  }
};
</script>

<style lang="sass">
</style>