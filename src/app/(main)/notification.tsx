import MainTabContentView from '@src/presentation/components/MainTabContentView'
import LinearBackground from '@src/presentation/components/LinearBackground'
import Spacer from '@src/presentation/components/Spacer'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import { decapitalize } from '@src/core/shared/utils/string'
import NotificationItem from '@src/presentation/components/NotificationItem'

export default function Notification() {
	const insets = useSafeAreaInsets()
	const router = useRouter()

	const notifications = Array.from({ length: 10 }, (_) => ({
		title: 'Đơn từ được duyệt',
		request: {
			name: 'Hoàng',
			duration: '1 ngày',
			issueDate: '09-09-2025',
			reason: 'Lý do cá nhân',
			issueTimesInMonth: 10,
			requestTime: '10:00 09-09-2025',
			status: IssueStatus.APPROVED,
			issueTag: IssueTag.DISMISS,
		},
		actionTime: '10:00 09-09-2025',
	}))

	return (
		<LinearBackground>
			<View className={'gap-[10px] px-[20px] pb-[10px]'}>
				<Spacer height={insets.top} />
				<Text className={'text-start font-opensans-bold text-[28px] text-white'}>
					{'Thông báo'}
				</Text>
			</View>
			<Spacer height={10} />
			<MainTabContentView contentScrollEnabled={false}>
				<FlatList
					data={notifications}
					keyExtractor={(item, index) => item.request.requestTime + index}
					contentContainerStyle={{ paddingBottom: 60 }}
					className={'w-full'}
					renderItem={({ item }) => (
						<NotificationItem
							title={item.title}
							description={
								'Đơn ' +
								decapitalize(item.request.issueTag) +
								' của bạn ngày ' +
								item.request.issueDate +
								' ' +
								'đã được phê duyệt'
							}
							date={item.actionTime}
							onPress={() => {
								router.push({
									pathname: '/(tasks)/request-detail',
									params: {
										request: JSON.stringify(item.request),
									},
								})
							}}
						/>
					)}
				/>
			</MainTabContentView>
		</LinearBackground>
	)
}
