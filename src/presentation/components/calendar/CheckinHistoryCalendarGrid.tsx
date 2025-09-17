import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { getDaysInMonth, getFirstWeekDay, toShortMonthString } from '@src/core/shared/utils/date'
import Spacer from '@src/presentation/components/Spacer'
import { IssueTag } from '@src/core/shared/constants/enum'
import CalendarCell from '@src/presentation/components/calendar/CalendarCell'
import { useState } from 'react'
import { COLORS, ICONS } from '@src/core/shared/constants'
import CalendarCellTooltip from '@src/presentation/components/calendar/CalendarCellTooltip'
import IconButton from '@src/presentation/components/buttons/IconButton'
import MonthYearPickerModal from '@src/presentation/components/modal/MonthYearPickerModal'

type CheckinHistoryCalendarProps = {}

export default function CheckinHistoryCalendarGrid({}: CheckinHistoryCalendarProps) {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [isSelectingDate, setIsSelectingDate] = useState(false)
	const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1)
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
	const [tooltipData, setTooltipData] = useState<
		| {
				date: number
				month: number
				year: number
				checkinTime: string
				checkoutTime: string
				issues: { tag: IssueTag; note: string }[]
		  }
		| undefined
	>(undefined)

	const openTooltip = () => setIsTooltipVisible(true)

	const closeTooltip = () => setIsTooltipVisible(false)

	// mocked data
	const monthData = [
		{
			date: 1,
			month: 9,
			year: 2025,
			checkinTime: '10:00',
			checkoutTime: '11:00',
			issues: [
				{ tag: IssueTag.ONSITE, note: 'onsite' },
				{ tag: IssueTag.LATE, note: 'late' },
				{ tag: IssueTag.CONFERENCE, note: 'conference' },
			],
		},
		{
			date: 5,
			month: 9,
			year: 2025,
			checkinTime: '10:00',
			checkoutTime: '11:00',
			issues: [
				{ tag: IssueTag.ONSITE, note: 'onsite' },
				{ tag: IssueTag.LATE, note: 'late' },
				{ tag: IssueTag.CONFERENCE, note: 'di hop hoi thao abc' },
			],
		},
		{
			date: 8,
			month: 9,
			year: 2025,
			checkinTime: '10:00',
			checkoutTime: '11:00',
			issues: [
				{ tag: IssueTag.ONSITE, note: 'onsite' },
				{ tag: IssueTag.LATE, note: 'late' },
				{ tag: IssueTag.CONFERENCE, note: 'di hop hoi thao aa abc' },
			],
		},
		{
			date: 9,
			month: 9,
			year: 2025,
			checkinTime: '10:00',
			checkoutTime: '11:00',
			issues: [
				{ tag: IssueTag.ONSITE, note: 'onsite' },
				{ tag: IssueTag.LATE, note: 'late' },
				{ tag: IssueTag.CONFERENCE, note: 'test' },
			],
		},
		{
			date: 16,
			month: 9,
			year: 2025,
			checkinTime: '10:00',
			checkoutTime: '11:00',
			issues: [
				{ tag: IssueTag.ONSITE, note: 'onsite abc abc abc aaaaaaaa' },
				{ tag: IssueTag.LATE, note: 'late' },
				{ tag: IssueTag.CONFERENCE, note: 'test 2' },
			],
		},
	]

	const firstDayOfMonth = getFirstWeekDay(currentDate)
	const daysInMonth = getDaysInMonth(currentDate)
	const gridDataLength =
		(daysInMonth === 31 && firstDayOfMonth >= 5) || (daysInMonth === 30 && firstDayOfMonth === 6)
			? 42
			: 35

	const monthGrid = Array.from({ length: gridDataLength }, (_, i) => i - firstDayOfMonth + 1)

	return (
		<>
			<View className={'px-[40px] py-[20px]'}>
				<View className={'w-full flex-row items-center justify-between'}>
					<IconButton
						iconSource={ICONS.Previous}
						onPressIcon={() => {
							// TODO: implement fetch data for previous month

							setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
							if (isTooltipVisible) {
								closeTooltip()
							}
						}}
					/>

					<TouchableOpacity activeOpacity={0.9} onPress={() => setIsSelectingDate(true)}>
						<Text className={'font-opensans-medium text-[16px] text-primary'}>
							{toShortMonthString(currentDate)}
						</Text>
					</TouchableOpacity>

					<IconButton
						iconSource={ICONS.Next}
						onPressIcon={() => {
							// TODO: implement fetch data for next month

							setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
							if (isTooltipVisible) {
								closeTooltip()
							}
						}}
					/>
				</View>
				<Spacer height={40} />

				<View className={'w-full flex-row items-center justify-around'}>
					<Text className={'font-opensans-bold text-[14px]'}>{'CN'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T2'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T3'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T4'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T5'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T6'}</Text>
					<Text className={'font-opensans-bold text-[14px]'}>{'T7'}</Text>
				</View>

				<Spacer height={20} />

				<View>
					<FlatList
						data={monthGrid}
						numColumns={7}
						maxToRenderPerBatch={14}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => {
							const dateData = monthData.find((data) => data.date === item)

							return (
								<CalendarCell
									date={item}
									cellIndex={index}
									maxIndex={monthGrid.length}
									currentSelectedIndex={currentSelectedIndex}
									daysInMonth={daysInMonth}
									firstDayOfMonth={firstDayOfMonth}
									issues={dateData?.issues}
									onPressCell={() => {
										setTooltipData(dateData)
										setCurrentSelectedIndex(index)
										openTooltip()
									}}
									setTooltipPosition={({ x, y }) => {
										setTooltipPosition({ x, y })
									}}
								/>
							)
						}}
					/>

					{isTooltipVisible && tooltipData && (
						<CalendarCellTooltip
							position={tooltipPosition}
							data={tooltipData}
							closeTooltip={closeTooltip}
						/>
					)}
				</View>
			</View>

			<MonthYearPickerModal
				isVisible={isSelectingDate}
				closeModal={() => setIsSelectingDate(false)}
				currentMonth={currentDate.getMonth() + 1}
				currentYear={currentDate.getFullYear()}
				onSelectMonth={(month, year) => setCurrentDate(new Date(year, month - 1))}
			/>
		</>
	)
}
