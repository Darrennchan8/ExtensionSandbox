/**
 * Created by darrennchan8 on 4/25/17.
 * This was created, instead of a native
 * integration with the browseaction to work
 * around the extension browseraction hiding
 * each time the file selector opened (nautilus).
 */
(function() {
	"use strict";
	/**
	* These are the internal methods. Essentially,
	* there are 3 routes to take: to pull a .crx from
	* the web store, to upload a .crx, and to load an
	* unpacked .crx file. For the last 2 methods (that
	* involve uploading file(s), the user should be
	* prompted to click a button to trigger the upload
	* (that way, the browser respects the request).
	* The 1st method and 2nd method should both result
	* in unpacking the extension into a directory. The
	* third method is already unpacked, but may require
	* some parsing. After all extensions are unpacked
	* and formatted in an object similar to this:
	* {folders {files}, files}, it is sent to a method
	* which generates a config file for the extension,
	* including permissions, auto-update, etc.
	*/
	let promptUpload = function(resolve, reject) {
	};
	let installFolder = function () {
		new Promise(promptUpload).then(function() {
			let tempElem = document.createElement('input');
			tempElem.setAttribute('type', 'file');
			tempElem.setAttribute('webkitdirectory', '');
			tempElem.setAttribute('directory', '');
			tempElem.setAttribute('style', 'display: none !important');
			document.body.appendChild(tempElem);
			tempElem.addEventListener('change', function (e) {
				console.log(e);
				document.body.removeChild(tempElem);
			}, false);
		});
	};

	switch (location.hash) {
		case '#install_folder':
			installFolder();
			break;
		case '#install_crx':
			installCrx();
			break;
		case '#install_web_store':
			installWebStore();
			break;
	}
})();