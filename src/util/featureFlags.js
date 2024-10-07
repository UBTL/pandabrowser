
module.exports = {
	get flags() {
		// @ts-ignore
		return JSON.parse(localStorage.getItem('featureFlags')) || {};
	},

	set flags(values) {
		localStorage.setItem('featureFlags', JSON.stringify(values));
	},

	/**
	 * @param {string} flag
	 */
	isEnabled(flag) {
		return this.flags[flag] === true;
	},

	/**
	 * @param {string} flag
	 * @param {boolean} value
	 */
	setFlag(flag, value) {
		this.flags[flag] = value;
		localStorage.setItem('featureFlags', JSON.stringify(this.flags));
	},

	/**
	 * @param {object} defaults
	 */
	initialize(defaults) {
		// TODO: expose flags through config menu in UI?
		// if (!localStorage.getItem('featureFlags')) {
		localStorage.setItem('featureFlags', JSON.stringify(defaults));
		// }
	}
};