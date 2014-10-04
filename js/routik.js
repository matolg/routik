(function (name, context, definition) {

	if (typeof module != 'undefined' && module.exports) 
		module.exports = definition()
	else if (typeof define == 'function' && define.amd) 
		define(definition)
	else 
		context[name] = definition()

})('Routik', this, function() {

	"use strict";

	var routes = routes || {};

	function _hashChanged(hash)	{
		var handler = routes[hash];
		var context = {
			hash: hash,
			params: {}
		};

		if (handler) {
			handler(context);
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
		addRoute: function(hash, handler) {
			hash = '#' + hash;
			routes[hash] = handler;
			return this;
		},

		/**
		 * Start routes listening
		 * @param {string} route init route
		 */
		run: function(route) {
			if ("onhashchange" in window) { // event supported?
			    window.onhashchange = function () {
			        _hashChanged(window.location.hash);
			    }
			}
			else { // event not supported:
			    var storedHash = window.location.hash;
			    window.setInterval(function () {
			        if (window.location.hash != storedHash) {
			            storedHash = window.location.hash;
			            _hashChanged(storedHash);
			        }
			    }, 100);
			}
		}
	};

	return Routik;
});