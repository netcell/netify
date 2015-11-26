module.exports = {
	en : {
		OPENNING : function (host, notification) {
			return 'Ping to ' + host + ' ' + (notification ? 'with notification' : 'silently.');
		},
		MANUAL                     : 'Use -silent or -s option to stop notification.',
		PING_STATE_ERROR_MSG       : 'Connection Failed!',
		PING_STATE_WEAK_SIGNAL_MSG : 'Poor connection.',
		PING_STATE_SUCCESS_MSG     : 'Connection restored.'
	},
	vi : {
		OPENNING : function (host, notification) {
			return 'Ping tới ' + host + ' ' + (notification ? 'có thông báo.' : 'lặng câm.');
		},
		MANUAL                     : 'Dùng option -silent hoặc -s để ẩn thông báo.',
		PING_STATE_ERROR_MSG       : 'Mất mạng rồi!',
		PING_STATE_WEAK_SIGNAL_MSG : 'Mạng lởm nhá.',
		PING_STATE_SUCCESS_MSG     : 'Mạng về làng.'
	}
}