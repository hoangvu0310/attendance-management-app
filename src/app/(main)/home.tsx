import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS, ICONS, IMAGES } from '@src/core/shared/constants'
import Spacer from '@src/presentation/components/Spacer'
import { useState } from 'react'
import LinearBackground from '@src/presentation/components/LinearBackground'
import MainTabContentView from '@src/presentation/components/MainTabContentView'
import TrackingCard from '@src/presentation/components/home/TrackingCard'
import { IssueTag } from '@src/core/shared/constants/enum'
import QuickRequestCard from '@src/presentation/components/home/QuickRequestCard'
import MonthYearPickerModal from '@src/presentation/components/modal/MonthYearPickerModal'
import { toShortMonthString } from '@src/core/shared/utils/date'

export default function Home() {
	const inset = useSafeAreaInsets()
	const userFullName = 'Vũ Việt Hoàng'
	const employeeId = '123456789'
	const quickRequestList = [
		{
			title: IssueTag.DISMISS,
			iconSource: ICONS.Calendar,
			onPress: () => {},
		},
		{
			title: IssueTag.LATE_AND_LEAVE_EARLY,
			iconSource: ICONS.Clock,
			onPress: () => {},
		},
		{
			title: IssueTag.ONSITE,
			iconSource: ICONS.Location,
			onPress: () => {},
		},
		{
			title: IssueTag.BUSINESS,
			iconSource: ICONS.Suitcase,
			onPress: () => {},
		},
		{
			title: IssueTag.CONFERENCE,
			iconSource: ICONS.Book,
			onPress: () => {},
		},
	]
	const approvalNeedList = []

	const [chosenMonth, setChosenMonth] = useState(new Date())
	const [isTimePickerVisible, setIsTimePickerVisible] = useState<boolean>(false)

	const onPressMonth = () => setIsTimePickerVisible(true)

	return (
		<>
			<LinearBackground>
				<View className={'gap-[10px] px-[20px] pb-[10px]'}>
					<Spacer height={inset.top} />
					<View className={'w-full flex-row items-center justify-between'}>
						<View>
							<Text className={'text-start font-opensans-semibold text-[24px] text-white'}>
								{userFullName}
							</Text>
							<Text className={'text-start font-opensans-regular text-[16px] text-white'}>
								{employeeId}
							</Text>
						</View>
						<View className={'rounded-full border-[5px] border-blue-600'}>
							<Image
								source={IMAGES.DefaultAvatar}
								resizeMode={'contain'}
								className={'h-[40px] w-[40px]'}
							/>
						</View>
					</View>
					<View className={'self-end'}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={onPressMonth}
							className={'flex-row items-center justify-center gap-[10px]'}
						>
							<Text className={'font-opensans-regular text-white'}>
								{toShortMonthString(chosenMonth)}
							</Text>
							<Image
								source={ICONS.Calendar}
								className={'h-[24px] w-[24px]'}
								tintColor={COLORS.white}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<MainTabContentView>
					<ScrollView showsVerticalScrollIndicator={false} className={'w-full flex-1'}>
						<View className={'w-full gap-[15px] p-[1px]'}>
							<View className={'flex-row gap-[15px]'}>
								<TrackingCard title={IssueTag.LATE} value={1} onPress={() => {}} />
								<TrackingCard title={IssueTag.LEAVE_EARLY} value={1} onPress={() => {}} />
							</View>
							<View className={'flex-row gap-[15px]'}>
								<TrackingCard title={IssueTag.DISMISS} value={1} onPress={() => {}} />
								<TrackingCard title={IssueTag.NOT_CHECKIN} value={1} onPress={() => {}} />
							</View>
						</View>
						<Spacer height={20} />
						<Text className={'py-[10px] font-opensans-medium text-[18px]'}>{'Xin phép nhanh'}</Text>
						<FlatList
							data={quickRequestList}
							keyExtractor={(item) => item.title}
							horizontal={true}
							contentContainerStyle={{ gap: 20 }}
							renderItem={({ item }) => (
								<QuickRequestCard
									title={item.title}
									iconSource={item.iconSource}
									onPress={item.onPress}
								/>
							)}
						/>

						<Spacer height={20} />
						<Text className={'py-[10px] font-opensans-medium text-[18px]'}>
							{'Đơn từ cần duyệt (' + approvalNeedList.length + ')'}
						</Text>
						<View className={'w-full items-center justify-center p-[20px]'}>
							<Image
								source={IMAGES.NoData}
								resizeMode={'contain'}
								className={'h-[150px] w-[150px]'}
							/>
							<Text className={'font-opensans-regular text-gray-600'}>{'Không có dữ liệu'}</Text>
						</View>
						<Spacer height={150} />
					</ScrollView>
				</MainTabContentView>
			</LinearBackground>

			<MonthYearPickerModal
				isVisible={isTimePickerVisible}
				closeModal={() => setIsTimePickerVisible(false)}
				currentMonth={chosenMonth.getMonth() + 1}
				currentYear={chosenMonth.getFullYear()}
				onSelectMonth={(month, year) => console.log(month, year)} // TODO: implement change month
			/>
		</>
	)
}
