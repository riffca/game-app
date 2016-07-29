<template>
<div id="tic-tac-toe-game">
	<div class="playground-row"v-for="row in playground">
		<div class="playground-item"
					@click="makeAction($index,$parent.$index)" 
					v-for="square in row">
			{{ square.content }}
		</div>
	</div>
</div>
</template>

<script>

import socketService from 'service/socket';

export default {
  props:['room'],
  components:{},
  data () {
    return {
    	action: this.$route.query.action,
    	playground: [
	      [
	        {id: 0, content: ''},
	        {id: 1, content: ''}, 
	        {id: 2, content: ''}
	      ],
	      [
	        {id: 3, content: ''},
	        {id: 4, content: ''}, 
	        {id: 5, content: ''}
	      ],
	      [
	        {id: 6, content: ''},
	        {id: 7, content: ''}, 
	        {id: 8, content: ''}
	      ]
       ]
  	}
  },
  methods:{
  	makeAction(index,parentIndex){
  		let square = this.playground[parentIndex][index];
  		square.content = this.action;
  		socketService.emit('game action',{
  			room: this.room,
  			action: this.action,
  			index: index,
  			parentIndex: parentIndex
  		});
  	}
  },
  created(){
  	socketService.on('action done',data=>{
  		let square = this.playground[data.parentIndex][data.index];
  		square.content = data.action;
  	});
  }
};
</script>

<style lang="sass">

#tic-tac-toe-game{
	cursor: pointer;
	user-select: none;
	margin: 0 auto;
	display: table;
	.playground-row {
		display: table-row;
		.playground-item{
			font-size: 3rem;
			display:table-cell;
			text-align: center;
			vertical-align: middle;
			height: 200px;
			width: 200px;
			box-shadow: 1px 1px 1px grey;
			@media screen and (max-height: 842px){
				height: 150px;
				width: 150px;
			}

			@media screen and (max-height: 676px){
				height: 100px;
				width: 100px;
			}
			&:hover {

			}
		}
	}
}

</style>