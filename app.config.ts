import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: 'Attendance Management', // Change this to your app's name'
		slug: 'attendance-management',
		description: 'Attendance Management',
		version: '1.0.0',
		orientation: 'default',
		icon: './assets/icons/app/icon.png',
		scheme: 'attendance-management',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,

		ios: {
			supportsTablet: true,
			config: {
				usesNonExemptEncryption: false,
			},
		},

		android: {
			adaptiveIcon: {
				foregroundImage: './assets/icons/app/adaptive-icon.png',
			},
		},

		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/icons/app/favicon.png',
		},

		plugins: [
			'expo-router',
			'expo-font',
			'expo-secure-store',
			[
				'expo-splash-screen',
				{
					backgroundColor: '#ffffff',
					image: './assets/icons/app/splash-icon.png',
					dark: {
						backgroundImage: './assets/icons/app/splash-icon.png',
						backgroundColor: '#000000',
					},
					resizeMode: 'contain',
					imageWidth: 200,
				},
			],
		],

		experiments: {
			typedRoutes: true,
		},
	}
}
