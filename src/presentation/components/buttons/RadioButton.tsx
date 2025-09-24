import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

type RadioButtonProps = {
	label: string
	onPress: () => void
	selected?: boolean
	radioStyle?: StyleProp<ViewStyle>
}

export default function RadioButton({
	label,
	onPress,
	selected = false,
	radioStyle,
}: RadioButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View className={'flex-row items-center justify-center gap-[5px]'}>
				<View
					className={`h-[16px] w-[16px] ${selected ? 'rounded-full bg-primary' : 'rounded-full border-[1.5px] border-primary'}`}
					style={radioStyle}
				/>
				<Text>{label}</Text>
			</View>
		</TouchableOpacity>
	)
}
