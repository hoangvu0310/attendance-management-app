import { Stack } from 'expo-router'

export default function TasksLayout() {
	return (
		<Stack>
			<Stack.Screen name={'approved-request'} options={{ headerShown: false }} />
		</Stack>
	)
}
