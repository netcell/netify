#!/usr/bin/env node

'use strict';
var argv     = require('yargs').argv;
var notifier = require('node-notifier');
var path     = require('path');
var sys      = require('util');
var cp       = require('child_process');
var os       = require('os');
var language = require('./language');

var translation;
for (var lang in language) {
	if ( argv[lang] ) {
		translation = language[lang];
		break;
	}
}
if (!translation) translation = language[argv.lang || 'en'];

var notification = !(argv.silent || argv.s);
var lowestWeakSignalMs = argv.threshold || argv.t || 1000;
var host = argv.host || argv.h || 'google.com';

console.log(translation.OPENNING(host, notification));
notification && console.log(translation.MANUAL);

var ls;

var platform = os.platform();
if (platform.match(/^win/)) {
	var args = [host, '-t'];
    ls = cp.spawn('C:/windows/system32/ping.exe', args);
} else if (platform === 'darwin') {
	var args = [host];
    ls = cp.spawn('/sbin/ping', args);
}

var fullString = '';

var PING_STATE_ERROR       = 0;
var PING_STATE_WEAK_SIGNAL = 1;
var PING_STATE_SUCCESS     = 2;
var currentPingState       = PING_STATE_ERROR;

ls.stdout.on('data', function (data) {
	var string = String(data);
	process.stdout.write(string);

	switch (currentPingState) {
		case PING_STATE_ERROR:
			checkPingSuccess(string);
			break;
		case PING_STATE_WEAK_SIGNAL:
		case PING_STATE_SUCCESS:
			var checkError = checkPingError(string);
			if (!checkError) checkPingSuccess(string);
			break;
	}
});

function checkPingSuccess(string) {
	var pingSuccess = true;
	var stringLower = string.toLowerCase();
	for (var i in successMessagesLower) {
		if (stringLower.indexOf(successMessagesLower[i]) == -1) {
			pingSuccess = false;
			break;
		}
	}
	if (pingSuccess) {
		var index1 = stringLower.indexOf('time=');
		var index2 = stringLower.indexOf('ms', index1);
		var pingTimeout = stringLower.substr(index1 + 5, index2 - index1 - 5) * 1;

		if(pingTimeout < lowestWeakSignalMs) setCurrentPingState(PING_STATE_SUCCESS, string);
		else setCurrentPingState(PING_STATE_WEAK_SIGNAL, string);
	}
}

function checkPingError(string) {
	var haveError = false;
	var stringLower = string.toLowerCase();
	for (var i in errorMessagesLower) {
		if (stringLower.indexOf(errorMessagesLower[i]) != -1) {
			haveError = true;
			break;
		}
	}
	if (haveError) {
		setCurrentPingState(PING_STATE_ERROR, string);
	}
	return haveError;
}

function setCurrentPingState (pingState, string) {
	if (currentPingState == pingState) return;
	currentPingState = pingState;
	switch(pingState){
		case PING_STATE_ERROR:
			createNotification(translation.PING_STATE_ERROR_MSG, string, 'assets/error.png');
			break;
		case PING_STATE_WEAK_SIGNAL:
			createNotification(translation.PING_STATE_WEAK_SIGNAL_MSG, string, 'assets/warn.png');
			break;
		case PING_STATE_SUCCESS:
			createNotification(translation.PING_STATE_SUCCESS_MSG, string, 'assets/success.png');
			break;
	}
}

function createNotification(title, message, icon){
	if (notification) {
		var notify = notifier.notify({
			title   : title,
			message : message,
			icon    : path.join(__dirname, icon),
			sound   : true,
			wait    : false
		}, function (err, response) {

		});
		// console.log(notify);
	}
}

var errorMessages = [
	'Request timeout for',
	'Request timed out',
	'Bad IP address',
	'Destination host unreachable',
	'Destination net unreachable',
	'Destination specified is invalid',
	'TTL expired during reassembly',
	'TTL expired in transit',
	'Hardware error',
	'No resources',
	'Transmit failed',
	'General failure'
];
var successMessages = [
	(platform === 'darwin' ? 'icmp_seq=' : 'bytes='),
	'time=',
	'TTL='
]
var errorMessagesLower = [], successMessagesLower = [];
for(var i in errorMessages) errorMessagesLower.push(errorMessages[i].toLowerCase());
for(var i in successMessages) successMessagesLower.push(successMessages[i].toLowerCase());
