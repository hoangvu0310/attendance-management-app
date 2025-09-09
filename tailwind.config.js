/** @type {{}} */

const colors = require('./src/core/shared/constants/colors')

module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				'opensans-regular': ['OpenSans-Regular'],
				'opensans-medium': ['OpenSans-Medium'],
				'opensans-semibold': ['OpenSans-SemiBold'],
				'opensans-bold': ['OpenSans-Bold'],
				'opensans-italic': ['OpenSans-Italic'],
				'opensans-medium-italic': ['OpenSans-MediumItalic'],
				'opensans-semibold-italic': ['OpenSans-SemiBoldItalic'],
				'opensans-bold-italic': ['OpenSans-BoldItalic'],
			},
		},
		colors: { ...colors },
	},
	plugins: [],
}
