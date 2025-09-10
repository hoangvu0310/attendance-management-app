import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@src/presentation/components/buttons/BackButton'
import { Text, View } from 'react-native'
import Spacer from '@src/presentation/components/Spacer'
import IconButton from '@src/presentation/components/buttons/IconButton'
import { ICONS } from '@src/core/shared/constants'

export default function ApprovedDoc() {
	const docList = [
		{
			name: 'Nguyen Van A',
			duration: '1 ngày',
			issueDate: '09-09-2025',
			reason: 'Lý do cá nhân',
			daysLateInMonth: 10,
			requestTime: '10:00 09-09-2025',
			status: 'Đã duyệt',
			tag: 'Xin nghỉ',
		},
	]

	return (
		<SafeAreaView className={'flex-1 bg-white px-[20px]'}>
			<Spacer height={30} />
			<View className={'w-full flex-row items-center justify-between'}>
				<View className={'flex-row items-center gap-[20px]'}>
					<BackButton />
					<Text className={'font-opensans-bold text-[24px]'}>{'Đơn từ đã duyệt'}</Text>
				</View>
				<IconButton iconSource={ICONS.Search} onPressIcon={() => {}} />
			</View>
			<Spacer height={30} />
		</SafeAreaView>
	)
}
