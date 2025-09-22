import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

type FillTextButtonProps = {
	label: string
	onPress: () => void
	disabled?: boolean
	textStyle?: StyleProp<TextStyle>
	buttonStyle?: StyleProp<ViewStyle>
}

export default function FilledTextButton({
	label,
	onPress,
	buttonStyle,
	disabled = false,
	textStyle,
}: FillTextButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			disabled={disabled}
			className={`items-center justify-center rounded-[10px] bg-primary p-[10px]`}
			style={[buttonStyle]}
			onPress={onPress}
		>
			<Text
				className={`font-opensans-medium text-[14px]`}
				style={[{ color: COLORS.white }, textStyle]}
			>
				{label}
			</Text>
		</TouchableOpacity>
	)
}
