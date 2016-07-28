import tokenService from './token';

export default {
	checkAuth(){
		let token = tokenService.getToken();
		if(!token){
			return false;
		} 
		return true;
	},
	logOut(){
		tokenService.deleteToken();
	}
};