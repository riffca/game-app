<template>
<div id="chat">
<ul class="messages">
	<li v-for="message in messages" track-by="$index">
	   <span class="user-nickname" v-bind:class="{'visitor': message.css === 'O'}">
     {{message.username}}:
     </span> 
     {{message.text}}
	</li>
</ul>
<form-wrapper>		
	<form @submit.prevent="writeMessage()">
    <div class="input-control">
      <input type="text" id="message" v-model="message" placeholder="write message">
			<button type="submit">send</button>
		</div>
	</form>
</form-wrapper>
</div>
</template>

<script>
import formWrapper from 'parts/form-wrapper';
import socketService from 'service/socket';
export default {
  components:{formWrapper},
  data () {
    return {
      player:this.$parent.currentPlayer, 
      room: this.$parent.currentPlayer.game,
  		message: '',
  		messages:[]
    };
  },
  methods:{
  	writeMessage(){
  		socketService.emit('write message',{
  			room: this.room,
  			text: this.message,
        username: this.player.name,
        css: this.player.action
  		});
  	}
  },
  created(){
  	socketService.on('get message',data=>{
  		this.messages.push(data);
  		this.message = '';
  	});
  }
};
</script>

<style lang="sass">
@import '../../../variables';
#chat{
  display:relative;
  min-height: 600px;
  overflow: auto;
  .messages{
    .user-nickname {
      display: inline-block;
      color: lighten($brand-bg,40%);
      width:25%;
      font-size: 1.3rem;
      &.visitor{
        color: lighten(darkred,40%);
      }
    }
  }
	#form-wrapper {
    padding: 0;
    transform: scale(.7,.7) translate(-40%,-40%);
		position: absolute;
		bottom: 0;
    right: 0;
    .input-control{
      width: 500px;
      input{
        width: 70%;
        display: inline-block;
      }
      button {
        margin: 0;
      }
    }
	}
}
</style>