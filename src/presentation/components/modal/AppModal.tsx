import { Modal, ModalProps, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

type AppModalProps = ModalProps &
	React.PropsWithChildren<{
		isVisible: boolean
		closeModal: () => void
	}>

export default function AppModal({ isVisible, closeModal, children, ...props }: AppModalProps) {
	return (
		<Modal
			visible={isVisible}
			backdropColor={'rgba(0, 0, 0, 0.4)'}
			animationType={'fade'}
			presentationStyle={'overFullScreen'} // Avoid black screen in IOS
			statusBarTranslucent={true} // Render on top of the status bar on Android
			navigationBarTranslucent={true} // Render on top of the navigation bar on Android
			supportedOrientations={['portrait', 'landscape']}
			onRequestClose={closeModal}
			{...props}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View className={'flex-1 items-center justify-center'} />
			</TouchableWithoutFeedback>

			<View className={'absolute inset-0 items-center justify-center'}>{children}</View>
		</Modal>
	)
}
