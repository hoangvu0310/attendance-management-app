import { getAccessToken } from '@src/core/infrastructure/storage/secure-storage'
import { errorLogger, requestLogger, responseLogger } from 'axios-logger'
import { Platform } from 'react-native'
import axios, { InternalAxiosRequestConfig } from 'axios'

const apiClient = axios.create({
	baseURL:
		Platform.OS === 'android'
			? process.env.EXPO_PUBLIC_API_URL_ANDROID || 'http://10.0.2.2:8080/'
			: process.env.EXPO_PUBLIC_API_URL_IOS,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const loggerConfig = {
	dateFormat: 'HH:MM:ss',
	status: true,
	headers: true,
	data: true,
	prefixText: 'API',
	method: true,
	url: true,
}

apiClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		requestLogger(config, loggerConfig)

		const accessToken = await getAccessToken()
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		errorLogger(error)
		return Promise.reject(error)
	},
)

apiClient.interceptors.response.use(
	(response) => {
		responseLogger(response, loggerConfig)
		return response
	},
	(error) => {
		errorLogger(error)
		return Promise.reject(error)
	},
)

export default apiClient
