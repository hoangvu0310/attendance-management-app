import { Text, TouchableOpacity } from 'react-native'

type FillTextButtonProps = {
	label: string
	onPress: () => void
	textStyle?: string
	buttonStyle?: string
	disabled?: boolean
}

export default function FilledTextButton({
	label,
	onPress,
	textStyle,
	buttonStyle,
	disabled = false,
}: FillTextButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			disabled={disabled}
			className={`items-center justify-center rounded-[10px] bg-primary p-[10px] ${buttonStyle}`}
			onPress={onPress}
		>
			<Text className={`font-opensans-medium text-[14px] text-white ${textStyle}`}>{label}</Text>
		</TouchableOpacity>
	)
}
