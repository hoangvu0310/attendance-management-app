import { Text, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'
import Spacer from '@src/presentation/components/Spacer'
import Divider from '@src/presentation/components/Divider'

export enum IssueTag {
	LATE = 'Đến muộn',
	DISMISS = 'Xin nghỉ',
}

type ApprovedRequestCardProps = {
	name: string
	issueDate: string
	duration: string
	reason: string
	issueTimesInMonth: number
	requestTime: string
	status: string
	issueTag: IssueTag
}

export default function ApprovedRequestCard({
	name,
	issueDate,
	duration,
	reason,
	issueTimesInMonth,
	requestTime,
	status,
	issueTag,
}: ApprovedRequestCardProps) {
	return (
		<View
			className={'rounded-[15px] bg-white px-[15px] py-[15px]'}
			style={{
				shadowColor: COLORS.gray['100'],
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.23,
				shadowRadius: 2.62,

				elevation: 4,
			}}
		>
			<View className={'w-full flex-row items-center justify-between'}>
				<View className={'flex-row items-center gap-[10px]'}>
					<View
						className={`rounded-[20px] border-2 ${issueTag === IssueTag.LATE ? 'border-yellow' : 'border-green-600'} px-[15px] py-[8px]`}
					>
						<Text
							className={`font-opensans-semibold text-[14px] ${issueTag === IssueTag.LATE ? 'text-yellow' : 'text-green-600'}`}
						>
							{issueTag}
						</Text>
					</View>
					<View className={`rounded-[20px] bg-gray-900 px-[15px] py-[8px]`}>
						<Text className={'font-opensans-medium text-[14px]'}>{duration}</Text>
					</View>
				</View>
				<Text className={'font-opensans-semibold text-[16px] text-green-600'}>{status}</Text>
			</View>
			<Spacer height={10} />
			<View className={'items-start justify-center gap-[5px]'}>
				<Text className={'font-opensans-bold text-[24px]'}>{name}</Text>
				<View className={'flex-row items-center'}>
					<Text className={'font-opensans-medium text-[12px] text-gray-400'}>{'Ngày nghỉ: '}</Text>
					<Text className={'font-opensans-medium text-[12px]'}>{issueDate}</Text>
				</View>
				<View className={'flex-row items-center'}>
					<Text className={'font-opensans-medium text-[12px] text-gray-400'}>{'Lý do: '}</Text>
					<Text className={'font-opensans-medium text-[12px]'}>{reason}</Text>
				</View>
			</View>
			<Divider />
			<View className={'flex-row justify-between'}>
				<View className={'flex-row items-center'}>
					<Text className={'font-opensans-medium text-[12px]'}>
						{issueTag === IssueTag.LATE
							? 'Số lần đi muộn trong tháng: '
							: 'Số ngày nghỉ trong tháng: '}
					</Text>
					<Text className={'font-opensans-medium text-[12px] text-blue-400'}>
						{issueTimesInMonth}
					</Text>
				</View>
				<Text className={'font-opensans-medium text-[12px] text-gray-600'}>{requestTime}</Text>
			</View>
		</View>
	)
}
