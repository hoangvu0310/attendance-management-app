import React, { useCallback, useMemo, useRef } from 'react'
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { Keyboard, Text, View } from 'react-native'
import IconButton from '@src/presentation/components/buttons/IconButton'
import { ICONS } from '@src/core/shared/constants'

type AppBottomSheetProps = BottomSheetModalProps &
	React.PropsWithChildren<{
		title: string
		snapPoints?: string[]
		scrollEnabled?: boolean
	}>

export type AppBottomSheetRef = BottomSheetModal

const AppBottomSheet = React.forwardRef<AppBottomSheetRef, AppBottomSheetProps>(
	({ children, title, snapPoints = ['35%'], scrollEnabled = true, ...props }, ref) => {
		const memoSnapPoints = useMemo(() => snapPoints, [snapPoints])
		const bottomSheetRef = useRef<BottomSheetModal>(null)

		const closeBottomSheet = bottomSheetRef.current?.dismiss()

		const bottomSheetBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					onPress={() => {
						Keyboard.dismiss()
						bottomSheetRef.current?.dismiss()
					}}
				/>
			),
			[],
		)

		return (
			<BottomSheetModal
				{...props}
				ref={ref}
				snapPoints={memoSnapPoints}
				backgroundStyle={{
					borderTopLeftRadius: 15,
					borderTopRightRadius: 15,
					backgroundColor: 'white',
				}}
				handleStyle={{ display: 'none' }}
				backdropComponent={bottomSheetBackdrop}
				enableDynamicSizing={false}
			>
				<View className={'flex-row justify-between px-[20px] py-[15px]'}>
					<View />
					<Text className={'font-opensans-semibold text-[16px]'}>{title}</Text>
					<IconButton
						iconSource={ICONS.Close}
						onPressIcon={closeBottomSheet!}
						width={16}
						height={16}
					/>
				</View>
				<BottomSheetScrollView className={'px-[20px]'}>{children}</BottomSheetScrollView>
			</BottomSheetModal>
		)
	},
)

export default AppBottomSheet
