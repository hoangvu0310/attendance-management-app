import React from 'react'
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'

type MainTabContentViewProps = React.PropsWithChildren<{
	containerStyle?: StyleProp<ViewStyle>
	itemGap?: number
	contentScrollEnabled?: boolean
}>

export default function MainTabContentView({
	children,
	itemGap = 20,
	containerStyle,
	contentScrollEnabled = true,
}: MainTabContentViewProps) {
	return (
		<View className={'flex-1 rounded-t-[20px] bg-white pt-[20px]'} style={containerStyle}>
			{contentScrollEnabled ? (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: itemGap }}
					className={'px-[20px] py-[5px]'}
				>
					{children}
				</ScrollView>
			) : (
				children
			)}
		</View>
	)
}
