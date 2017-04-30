(function() {
    "use strict";
    utils.hijackAll(chrome, 'tabs', function(parentObj, key) {
    	switch (key) {
		    case 'get': return function(tabId, callback) {
		    	parentObj.query({
				    active: true
			    }, function(tab) {
		    		callback(tab[0]);
			    });
		    };
	    }
    });
	chrome.tabs.get(0, function(tab) {
		console.log(tab);
	});
})();