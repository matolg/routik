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
			.addRoute("hash1", hash1Handler)
			.addRoute("hash2", hash2Handler)
			.addRoute("hash3", hash3Handler)
			.run();