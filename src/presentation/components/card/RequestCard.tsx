import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'
import Spacer from '@src/presentation/components/Spacer'
import Divider from '@src/presentation/components/Divider'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import IconButton from '@src/presentation/components/buttons/IconButton'
import { issueTagColorMapping, statusColorMapping } from '@src/core/shared/utils/color-mapping'
import { decapitalize } from '@src/core/shared/utils/string'

type RequestCardProps = {
	name?: string
	issueDate: string
	duration: string
	reason: string
	issueTimesInMonth: number
	requestTime: string
	status: IssueStatus
	issueTag: IssueTag
	onPressItem?: () => void
	onPressDelete?: () => void
}

export default function RequestCard({
	name,
	issueDate,
	duration,
	reason,
	issueTimesInMonth,
	requestTime,
	status,
	issueTag,
	onPressItem,
	onPressDelete,
}: RequestCardProps) {
	const canDelete = status === IssueStatus.DENIED || status === IssueStatus.DRAFT

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
			<TouchableOpacity activeOpacity={0.8} onPress={onPressItem}>
				<View className={'w-full flex-row items-center justify-between'}>
					<View className={'flex-row items-center gap-[10px]'}>
						<View
							className={`rounded-[20px] border px-[15px] py-[5px]`}
							style={{ borderColor: issueTagColorMapping(issueTag) }}
						>
							<Text
								className={`font-opensans-semibold text-[12px]`}
								style={{ color: issueTagColorMapping(issueTag) }}
							>
								{issueTag}
							</Text>
						</View>
						<View className={`rounded-[20px] bg-gray-900 px-[10px] py-[5px]`}>
							<Text className={'font-opensans-medium text-[12px]'}>{duration}</Text>
						</View>
					</View>
					<View className={'flex-row items-center gap-[8px]'}>
						<Text
							className={'font-opensans-medium text-[14px]'}
							style={{ color: statusColorMapping(status) }}
						>
							{status}
						</Text>
						{canDelete && (
							<View className={'rounded-full bg-red-900 p-[5px]'}>
								<IconButton
									iconSource={ICONS.Bin}
									onPressIcon={() => {
										if (onPressDelete) {
											onPressDelete()
										}
									}}
									color={COLORS.red['500']}
									width={15}
									height={15}
								/>
							</View>
						)}
					</View>
				</View>
				<Spacer height={10} />
				<View className={'items-start justify-center gap-[5px]'}>
					{name && <Text className={'font-opensans-semibold text-[22px]'}>{name}</Text>}
					<View className={'flex-row items-center'}>
						<Text className={'font-opensans-medium text-[12px] text-gray-400'}>
							{'Ngày nghỉ: '}
						</Text>
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
							{'Số lần ' + decapitalize(issueTag) + ' trong tháng:'}
						</Text>
						<Text className={'font-opensans-medium text-[12px] text-blue-400'}>
							{issueTimesInMonth}
						</Text>
					</View>
					<Text className={'font-opensans-medium text-[12px] text-gray-600'}>{requestTime}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}
