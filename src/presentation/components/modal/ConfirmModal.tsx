import AppModal from '@src/presentation/components/modal/AppModal'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import { COLORS } from '@src/core/shared/constants'
import React from 'react'

type ConfirmModalProps = {
	confirmationText?: string
	cancelText?: string
	confirmText?: string
	onConfirm: () => void
	onCancel: () => void
	closeModal?: () => void
	isVisible: boolean
	confirmationTextStyle?: StyleProp<TextStyle>
	cancelButtonStyle?: StyleProp<ViewStyle>
	confirmButtonStyle?: StyleProp<ViewStyle>
	cancelTextStyle?: StyleProp<TextStyle>
	confirmTextStyle?: StyleProp<TextStyle>
	children?: React.ReactNode
}

export default function ConfirmModal({
	confirmationText,
	cancelText = 'Hủy',
	confirmText = 'Xác nhận',
	onConfirm,
	onCancel,
	closeModal,
	isVisible,
	confirmationTextStyle,
	cancelButtonStyle,
	confirmButtonStyle,
	cancelTextStyle,
	confirmTextStyle,
	children,
}: ConfirmModalProps) {
	return (
		<AppModal isVisible={isVisible} closeModal={closeModal ? closeModal : onCancel}>
			<View className={'w-[`80%`] items-center rounded-xl bg-white p-[20px]'}>
				{children ? (
					children
				) : (
					<Text
						className={`px-[15px] text-center font-opensans-medium text-[14px]`}
						style={confirmationTextStyle}
					>
						{confirmationText}
					</Text>
				)}

				<View className={'w-full flex-row justify-around gap-[15px] pt-[20px]'}>
					<FilledTextButton
						label={cancelText}
						onPress={onCancel}
						buttonStyle={[{ flex: 1, backgroundColor: COLORS.blue['800'] }, cancelButtonStyle]}
						textStyle={cancelTextStyle}
					/>
					<FilledTextButton
						label={confirmText}
						onPress={onConfirm}
						buttonStyle={[{ flex: 1 }, confirmButtonStyle]}
						textStyle={confirmTextStyle}
					/>
				</View>
			</View>
		</AppModal>
	)
}
