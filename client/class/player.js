export default class {
	constructor({
		name,
		action,
		game,
	}){
		this.name = name;
		this.action = action;
		this.game = game;
		this.wins = 0;
	}
	win(){
		this.wins += 1;
	}
}