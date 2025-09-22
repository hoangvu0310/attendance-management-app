import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleProp, Text, View, ViewStyle } from 'react-native'
import IconButton from '@src/presentation/components/buttons/IconButton'
import { ICONS } from '@src/core/shared/constants'
import AppModal from '@src/presentation/components/modal/AppModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type ModalBottomSheetProps = React.PropsWithChildren<{
	isVisible: boolean
	closeBottomSheet: () => void
	title: string
	containerStyle?: StyleProp<ViewStyle>
}>

export default function ModalBottomSheet({
	isVisible,
	closeBottomSheet,
	title,
	containerStyle,
	children,
}: ModalBottomSheetProps) {
	const insets = useSafeAreaInsets()
	const [sheetLayout, setSheetLayout] = useState<any>({ width: 0, height: 0 })
	const posX = useSharedValue(sheetLayout.height)
	const animatedSheetStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: posX.value,
				},
			],
		}
	})

	const onSheetLayout = (event: LayoutChangeEvent) => {
		setSheetLayout(event.nativeEvent.layout)
	}

	useEffect(() => {
		if (!isVisible) {
			posX.value = withTiming(sheetLayout.height, { duration: 200 })
		} else {
			posX.value = withTiming(0, { duration: 200 })
		}
	}, [isVisible])

	return (
		<AppModal isVisible={isVisible} closeModal={closeBottomSheet} animationType={'fade'}>
			<Animated.View
				onLayout={onSheetLayout}
				className={'absolute bottom-0 max-h-[`80%`] w-full rounded-t-[15px] bg-white'}
				style={[{ paddingBottom: insets.bottom }, animatedSheetStyle, containerStyle]}
			>
				<View className={'flex-row justify-between px-[20px] py-[15px]'}>
					<View />
					<Text className={'font-opensans-semibold text-[16px]'}>{title}</Text>
					<IconButton
						iconSource={ICONS.Close}
						onPressIcon={closeBottomSheet}
						width={16}
						height={16}
					/>
				</View>
				{children}
			</Animated.View>
		</AppModal>
	)
}
