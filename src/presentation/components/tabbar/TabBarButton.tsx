import { ImageSourcePropType, TouchableOpacity, Image, Text, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

type TabBarButtonProps = {
	iconSource: ImageSourcePropType
	isActive: boolean
	label: string
	onPressTab: () => void
	isNotification?: boolean
}

export default function TabBarButton({
	iconSource,
	isActive,
	label,
	onPressTab,
	isNotification = false,
}: TabBarButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPressTab}
			className={'items-center gap-[6px] px-[10px]'}
		>
			<View>
				<Image
					source={iconSource}
					resizeMode={'contain'}
					tintColor={isActive ? COLORS.primary : COLORS.black}
					className={'h-[24px] w-[24px]'}
				/>
				{isNotification && (
					<View
						className={'absolute right-[-5] top-[-5] rounded-full bg-red-600 px-[5px] py-[2px]'}
					>
						<Text className={'font-opensans-regular text-[10px] text-white'}>{'6'}</Text>
					</View>
				)}
			</View>

			<Text
				className={`font-opensans-medium text-[12px] ${isActive ? 'text-primary' : 'text-gray-500'}`}
			>
				{label}
			</Text>
		</TouchableOpacity>
	)
}
