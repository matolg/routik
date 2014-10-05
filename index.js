function hash1Handler() {
	alert('hash1');
};

function hash2Handler() {
	alert('hash2');
};

function hash3Handler() {
	alert('hash3');
};

var route = new Routik()
			.addRoute("name1", "hash1", hash1Handler)
			.addRoute("name2", "hash2", hash2Handler)
			.addRoute("name3", "hash3", hash3Handler);

route.run();

document.getElementById("hasher").onclick = (function (route) {

	return function() {
		route.goto("name2");
	};
})(route);