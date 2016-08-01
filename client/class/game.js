export default class Game {
	constructor({
		creator,
		visitor,
		name
	}){
		this.name = name;
		this.creator = creator;
		this.visitor = visitor;
	}
}