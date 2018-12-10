'use strict';

var async = require('async');
var run = require('./run');

module.exports = function (scripts, callback) {
	return async.series(scripts.map(function (script) {
		return function (next) {
			run(script, function (error, stdout, stderr) {
				next();
				callback(error, stdout, stderr);
			});
		};
	}));
};
