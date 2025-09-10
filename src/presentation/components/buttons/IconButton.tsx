import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native'

type IconButtonProps = {
	iconSource: ImageSourcePropType
	onPressIcon: () => void
	color?: string
	disabled?: boolean
}

export default function IconButton({
	iconSource,
	onPressIcon,
	color,
	disabled = false,
}: IconButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPressIcon} disabled={disabled}>
			<Image
				source={iconSource}
				resizeMode={'contain'}
				className={'h-[24px] w-[24px]'}
				tintColor={color}
			/>
		</TouchableOpacity>
	)
}
