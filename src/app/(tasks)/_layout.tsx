import { Stack } from 'expo-router'

export default function TasksLayout() {
	return (
		<Stack>
			<Stack.Screen name={'approved-request'} options={{ headerShown: false }} />
			<Stack.Screen name={'checkin-history'} options={{ headerShown: false }} />
			<Stack.Screen name={'your-request'} options={{ headerShown: false }} />
			<Stack.Screen name={'create-request'} options={{ headerShown: false }} />
			<Stack.Screen name={'request-detail'} options={{ headerShown: false }} />
		</Stack>
	)
}
