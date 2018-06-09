module.exports = function(){
	const fs = require('fs');
	const bluebird = require('bluebird');
	const mongoose = require('mongoose');

	mongoose.Promise = bluebird;
	const models_path = __dirname + '/../models';
	mongoose.connect('mongodb://localhost/projectAlpha')
		.then(() => {
			console.log('MongoDB connected successfully.');
			fs.readdirSync(models_path).forEach(function (file) {
				if (file.indexOf('.js') > 0) {
					require(models_path + '/' + file)();
				}
			})
		})
		.catch(err => {
			console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
			// process.exit();
		});
}