(function() {
	'use strict';
	Object.defineProperty(window, 'utils', {
		configurable: false,
		value: {
			hijack: function(parentObject, key, func) {
				if (arguments.length === 2) {
					func = key;
					key = parentObject;
					parentObject = null;
				}
				parentObject = parentObject || window;
				if (arguments.length < 2 || arguments.length > 3 || typeof parentObject !== 'object' || typeof key !== 'string' || typeof func !== 'function') {
					throw new Error('Invalid arguments. Expected: [optional Object object, String key, Function func]');
				}
				let hijackCall = function() {
					let args = Array.prototype.slice.call(arguments);
					args.unshift(parentObject[key]);
					return func.apply(this, args);
				};
				try {
					Object.defineProperty(parentObject, key, {
						value: hijackCall,
						writable: false,
						configurable: false
					});
				} catch (expected) {}
				try {
					parentObject[key] = hijackCall;
				} catch (expected) {}
				if (parentObject[key] !== hijackCall) {
					throw new Error('Unable to hijack ' + key + '.');
				}
			},
			hijackAll: function(parentObject, key, func) {
				if (arguments.length === 2) {
					func = key;
					key = parentObject;
					parentObject = null;
				}
				parentObject = parentObject || window;
				if (arguments.length < 2 || arguments.length > 3 || typeof parentObject !== 'object' || typeof key !== 'string' || typeof func !== 'function') {
					throw new Error('Invalid arguments. Expected: [optional Object object, String key, Function func]');
				}
				let originalObj = parentObject[key];
				let proxy = new Proxy({}, {
					set: function(obj, prop, value) {
					},
					get: function(_key) {
						let args = Array.prototype.slice.call(arguments);
						args[0] = originalObj;
						args.pop();
						return func.apply(this, args);
					}
				});
				try {
					Object.defineProperty(parentObject, key, {
						value: proxy,
						writable: false,
						configurable: false
					});
				} catch (expected) {}
				try {
					parentObject[key] = proxy;
				} catch (expected) {}
				if (parentObject[key] !== proxy) {
					throw new Error('Unable to hijack ' + key + '.');
				}
			}
		}
	});
})();