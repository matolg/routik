(function (name, context, definition) {

	if (typeof module != 'undefined' && module.exports) 
		module.exports = definition()
	else if (typeof define == 'function' && define.amd) 
		define(definition)
	else 
		context[name] = definition()

})('Routik', this, function() {

	"use strict";

	var _routes = _routes || {},
		_timeout = 100,
		_win = window;

	function _hashChanged(hash)	{

		var routeObj, context;

		hash = hash.substring(1);
		route = _routes[hash];
		context = {
			hash: hash,
			params: {}
		};

		if (route && route.handler) {
			route.handler(context);
		}
	}

	// Constructor
	function Routik(options) {
	}

	Routik.prototype = {

		/**
		 * Add new routing for handling
		 * @param {string} hash the part of uri after # symbol
		 * @param {Function} handler callback function, executes on route changed
		 * @return {Routik}
		 */
		addRoute: function(name, hash, handler) {

			_routes[hash] = {
				name: name,
				handler: handler
			};

			return this;
		},

		/**
		 * Change current location by route name
		 * @param {string} name route name
		 * @param {string} params route parameters
		 */
		goto: function(name, params) {

			for (var route in _routes) {
				if (_routes.hasOwnProperty(route)) {
					if (route && _routes[route].name == name) {
						_win.location.hash = route;
					}
				}
			}			
		},

		/**
		 * Start routes change listening
		 * @param {string} name init route name
		 */
		run: function(name) {

			var storedHash;

			if ("onhashchange" in _win) {
			    _win.onhashchange = function () {
			        _hashChanged(_win.location.hash);
			    }
			} else { // event not supported
			    storedHash = _win.location.hash;
			    _win.setInterval(function () {
			        if (_win.location.hash != storedHash) {
			            storedHash = _win.location.hash;
			            _hashChanged(storedHash);
			        }
			    }, _timeout);
			}

			if (name) this.goto(name);

			return this;
		}
	};

	return Routik;
});