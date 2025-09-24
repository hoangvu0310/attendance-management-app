import { StyleProp, Text, TextStyle, View } from 'react-native'
import React from 'react'

type FormComponent = React.PropsWithChildren & {
	label: string
	required?: boolean
	containerStyle?: StyleProp<ViewStyle>
	labelStyle?: StyleProp<TextStyle>
}

export default function FormComponent({
	label,
	required = false,
	containerStyle,
	labelStyle,
	children,
}: FormComponent) {
	return (
		<View className={'justify-start gap-[10px]'} style={[containerStyle]}>
			<View className={'flex-row'}>
				<Text className={'font-opensans-medium text-[14px]'} style={labelStyle}>
					{label}
				</Text>
				{required && (
					<Text className={'font-opensans-medium text-[14px] text-red-600'}>{' *'}</Text>
				)}
			</View>
			{children}
		</View>
	)
}
