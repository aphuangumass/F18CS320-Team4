/* global describe, it */
'use strict';

var assert = require('assert');
var runScripts = require('../');
var asyncRun = require('../async-run');

describe('run-scripts node module', function () {
	it('must produce full command', function () {
		assert.deepEqual(
			runScripts(['one', 'two', 'three']),
			[
				'npm run one',
				'npm run two',
				'npm run three'
			]
		);
	});
});

describe('aynsc-run node module', function () {
	it('must callback with error being null on success', function () {
		asyncRun(['echo "Success"'], function (error) {
			assert.equal(error, null);
		});
	});

	it('must callback with error failure', function () {
		asyncRun(['echo "Failure" && exit 1'], function (error) {
			assert.equal(error.code, 1);
		});
	});
});
