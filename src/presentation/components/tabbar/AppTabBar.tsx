import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'
import TabBarButton from '@src/presentation/components/tabbar/TabBarButton'

export default function AppTabBar({ state, navigation, descriptors, insets }: BottomTabBarProps) {
	const tabIcons: Record<string, any> = {
		home: {
			notActive: ICONS.Home,
			active: ICONS.HomeFill,
		},
		task: {
			notActive: ICONS.Task,
			active: ICONS.TaskFill,
		},
		notification: {
			notActive: ICONS.Notification,
			active: ICONS.NotificationFill,
		},
		account: {
			notActive: ICONS.User,
			active: ICONS.UserFill,
		},
	}

	return (
		<View
			className={'w-full flex-row items-center bg-white p-[10px] pb-[15px]'}
			style={{
				position: 'absolute',
				bottom: insets.bottom,
				shadowColor: COLORS.gray['200'],
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const isActive = state.index === index
				const label = options.tabBarLabel as string
				const iconSource = isActive ? tabIcons[route.name].active : tabIcons[route.name].notActive

				const onPressTab = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isActive && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				return (
					<View key={route.name} className={'flex-1 items-center justify-center'}>
						<TabBarButton
							iconSource={iconSource}
							isActive={isActive}
							label={label}
							onPressTab={onPressTab}
							isNotification={route.name === 'notification'}
						/>
					</View>
				)
			})}
		</View>
	)
}
