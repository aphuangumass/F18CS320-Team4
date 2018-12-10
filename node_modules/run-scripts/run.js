'use strict';

var exec = require('child_process').exec;

module.exports = function (command, callback) {
	return exec(command, callback);
};
