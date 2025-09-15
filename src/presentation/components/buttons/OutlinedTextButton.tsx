import { Text, TouchableOpacity } from 'react-native'

type OutlinedTextButtonProps = {
	label: string
	onPress: () => void
	textStyle?: string
	buttonStyle?: string
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
			className={`items-center justify-center rounded-[10px] border border-primary p-[10px] ${buttonStyle}`}
			onPress={onPress}
		>
			<Text className={`font-opensans-medium text-[14px] text-primary ${textStyle}`}>{label}</Text>
		</TouchableOpacity>
	)
}
