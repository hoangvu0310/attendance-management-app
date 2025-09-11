import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

type AppModalProps = React.PropsWithChildren<{
	isVisible: boolean
	closeModal: () => void
}>

export default function AppModal({ isVisible, closeModal, children }: AppModalProps) {
	return (
		<Modal
			visible={isVisible}
			backdropColor={'rgba(0, 0, 0, 0.4)'}
			animationType={'fade'}
			presentationStyle={'overFullScreen'} // Avoid black screen in IOS
			statusBarTranslucent={true} // Render on top of the status bar on Android
			navigationBarTranslucent={true} // Render on top of the navigation bar on Android
			className={'flex-1'}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View className={'flex-1 items-center justify-center'}>
					<TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}
