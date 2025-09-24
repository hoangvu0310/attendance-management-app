import { Tabs } from 'expo-router'
import AppTabBar from '@src/presentation/components/tabbar/AppTabBar'

export default function MainLayout() {
	return (
		<Tabs
			tabBar={(props) => <AppTabBar {...props} />}
			screenOptions={{ tabBarHideOnKeyboard: true }}
		>
			<Tabs.Screen name={'home'} options={{ headerShown: false, tabBarLabel: 'Trang chủ' }} />
			<Tabs.Screen name={'task'} options={{ headerShown: false, tabBarLabel: 'Tác vụ' }} />
			<Tabs.Screen
				name={'notification'}
				options={{ headerShown: false, tabBarLabel: 'Thông báo' }}
			/>
			<Tabs.Screen name={'account'} options={{ headerShown: false, tabBarLabel: 'Tài khoản' }} />
		</Tabs>
	)
}
