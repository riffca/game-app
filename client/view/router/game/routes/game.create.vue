<template>
<div id="game-create">
<form-wrapper>		
	<form @submit.prevent="createGame()">
		<div class="input-control">
			<label for="gamename">Game name:</label>
			<input type="text" 
             id="gamename"  
             v-model="gamename"
             placeholder="Enter game name"
             autocomplete="off"
             required>
		</div>
		<div class="input-control">
			<label for="username">Your nickname:</label>
			<input type="text" 
             id="username" 
             v-model="username" 
             placeholder="Enter user name"
             autocomplete="off" 
             required>
		</div>
		<button type="submit">Go</button>
	</form>
</form-wrapper>

</div>
</template>
<script>
/**
/*
/*C R E A T E  G A M E
/*
*/
import socketService from 'service/socket';
import formWrapper from 'parts/form-wrapper';
export default {
  components: {formWrapper},
  data () {
    return {
    	gamename: '',
    	username: ''
    };
  },
  methods: {
  	createGame(){
      //check if room exists
      this.$http.post('/api/game/create',{
        room:{
          name:this.gamename
        }
      }).then(res=>{
        if(!res.data.success){
          alert(res.data.message);
          return;
        } 
        //if not exists 
        socketService.emit('create room',{
          room:{
            name: this.gamename,
            creator: this.$root.playerSocketId
          }
        })
      });
  	}
  },
  created(){
    //listen socket events
    socketService.on('room created',data=>{
        this.$route.router.go({
          name: 'gamePlay',
          query:{
            state: 'creator',
            gamename: this.gamename,
            username: this.username
          }
        }); 
    })    
  }
};
</script>

<style lang="sass">
#game-create {

}
</style>