import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'
import CheckinHistoryCalendarGrid from '@src/presentation/components/calendar/CheckinHistoryCalendarGrid'
import { ScrollView, Text, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

export default function CheckinHistory() {
	const tags = [
		{
			tag: 'Đi muộn về sớm',
			tagColor: COLORS.yellow['500'],
		},
		{
			tag: 'Không chấm công',
			tagColor: COLORS.red['500'],
		},
		{
			tag: 'Xin nghỉ, nghỉ phép',
			tagColor: COLORS.green['600'],
		},
		{
			tag: 'Vắng mặt có xin phép',
			tagColor: COLORS.blue['200'],
		},
		{
			tag: 'Đủ công',
			tagColor: COLORS.blue['400'],
		},
	]

	return (
		<SafeAreaScreen title={'Lịch sử chấm công'}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 50 }}
			>
				<CheckinHistoryCalendarGrid />
				<View className={'w-full flex-row justify-between px-[20px] py-[30px]'}>
					<View className={'items-start justify-start gap-[10px]'}>
						{tags.slice(0, 3).map((item, index) => renderTag(item.tag, item.tagColor))}
					</View>
					<View className={'items-start justify-start gap-[10px]'}>
						{tags.slice(3, tags.length).map((item, index) => renderTag(item.tag, item.tagColor))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaScreen>
	)
}

const renderTag = (tag: string, tagColor: string) => {
	return (
		<View key={tag} className={'flex-row items-center justify-center gap-[8px]'}>
			<View style={{ backgroundColor: tagColor, width: 18, height: 18, borderRadius: 5 }} />
			<Text className={'font-opensans-regular text-[13px]'}>{tag}</Text>
		</View>
	)
}
