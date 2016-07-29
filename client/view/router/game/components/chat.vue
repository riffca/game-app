<template>
<div id="chat">
<ul class="messages">
	<li v-for="message in messages" track-by="$index">
	   {{writerUsername}} {{message}}
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
  props:['room'],
  components:{formWrapper},
  data () {
    return {
      writerUsername: '',
  		message: '',
  		messages:[]
    };
  },
  methods:{
  	writeMessage(){
  		socketService.emit('write message',{
  			room: this.room,
  			message: this.message,
        username: this.$route.query.username
  		});
  	}
  },
  created(){
  	socketService.on('get message',data=>{
      this.writerUsername = data.username
  		this.messages.push(data.msg);
  		this.message = '';
  	});
  }
};
</script>

<style lang="sass">
#chat{
	#form-wrapper {
		position: absolute;
		bottom: 0;
	}
}
</style>