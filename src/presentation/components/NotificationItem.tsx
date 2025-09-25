import { Text, TouchableOpacity, View } from 'react-native'
import Divider from '@src/presentation/components/Divider'

type NotificationItemProps = {
	title: string
	description: string
	date: string
	onPress: () => void
	isRead?: boolean
}

export default function NotificationItem({
	title,
	description,
	date,
	onPress,
	isRead = false,
}: NotificationItemProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			className={`${isRead ? 'bg-blue-900' : ''} px-[20px]`}
		>
			<View className={'gap-[5px]'}>
				<Text className={'font-opensans-semibold text-[15px]'}>{title}</Text>
				<Text className={'font-opensans-regular text-[14px]'}>{description}</Text>
				<View className={'flex-row items-center'}>
					<Text className={'font-opensans-regular text-[14px]'}>{'('}</Text>
					<Text className={'font-opensans-regular text-[14px] text-blue-500'}>{date}</Text>
					<Text className={'font-opensans-regular text-[14px]'}>{')'}</Text>
				</View>
			</View>
			<Divider />
		</TouchableOpacity>
	)
}
