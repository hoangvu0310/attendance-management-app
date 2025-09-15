import React from 'react'
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'

type MainTabContentViewProps = React.PropsWithChildren<{
	containerStyle?: StyleProp<ViewStyle>
	itemGap?: number
}>

export default function MainTabContentView({
	children,
	itemGap = 20,
	containerStyle,
}: MainTabContentViewProps) {
	return (
		<View
			className={'flex-1 items-center rounded-t-[30px] bg-white pt-[20px]'}
			style={containerStyle}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: itemGap }}
				className={'px-[20px] py-[5px]'}
			>
				{children}
			</ScrollView>
		</View>
	)
}
