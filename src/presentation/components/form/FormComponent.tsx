import { Text, View } from 'react-native'
import React from 'react'

type FormComponent = React.PropsWithChildren & {
	label: string
}

export default function FormComponent({ label, children }: FormComponent) {
	return (
		<View className={'flex-1 justify-start gap-[10px]'}>
			<Text className={'font-opensans-medium text-[14px]'}>{label}</Text>
			{children}
		</View>
	)
}
