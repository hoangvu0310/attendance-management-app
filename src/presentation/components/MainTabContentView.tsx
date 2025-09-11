import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

type MainTabContentViewProps = React.PropsWithChildren<{
	containerStyle?: StyleProp<ViewStyle>
}>

export default function MainTabContentView({ children, containerStyle }: MainTabContentViewProps) {
	return (
		<View
			className={'flex-1 items-center gap-[20px] rounded-t-[30px] bg-white px-[20px] pt-[20px]'}
			style={containerStyle}
		>
			{children}
		</View>
	)
}
