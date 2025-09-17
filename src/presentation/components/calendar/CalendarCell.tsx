import { LayoutChangeEvent, Text, TouchableOpacity, View } from 'react-native'
import { useRef } from 'react'
import { IssueTag } from '@src/core/shared/constants/enum'

type CalendarCellProps = {
	date: number
	cellIndex: number
	maxIndex: number
	currentSelectedIndex: number
	daysInMonth: number
	firstDayOfMonth: number
	issues?: { tag: IssueTag; note: string }[]
	onPressCell?: () => void
	setTooltipPosition: (position: { x: number; y: number }) => void
}

export default function CalendarCell({
	date,
	cellIndex,
	maxIndex,
	currentSelectedIndex,
	daysInMonth,
	firstDayOfMonth,
	issues,
	onPressCell,
	setTooltipPosition,
}: CalendarCellProps) {
	const cellRef = useRef<View>(null)
	const textRef = useRef<Text>(null)

	const isWeekend = cellIndex % 7 === 0 || cellIndex % 7 === 6
	const isExposedRight = cellIndex % 7 === 6 || date === daysInMonth
	const isExposedBottom = date > daysInMonth - 7

	const handleCellPress = () => {
		if (cellRef.current && textRef.current) {
			cellRef.current.measure((x, y, width, height) => {
				textRef.current?.measure((textX, textY) => {
					setTooltipPosition({
						x: x + width / 2,
						y: (height * maxIndex) / 7 - (y + height * Math.floor(cellIndex / 7) + textY),
					})
				})
			})
		}
	}

	const handleCellLayout = (e: LayoutChangeEvent) => {
		if (currentSelectedIndex === cellIndex) {
			handleCellPress()
		}
	}

	// hide the previous month date and next month date
	if (cellIndex < firstDayOfMonth || cellIndex - firstDayOfMonth >= daysInMonth) {
		return <View className={'flex-1 p-[5px]'} />
	}

	return (
		// 1/7 width
		<View
			ref={cellRef}
			onLayout={handleCellLayout}
			className={`h-[50px] w-[14.28%] px-[5px]`}
			style={{
				borderColor: `rgba(0, 0, 0, 0.04)`,
				borderTopWidth: 0.5,
				borderLeftWidth: 0.5,
				borderRightWidth: isExposedRight ? 0.5 : 0,
				borderBottomWidth: isExposedBottom ? 0.5 : 0,
			}}
		>
			<TouchableOpacity
				activeOpacity={0.7}
				disabled={isWeekend}
				onPress={() => {
					if (onPressCell) {
						onPressCell()
					}
					handleCellPress()
				}}
				className={'flex-1 items-center justify-center'}
			>
				<Text
					ref={textRef}
					className={`font-opensans-semibold text-[14px] ${isWeekend ? 'text-gray-600' : ''}`}
				>
					{date}
				</Text>
				{issues && (
					<View className={'flex-row flex-wrap items-center justify-center gap-[1px]'}>
						{issues?.map((issue) => {
							return (
								<View
									key={issue.note + ` ${date}`}
									className={'h-[5px] w-[5px] rounded-full bg-red'}
								/>
							)
						})}
					</View>
				)}
			</TouchableOpacity>
		</View>
	)
}
