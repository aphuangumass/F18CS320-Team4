'use strict';

module.exports = function (scripts) {
	if (typeof scripts === 'undefined') {
		return;
	}

	return scripts.map(function (script) {
		return 'npm run ' + script;
	});
};
