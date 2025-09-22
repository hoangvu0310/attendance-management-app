import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

type OutlinedTextButtonProps = {
	label: string
	onPress: () => void
	textStyle?: StyleProp<TextStyle>
	buttonStyle?: StyleProp<ViewStyle>
	disabled?: boolean
}

export default function OutlinedTextButton({
	label,
	onPress,
	textStyle,
	buttonStyle,
	disabled = false,
}: OutlinedTextButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			disabled={disabled}
			className={`items-center justify-center rounded-[10px] border border-primary p-[10px]`}
			style={[buttonStyle]}
			onPress={onPress}
		>
			<Text className={`font-opensans-medium text-[14px] text-primary`} style={[textStyle]}>
				{label}
			</Text>
		</TouchableOpacity>
	)
}
