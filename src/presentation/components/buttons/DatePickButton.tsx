import { Text, TouchableOpacity, View, Image } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'

type DatePickButtonProps = {
	onPress: () => void
	date: string
}

export default function DatePickButton({ onPress, date }: DatePickButtonProps) {
	return (
		<View className={'rounded-[10px] bg-blue-900'}>
			<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
				<View className={'flex-row items-center justify-between p-[10px]'}>
					<Text className={'font-opensans-medium text-[14px]'}>{date}</Text>
					<Image
						source={ICONS.Calendar}
						resizeMode={'contain'}
						tintColor={COLORS.blue['500']}
						className={'h-[18px] w-[18px]'}
					/>
				</View>
			</TouchableOpacity>
		</View>
	)
}
