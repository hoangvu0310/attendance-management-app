import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native'

type IconButtonProps = {
	iconSource: ImageSourcePropType
	onPressIcon: () => void
	color?: string
	disabled?: boolean
	width?: number
	height?: number
}

export default function IconButton({
	iconSource,
	onPressIcon,
	color,
	disabled = false,
	width = 24,
	height = 24,
}: IconButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPressIcon} disabled={disabled}>
			<Image
				source={iconSource}
				resizeMode={'contain'}
				tintColor={color}
				style={{ width: width, height: height }}
			/>
		</TouchableOpacity>
	)
}
