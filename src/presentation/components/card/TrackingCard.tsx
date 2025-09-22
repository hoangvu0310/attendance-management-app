import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'
import { IssueTag } from '@src/core/shared/constants/enum'

type TrackingCardProps = {
	title: string
	value: number
	onPress: () => void
}

export default function TrackingCard({ title, value, onPress }: TrackingCardProps) {
	return (
		<View
			className={'flex-1 justify-start gap-[5px] rounded-[10px] bg-white p-[10px]'}
			style={{
				shadowColor: COLORS.gray['400'],
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.23,
				shadowRadius: 2.62,

				elevation: 4,
			}}
		>
			<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
				<Text className={'font-opensans-medium text-gray-400'}>{title}</Text>
				<Text
					className={`font-opensans-bold text-[22px] text-green-600 ${title === IssueTag.DISMISS ? 'text-green-600' : title === IssueTag.LATE || title === IssueTag.LEAVE_EARLY ? 'text-yellow' : 'text-red'}`}
				>
					{value}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
