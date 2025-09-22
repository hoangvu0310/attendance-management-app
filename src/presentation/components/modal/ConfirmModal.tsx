import AppModal from '@src/presentation/components/modal/AppModal'
import { Text, View } from 'react-native'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import { COLORS } from '@src/core/shared/constants'

type ConfirmModalProps = {
	confirmationText: string
	onConfirm: () => void
	onCancel: () => void
	isVisible: boolean
	confirmationTextStyle?: string
}

export default function ConfirmModal({
	confirmationText,
	onConfirm,
	onCancel,
	isVisible,
	confirmationTextStyle,
}: ConfirmModalProps) {
	return (
		<AppModal isVisible={isVisible} closeModal={onCancel}>
			<View className={'w-[`75%`] items-center rounded-xl bg-white p-[20px]'}>
				<Text
					className={`px-[15px] text-center font-opensans-medium text-[14px] ${confirmationTextStyle}`}
				>
					{confirmationText}
				</Text>
				<View className={'w-full flex-row justify-around gap-[15px] pt-[20px]'}>
					<FilledTextButton
						label={'Hủy'}
						onPress={onCancel}
						buttonStyle={{ flex: 1, backgroundColor: COLORS.blue['800'] }}
					/>
					<FilledTextButton label={'Xác nhận'} onPress={onConfirm} buttonStyle={{ flex: 1 }} />
				</View>
			</View>
		</AppModal>
	)
}
