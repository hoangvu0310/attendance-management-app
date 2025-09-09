import { ImageSourcePropType, TouchableOpacity, Image, Text } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

type TabBarButtonProps = {
	iconSource: ImageSourcePropType
	isActive: boolean
	label: string
	onPressTab: () => void
}

export default function TabBarButton({
	iconSource,
	isActive,
	label,
	onPressTab,
}: TabBarButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPressTab}
			className={'items-center gap-[6px] px-[10px]'}
		>
			<Image
				source={iconSource}
				resizeMode={'contain'}
				tintColor={isActive ? COLORS.primary : COLORS.black}
				className={'h-[24px] w-[24px]'}
			/>
			<Text
				className={`font-opensans-medium text-[12px] ${isActive ? 'text-primary' : 'text-gray-500'}`}
			>
				{label}
			</Text>
		</TouchableOpacity>
	)
}
