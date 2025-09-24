import {
	Platform,
	StyleProp,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native'
import { COLORS } from '@src/core/shared/constants'
import React from 'react'

type AppTextfieldProps = TextInputProps & {
	textfieldStyle?: StyleProp<ViewStyle>
	inputStyle?: StyleProp<TextStyle>
	leadingComponent?: React.ReactNode
	trailingComponent?: React.ReactNode
}

export default function AppTextfield({
	textfieldStyle,
	inputStyle,
	trailingComponent,
	leadingComponent,
	...props
}: AppTextfieldProps) {
	return (
		<View
			className={`flex-row items-center rounded-[10px] bg-blue-900 px-[10px] ${
				Platform.OS === 'ios' ? 'py-[10px]' : ''
			}`}
			style={[textfieldStyle]}
		>
			{leadingComponent && leadingComponent}
			<TextInput
				className={'flex-1'}
				cursorColor={COLORS.primary}
				multiline={true}
				placeholderTextColor={COLORS.gray['700']}
				style={[inputStyle]}
				{...props}
			/>
			{trailingComponent && trailingComponent}
		</View>
	)
}
