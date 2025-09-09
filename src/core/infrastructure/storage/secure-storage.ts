import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export async function saveAccessToken(value: string) {
	await setItemAsync(ACCESS_TOKEN, value)
}

export async function getAccessToken() {
	return await getItemAsync(ACCESS_TOKEN)
}

export async function saveRefreshToken(value: string) {
	await setItemAsync(REFRESH_TOKEN, value)
}

export async function getRefreshToken() {
	return await getItemAsync(REFRESH_TOKEN)
}

export async function deleteAllCredentials() {
	await Promise.all([deleteItemAsync(ACCESS_TOKEN), deleteItemAsync(REFRESH_TOKEN)])
}
