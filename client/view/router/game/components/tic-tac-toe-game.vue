<template>
<div id="tic-tac-toe-game">
	<h3 class="message" v-if="message">{{ message }}</h3>
	<div class="playground-row" v-for="row in playground">
		<div class="playground-item"
					@click="makeAction($index,$parent.$index)" 
					v-for="square in row">
			{{ square.content }}
		</div>
	</div>
</div>
</template>

<script>
/**
/*
/*T I C  T A C  T O E  G A M E
/*
*/
import socketService from 'service/socket';

export default {
  props: ['player'],
  data () {
    return {
    	message:'',
    	userTurn: false,
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
       ],
       winPoints() {
	     let playground = this.playground;
	     let points = [
	       [playground[0][0], playground[0][1], playground[0][2]],
	       [playground[1][0], playground[1][1], playground[1][2]],
	       [playground[2][0], playground[2][1], playground[2][2]],
	       [playground[0][0], playground[1][0], playground[2][0]],
	       [playground[0][1], playground[1][1], playground[2][1]],
	       [playground[0][2], playground[1][2], playground[2][2]],
	       [playground[0][0], playground[1][1], playground[2][2]],
	       [playground[0][2], playground[1][1], playground[2][0]]
	     ];
	     return points;
   	   }
  	}
  },
  methods:{
  	newGame(){
  		this.playground.forEach(item=>{
  			item.forEach(square=>{
  				square.content = '';
  			})
  		});

  		if(this.player.action !== 'X'){
  			this.userTurn = false;
  		} else {
  			this.userTurn = true;
  		}
  	},
    nobodyWins(){
      let count = 0;
      this.playground.forEach(item=>{
        item.forEach(square=>{
          if(square.content !== ''){
            count++;
          }
        })
      });
      if(count === 9){
        return true;
      }
      return false;
    },
  	checkWinner(action){
  		let victory;
  		this.winPoints().forEach(points=>{
	  		if(checkPlayground(points)){
	  			victory = points;
	  		}	
  		});
  		//if win combination
  		if(victory){
  		 	this.message = action + ' wins';
  		 	alertTime(()=>{
  		 		this.newGame();
  		 		this.message = '';
  		 	});
  		 	socketService.emit('player win',{action: action, room: this.player.game});
  		} 
      if(this.nobodyWins() && !victory){
        this.message = 'Nobody wins';
        alertTime(()=>{
          this.newGame();
          this.message = '';
        })
      }
  	},
  	//check is square empty
  	isEmpty(square){
  		if(square.content === ''){
  			return true;
  		} else {
  			return false;
  		}
  	},
  	//make action
  	makeAction(index,parentIndex){
      if(this.message){
        return;
      }
  		//find square
  		let square = this.playground[parentIndex][index];
  		if(this.userTurn){
  			if(this.isEmpty(square)){
		  		//send to all room users action options
			  	socketService.emit('game action',{
			  		room: this.player.game,
			  		action: this.player.action,
			  		index: index,
			  		parentIndex: parentIndex
			  	});
  			} else {
  				this.message = 'This square is not empty';
  				alertTime(()=>this.message = '');
  			}
  		} else {
  			this.message = 'This is not your turn';
  			alertTime(()=>this.message = '');
  		}
  	}
  },
  created(){
  	//make creator to make first game action
  	if(this.player.action === 'X'){
  		this.userTurn = true;
  	}
  	/**
    /*
    /*Listen to socket actions
    /*
    */
  	socketService.on('action done',data=>{
  		let square = this.playground[data.parentIndex][data.index];
  		square.content = data.action;
  		//check who is winner
  		this.checkWinner(data.action);

  		//enable or disable user to make game action
  		if(data.action === this.player.action){
  			this.userTurn = false;
  		} else {
  			this.userTurn = true;
  		}
  	});

    socketService.on('creator disconnected', ()=>{
        this.message = this.player.name + ' leave game!';

        alertTime(()=>{
          //socketService.emit('leave room');
          this.$route.router.go({name: 'index'});  
        })

    });

    socketService.on('visitor disconnected', ()=>{
        this.message = this.player.name + ' leave game!';

        alertTime(()=>{
          this.$parent.playerJoined = false;
          this.player.wins = 0;
          this.message = '';
          this.newGame();
        })

    });
  }
};

/**
/*help functions
*/
//find victory point
function checkPlayground(arr) {
  let i = arr[0].content;
  return i != "" && i == arr[1].content && i == arr[2].content;
};
function alertTime(func){
	setTimeout(func,3000);
}
</script>

<style lang="sass">
@import '../../../variables';
#tic-tac-toe-game{
	padding-top:50px;
	cursor: pointer;
	user-select: none;
	margin: 0 auto;
	display: table;
	.message {
		text-align: center;
		color: lighten(red,30%);
	}
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
      @media screen and(max-width: 1230px){
        & {
          height: 170px;
          width: 170px;
        }
      }

      @media screen and(max-width: 1120px){
        & {
          height: 120px;
          width: 120px;
        }
      }

      @media screen and (max-height: 842px){
        & { 
          height: 150px;
          width: 150px;
        }
      }

			@media screen and (max-height: 676px), screen and (max-width: 650px){
				& { 
          height: 100px;
          width: 100px;
        }
			}
			&:hover {
        outline: 1px solid lighten($brand-bg,35%);
			}
		}
	}
}

</style>