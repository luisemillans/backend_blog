const mongoose =  require('mongoose');


const clearDataBase = () => {
	return new Promise(resolve => {

		var count = 0;
		var max =  Object.keys(mongoose.connection.collections).length;

		for(var i in mongoose.connection.collections){
			mongoose.connection.collections[i].remove(function(){
				count++;
				if(count === max){
					resolve();
				}
			})
		}
	});
}

module.exports = async function setUpTest(){
	await clearDataBase();
}
