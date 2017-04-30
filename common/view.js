/**
 * Created by darrennchan8 on 4/24/17.
 * This defines all custom elements and the view object
 * (which contains methods to simply common actions)
 */
window.addEventListener('load', function() {
	"use strict";
	let triesLeft = 10;
	let loadTemplate = new Promise(function(resolve, reject) {
		let link = document.createElement('link');
		link.setAttribute('rel', 'import');
		link.setAttribute('href', '/common/view.html');
		document.head.appendChild(link);
		link.onload = function() {
			resolve(link.import);
		};
		link.onerror = function(e) {
			console.warn('Unable to load template.');
			reject(e);
		};
	});
	let init = function(mesg) {
		if (mesg) {
			console.error(mesg);
		}
		loadTemplate.then(function(template) {
			class ToggleButton extends HTMLElement {
				constructor(enabled = false) {
					super();
					this.enabled = enabled;
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#buttonToggle').content, true));
					let context = this;
					this.shadowRoot.querySelector('div#slider').addEventListener('click', function(e) {
						if (e.which === 1) {
							context.toggle();
						}
					});
				}
				toggle(status = !this.enabled) {
					this.enabled = !!status;
					let slider = this.shadowRoot.querySelector('div#slider');
					if (this.enabled) {
						slider.classList.remove('inactive');
						slider.classList.add('active');
					} else {
						slider.classList.remove('active');
						slider.classList.add('inactive');
					}
				}
			}
			class SectionDrawer extends HTMLElement {
				constructor(activeIndex = 0) {
					super();
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#sectionDrawer').content, true));
					this.containers = [];
					this.labels = [];
					this.shadowRoot.querySelector('slot#sections').assignedNodes()
						.forEach(i => i instanceof HTMLElement ? this.containers.push(i) : null);
					let labelBar = this.shadowRoot.querySelector('div.labels');
					for (let i = 0; i !== this.containers.length; i++) {
						let elem = document.createElement('p');
						elem.innerText = this.containers[i].getAttribute('label');
						elem.addEventListener('click', function(index, e) {
							if (e.which === 1) {
								this.switchTo(index);
							}
						}.bind(this, i));
						labelBar.appendChild(elem);
						this.labels.push(elem);
					}
					this.switchTo(activeIndex);
				}
				switchTo(index) {
					if (typeof this.activeIndex !== 'undefined') {
						this.labels[this.activeIndex].removeAttribute('active');
						this.containers[this.activeIndex].removeAttribute('active');
					}
					this.activeIndex = index;
					this.labels[this.activeIndex].setAttribute('active', '');
					this.containers[this.activeIndex].setAttribute('active', '');
				}
			}
			class Section extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#section').content, true));
				}
			}
			class ExpandingList extends HTMLElement {
				constructor(expanded = false) {
					super();
					this.expanded = !expanded;
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#expanding-list').content, true));
					this.mainContainer = this.shadowRoot.querySelector('div#obj');
					this.mainContainer.querySelector('div#obj > div#expanded_list').addEventListener('click', function(e) {
						e.stopPropagation();
					});
					this.mainContainer.addEventListener('click', function(e) {
						if (e.which === 1) {
							this.toggleExpanded();
						}
					}.bind(this));
					this.toggleExpanded();
				}
				toggleExpanded() {
					this.expanded = !this.expanded;
					if (this.expanded) {
						this.mainContainer.setAttribute('expanded', '');
					} else {
						this.mainContainer.removeAttribute('expanded');
					}
				}
			}
			class SettingsPanel extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#settings-panel').content, true));
				}
			}
			class MaterialSection extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({
						mode: 'open'
					});
					this.shadowRoot.appendChild(document.importNode(
						template.querySelector('template#material-section').content, true));
					let subsection = this.shadowRoot.querySelector('div.subsection');
					subsection.addEventListener('click', function(e) {
						if (e.which == 1) {
							if (subsection.hasAttribute('expanded')) {
								subsection.removeAttribute('expanded');
							} else {
								subsection.setAttribute('expanded', '');
							}
						}
					}.bind(this));
				}
			}
			window.customElements.define('toggle-button', ToggleButton);
			window.customElements.define('section-drawer', SectionDrawer);
			window.customElements.define('drawer-section', Section);
			window.customElements.define('expanding-list', ExpandingList);
			window.customElements.define('settings-panel', SettingsPanel);
			window.customElements.define('material-section', MaterialSection);
		}).catch(function(e) {
			if (--triesLeft > 0) {
				init(e);
			}
		});
	};
	init();
});