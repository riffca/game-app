let storage = window.localStorage;

export default {
	setToken(token){
		storage.setItem('token',token);
	},
	getToken(){
		return storage.getItem('token');
	},
	deleteToken(){
		storage.removeItem('token');
	}
};