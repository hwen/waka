(function(angular) {
	'use strict';

	angular.module('waka')

	.factory('iAES', function() {
		return {
			encrypt: function(key) {
				return CryptoJS.AES.encrypt(key, "iwaka");
			},
			decrypt: function(encrypted) {
				return CryptoJS.AES.decrypt(encrypted, "iwaka").toString(CryptoJS.enc.Utf8);
			}
		};
	})

	.factory('iCookie', function() {
		return {
			setUserCookie: function(_id, username, password) {
				document.cookie = "uid=" + _id + ";max-age=" + 60 * 60 * 24 * 10;
				document.cookie = "username=" + username +
					";max-age=" + 60 * 60 * 24 * 10;
				document.cookie = "password=" + password +
					";max-age=" + 60 * 60 * 24 * 10;
			},

			setCookie: function(key, value, maxAge) {
				document.cookie = key+"="+value+";max-age="+
					maxAge;
			},

			getCookie: function(key) {
				var str = document.cookie;
				if (str) {
					str = str.substr(str.indexOf(key));
					var end = str.indexOf(';') > -1 ? str.indexOf(';') : str.length;
					var value = str.substring(str.indexOf("=") + 1, end);
					return value;
				} else {
					return null;
				}
			},

			cancelCookie: function() {
				var cookies = document.cookie.split(";");
				cookies.forEach(function(item) {
					document.cookie = item + ";max-age=0";
				});
			},

			updatePasswordCookie: function(password) {
				password = password;
				document.cookie = "password=" + password +
					";max-age=" + 60 * 60 * 24 * 10;
			}

		};
	})

})(angular);