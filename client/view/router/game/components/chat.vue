<template>
<div id="chat">
  <form-wrapper v-if="$parent.playerJoined">	
  	<form @submit.prevent="writeMessage()">
      <div class="input-control">
        <input type="text" id="message" v-model="message" placeholder="write message" autocomplete="off">
  			<button type="submit">send</button>
  		</div>
  	</form>
  </form-wrapper>
  <ul class="messages">
    <li v-for="message in messages | orderBy 'id' -1">
       <span class="user-nickname" v-bind:class="{'visitor': message.css === 'O'}">
       {{message.player}}:
       </span> 
       {{message.text}}
    </li>
  </ul>
</div>
</template>

<script>
/**
/*
/*C H A T
/*
*/
import formWrapper from 'parts/form-wrapper';
import socketService from 'service/socket';
export default {
  props:['player'],
  components:{formWrapper},
  data () {
    return {
      room: this.player.game,
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
    //fix order in chat view
    let getId = 0;

  	socketService.on('get message',data=>{
      let message = {
        id: ++getId,
        text: data.text,
        player: data.username
      }
  		this.messages.push(message);
  		this.message = '';
  	});
  }

};
</script>

<style lang="sass">
@import '../../../variables';
#chat{
  position:relative;
    .messages{
      //scrollbar
      &::-webkit-scrollbar-track {
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar{
        width: 10px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: lighten($brand-bg,70%);
      }
      margin:10px;
      border-bottom: .2px solid $application-bg;
      border-top: .2px solid $application-bg;

      position: relative;
      background: lighten(grey,45%);;
      overflow: auto;
      min-height: 300px;
      max-height: 490px;
      .user-nickname {
        background: white;
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
    margin:0;
    padding: 0;
    transform: scale(.7,.7);
    .input-control{
      width: 600px;
      input{
        width: 60%;
        display: inline;
      }
      button {
        margin: 0;
      }
    }
	}
}
</style>