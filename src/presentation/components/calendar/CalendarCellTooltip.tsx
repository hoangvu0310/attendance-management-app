import { IssueTag } from '@src/core/shared/constants/enum'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

type CalendarCellTooltipProps = {
	data: {
		date: number
		month: number
		year: number
		checkinTime: string
		checkoutTime: string
		issues: { tag: IssueTag; note: string }[]
	}
	position: { x: number; y: number }
	closeTooltip: () => void
}

export default function CalendarCellTooltip({
	data,
	position,
	closeTooltip,
}: CalendarCellTooltipProps) {
	return (
		<View
			className={'flex-wrap rounded-[15px] bg-white py-[10px]'}
			style={{
				maxWidth: 200,
				position: 'absolute',
				bottom: position.y,
				left: position.x,
				transform: [
					{
						translateX: `-50%`,
					},
				],
				shadowColor: COLORS.gray['100'],
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.2,
				shadowRadius: 1.41,

				elevation: 2,
			}}
		>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={closeTooltip}
				className={'flex-1 items-center'}
			>
				<View className={'flex-row'}>
					{data.checkinTime && data.checkinTime ? (
						<Text className={'font-opensans-medium text-[12px] text-primary'}>
							{data.checkinTime + ' - ' + data.checkoutTime}
						</Text>
					) : (
						<Text className={'font-opensans-medium text-[12px] text-primary'}>
							{'--:-- - --:--'}
						</Text>
					)}
				</View>
				{data.issues && (
					<>
						<View className={'gap-[5px] px-[15px]'}>
							{data.issues.map((issue) => (
								<View key={issue.tag} className={'flex-row items-center gap-[5px]'}>
									<View className={'h-[7px] w-[7px] rounded-full bg-primary'} />
									<Text className={'flex-shrink font-opensans-medium text-[12px]'}>
										{issue.tag + ': ' + issue.note}
									</Text>
								</View>
							))}
						</View>
					</>
				)}
			</TouchableOpacity>
		</View>
	)
}
