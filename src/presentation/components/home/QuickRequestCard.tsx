import { IssueTag } from '@src/core/shared/constants/enum'
import {
	Image,
	ImageSourcePropType,
	LayoutChangeEvent,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { COLORS } from '@src/core/shared/constants'
import { useEffect, useState } from 'react'

type QuickRequestCardProps = {
	title: IssueTag
	iconSource: ImageSourcePropType
	onPress: () => void
}

export default function QuickRequestCard({ title, iconSource, onPress }: QuickRequestCardProps) {
	const [iconLayout, setIconLayout] = useState({ width: 0, height: 0 })
	const [textLayout, setTextLayout] = useState({ width: 0, height: 0 })

	const onCardLayout = (e: LayoutChangeEvent) => {
		setIconLayout(e.nativeEvent.layout)
	}

	const onTextLayout = (e: LayoutChangeEvent) => {
		setTextLayout(e.nativeEvent.layout)
	}

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className={'items-center'}
			style={{ paddingBottom: 50 }}
			onPress={onPress}
		>
			<View onLayout={onCardLayout} className={'relative rounded-[15px] bg-blue-400 p-[15px]'}>
				<Image
					source={iconSource}
					resizeMode={'contain'}
					className={'h-[32px] w-[32px]'}
					tintColor={COLORS.white}
				/>
			</View>
			<Text
				onLayout={onTextLayout}
				className={'text-center font-opensans-semibold text-[12px]'}
				style={{
					width: iconLayout.width + 10,
					position: 'absolute',
					bottom: 50 - textLayout.height - 5,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
