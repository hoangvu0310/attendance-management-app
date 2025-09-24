import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'
import { useState } from 'react'

type CheckButtonProps = {
	label: string
	onCheck: () => void
	onUncheck: () => void
	initialValue?: boolean
	checkBoxStyle?: StyleProp<ViewStyle>
}

export default function CheckButton({
	label,
	onCheck,
	onUncheck,
	initialValue,
	checkBoxStyle,
}: CheckButtonProps) {
	const [isChecked, setIsChecked] = useState(initialValue || false)

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				setIsChecked(!isChecked)
				if (isChecked) {
					onUncheck()
				} else {
					onCheck()
				}
			}}
		>
			<View className={'flex-row items-center justify-center gap-[5px]'}>
				<View
					className={`h-[16px] w-[16px] items-center justify-center ${isChecked ? 'rounded-[5px] bg-primary' : 'rounded-[5px] border-[1.5px]'}`}
					style={checkBoxStyle}
				>
					<Image
						source={ICONS.Check}
						className={'h-[16px] w-[16px]'}
						resizeMode={'contain'}
						tintColor={COLORS.white}
					/>
				</View>
				<Text>{label}</Text>
			</View>
		</TouchableOpacity>
	)
}
