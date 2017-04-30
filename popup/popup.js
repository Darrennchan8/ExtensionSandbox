/**
 * Created by darrennchan8 on 4/24/17.
 * This is the core logic that powers
 * the popup.
 */
window.addEventListener('load', function() {
	"use strict";
	['install_web_store', 'install_crx', 'install_folder'].forEach(function(i) {
		document.querySelector('a#' + i).addEventListener('click', function(method, e) {
			if (e.which === 1) {
				window.open(method);
			}
		}.bind(this, chrome.extension.getURL('settings/settings.html#' + i)));
	});
});