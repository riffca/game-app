module.exports = {

	message(res,err){
		console.log({
			error: err
		});
		res.json({
			error: err
		});
	}
};