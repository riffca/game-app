<template>
<div id="game-play">

  <!--Game-->
	<div class="game-section">
		<div class="game-info" v-if="playerJoined">
      <span class="player-left">
        {{creator.name}}
        <div class="player-wins">
        {{creator.wins }}
        </div>
      </span>
      Game: {{$route.query.gamename}} 
      <span class="player-right">
        {{visitor.name}}
        <div class="player-wins" v-show="visitor">
          {{ visitor.wins}}
        </div>
      </span>
    </div>
		<div class="main-message" v-if="!playerJoined">Waiting for second player</div>	
		<tic-tac-toe-game v-if="playerJoined" :player="player"></tic-tac-toe-game>
	</div>

  <!--Chat-->
	<div class="chat-section">
		<h2>Chat</h2>
		<chat :player="player"></chat>
	</div>

</div>
</template>
<script>
/**
/*
/*G E T  A L L  U S E R S  T O  G A M E
/*
*/
//socket io
import socketService from 'service/socket';
//html
import chat from '../components/chat';
import ticTacToeGame from '../components/tic-tac-toe-game';
//class
import Player from 'class/player';
//Component
export default {
  components: {ticTacToeGame,chat},
  data(){
  	return {
  		playerJoined: false,
      //current player
      player: {},
      //current player
      creator: {},
      visitor: {}
  	}
  },
  created(){
    /**
    /*
    /*Choose roles for game palyers
    /*
    */
    //get game state and data from url query
  	let query = this.$route.query;
    //
    //if game creator
    //
  	if(query.state === 'creator'){

      //create new creator
  		this.creator = new Player({
        game: query.gamename,
  			name: query.username,
  			action: 'X'
  		});

      //choose current player for UI
      this.player = this.creator;

      //then waiting

      //get visitor
      socketService.on('join game',data=>{
        this.playerJoined = true;
        //create new visitor
        this.visitor = new Player({
          game: data.room,
          name: data.username,
          action: 'O'
        });
        //send creator to  visitor ui
        socketService.emit('get creator',{
          room: this.creator.game,
          username: this.creator.name
        })
      });

    //
    //if game visitor
    // 
  	} else if(query.state === 'visitor'){

      this.playerJoined = true;
      //create new visitor
  		this.visitor = new Player({
        game: query.gamename,
  			name: query.username,
  			action: 'O'
  		});
      //make current ui player
      this.player = this.visitor;

      //tell creator about joining
      socketService.emit('join game',{
        username: this.player.name,
        room: this.player.game
      })

      //get second player
      socketService.on('get creator',data=>{
      //create new creator
        this.creator = new Player({
          game: data.room,
          name: data.username,
          action:'X'
        })
      });
    //
    //else
    //
  	} else {
      //pretent to break ui
      window.location = '/';
    }
    /**
    /*
    /*Listen to wins
    /*
    */
    socketService.on('player win',(data)=>{
      if(data.action === this.creator.action){
         this.creator.win();
      } 
      if(data.action === this.visitor.action){
         this.visitor.win();
      } 
    })
  }
};
</script>

<style lang="sass">
@import '../../../variables'; 
#game-play {
  user-select: none;
	@media screen and(min-width: 1400px){
		margin-top: -3%;
	}
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	height: 100%;
	.chat-section,
	.game-section{
		background: white;
		border: .5px solid grey;
		margin: 10px;
		h2 {
			font-weight: normal;
		}
	}
	.chat-section {
		display: relative;
		min-width: 350px;
		flex: 3;
	}
	.game-section {
    @media screen and(max-width: 499px){
      min-width: 400px;
      max-height: 400px;
    }
    min-width: 500px;
    height: 100%;
		flex:6;
    .main-message {
      @include change-animation(0%,-20%);
      @include center-page-container(100%);
      font-size: 2rem;
      text-align: center;
    }
    .game-info{
      position: relative;
      cursor: default;
      font-size: 2rem;
      text-align: center;
      .player-right {
        max-width: 100px;
        float: right;
        color: lighten(darkred,10%); 
        margin: 20px;
      }
      .player-left {
        max-width: 100px;
        float:left;
        color: lighten($brand-bg,30%); 
        margin: 20px;
      }
      .player-wins {
        font-size: 4rem;
        padding-top: 200px;
      }
    }
	}
}
</style>