import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'
import {
	FlatList,
	Image,
	ImageSourcePropType,
	Keyboard,
	ScrollView,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { decapitalize } from '@src/core/shared/utils/string'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { IssueStatus, IssueTag, RequestHistoryAction } from '@src/core/shared/constants/enum'
import { COLORS, ICONS } from '@src/core/shared/constants'
import InformationDetailCard from '@src/presentation/components/card/InformationDetailCard'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import ConfirmModal from '@src/presentation/components/modal/ConfirmModal'
import { useState } from 'react'
import ModalBottomSheet from '@src/presentation/components/bottomsheet/ModalBottomSheet'
import Divider from '@src/presentation/components/Divider'
import FormComponent from '@src/presentation/components/form/FormComponent'
import AppTextfield from '@src/presentation/components/textfield/AppTextfield'

export default function RequestDetail() {
	const { request } = useLocalSearchParams<{ request: string }>()
	const router = useRouter()
	const [isRetrieveRequestModalVisible, setIsRetrieveRequestModalVisible] = useState(false)
	const [isCancelRequestModalVisible, setIsCancelRequestModalVisible] = useState(false)
	const [isRequestHistorySheetVisible, setIsRequestHistorySheetVisible] = useState(false)

	const requestData = JSON.parse(request) as {
		name: string
		duration: string
		issueDate: string
		reason: string
		issueTimesInMonth: number
		requestTime: string
		status: IssueStatus
		issueTag: IssueTag
	}

	const convertRequestDataToArray = () => {
		if (
			requestData.issueTag === IssueTag.LATE ||
			requestData.issueTag === IssueTag.LEAVE_EARLY ||
			requestData.issueTag === IssueTag.LATE_AND_LEAVE_EARLY
		) {
			return [
				{ label: 'Loại đơn', value: requestData.issueTag },
				{ label: 'Ngày', value: requestData.issueDate },
				{ label: 'Thòi gian', value: requestData.duration },
				{ label: 'Ghi chú', value: requestData.reason },
			]
		}
		return [
			{ label: 'Loại đơn', value: requestData.issueTag },
			{ label: 'Thòi gian', value: requestData.duration },
			{ label: 'Từ ngày', value: requestData.issueDate },
			{ label: 'Đến ngày', value: requestData.issueDate },
			{ label: 'Số ngày nghỉ', value: requestData.duration },
			{ label: 'Ghi chú', value: requestData.reason },
		]
	}

	const requestHistory = Object.values(RequestHistoryAction).map((item) => ({
		name: 'Hoàng',
		timestamp: '10:00 09-09-2025',
		action: item,
	}))

	const requestTagTitle = 'Đơn ' + decapitalize(requestData.issueTag)

	return (
		<>
			<SafeAreaScreen
				title={requestTagTitle}
				trailingIcon={ICONS.History}
				onPressTrailingIcon={() => setIsRequestHistorySheetVisible(true)}
			>
				<ScrollView
					contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<InformationDetailCard data={convertRequestDataToArray()} />

					{requestData.status === IssueStatus.CANCEL_APPROVED && (
						<View className={'flex-row'}>
							<Text className={'font-opensans-regular text-[14px]'}>{'Lý do xin hủy: '}</Text>
							<Text className={'font-opensans-regular text-[14px] text-red-600'}>{'Huy don'}</Text>
						</View>
					)}
				</ScrollView>
				<View className={'flex-row gap-[10px] px-[20px] pt-[20px]'}>
					<FilledTextButton
						label={'Đóng'}
						onPress={() => router.back()}
						buttonStyle={{ flex: 1, backgroundColor: COLORS.blue['900'], paddingVertical: 15 }}
						textStyle={{ color: COLORS.black }}
					/>
					{requestData.status === IssueStatus.APPROVED && (
						<FilledTextButton
							label={'Xin hủy đơn'}
							onPress={() => setIsCancelRequestModalVisible(true)}
							buttonStyle={{ flex: 1, paddingVertical: 15 }}
						/>
					)}
					{(requestData.status === IssueStatus.WAIT_FOR_APPROVAL ||
						requestData.status === IssueStatus.WAIT_FOR_CANCEL_APPROVAL) && (
						<FilledTextButton
							label={'Thu hồi'}
							onPress={() => setIsRetrieveRequestModalVisible(true)}
							buttonStyle={{ flex: 1, paddingVertical: 15 }}
						/>
					)}
				</View>
			</SafeAreaScreen>

			<ConfirmModal
				confirmationText={'Bạn có muốn thu hồi đơn từ này không?'}
				onConfirm={() => {
					setIsRetrieveRequestModalVisible(false)
				}}
				onCancel={() => setIsRetrieveRequestModalVisible(false)}
				isVisible={isRetrieveRequestModalVisible}
				cancelButtonStyle={{ paddingVertical: 15 }}
				confirmButtonStyle={{ paddingVertical: 15 }}
			/>

			<ConfirmModal
				onConfirm={() => {
					setIsCancelRequestModalVisible(false)
				}}
				onCancel={() => setIsCancelRequestModalVisible(false)}
				isVisible={isCancelRequestModalVisible}
				cancelButtonStyle={{ paddingVertical: 15 }}
				confirmButtonStyle={{ paddingVertical: 15 }}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<FormComponent label={'Lý do xin hủy'} containerStyle={{ width: '100%' }}>
						<AppTextfield
							placeholder={'Nhập lý do hủy'}
							textfieldStyle={{ backgroundColor: COLORS.gray['900'] }}
						/>
					</FormComponent>
				</TouchableWithoutFeedback>
			</ConfirmModal>

			<ModalBottomSheet
				isVisible={isRequestHistorySheetVisible}
				closeBottomSheet={() => {
					setIsRequestHistorySheetVisible(false)
				}}
				title={'Lịch sử đơn đi muộn về sớm'}
			>
				<FlatList
					data={requestHistory}
					keyExtractor={(item) => item.action}
					contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 20 }}
					renderItem={({ item }) => <RequestHistoryItem {...item} requestTitle={requestTagTitle} />}
				/>
			</ModalBottomSheet>
		</>
	)
}

const RequestHistoryItem = ({
	name,
	timestamp,
	action,
	requestTitle,
}: {
	name: string
	timestamp: string
	action: RequestHistoryAction
	requestTitle: string
}) => {
	const descriptionMapping = () => {
		switch (action) {
			case RequestHistoryAction.APPROVE:
			case RequestHistoryAction.CANCEL_APPROVE:
			case RequestHistoryAction.REJECT:
			case RequestHistoryAction.REJECT_CANCEL:
				return requestTitle + ' ' + action
			case RequestHistoryAction.CREATE:
			case RequestHistoryAction.UPDATE:
			case RequestHistoryAction.SEND:
			case RequestHistoryAction.RETRIEVE:
			case RequestHistoryAction.CANCEL:
				return action + ' ' + decapitalize(requestTitle)
		}
	}

	const iconMapping = () => {
		switch (action) {
			case RequestHistoryAction.APPROVE:
			case RequestHistoryAction.CANCEL_APPROVE:
				return {
					iconSource: ICONS.Tick,
					backgroundColor: COLORS.green['900'],
					iconColor: COLORS.green['600'],
				}
			case RequestHistoryAction.REJECT:
			case RequestHistoryAction.REJECT_CANCEL:
				return {
					iconSource: ICONS.Close,
					backgroundColor: COLORS.red['900'],
					iconColor: COLORS.red['500'],
				}
			case RequestHistoryAction.CREATE:
				return {
					iconSource: ICONS.Plus,
					backgroundColor: COLORS.blue['900'],
					iconColor: COLORS.blue['500'],
				}
			case RequestHistoryAction.UPDATE:
				return {
					iconSource: ICONS.Pen,
					backgroundColor: COLORS.blue['900'],
					iconColor: COLORS.blue['500'],
				}
			case RequestHistoryAction.SEND:
				return {
					iconSource: ICONS.Send,
					backgroundColor: COLORS.blue['900'],
					iconColor: COLORS.blue['500'],
				}
			case RequestHistoryAction.RETRIEVE:
				return {
					iconSource: ICONS.Reuse,
					backgroundColor: COLORS.yellow['900'],
					iconColor: COLORS.yellow['500'],
				}
			case RequestHistoryAction.CANCEL:
				return {
					iconSource: ICONS.Send,
					backgroundColor: COLORS.blue['900'],
					iconColor: COLORS.blue['500'],
				}
		}
	}

	return (
		<>
			<View className={'w-full flex-row items-center gap-[15px]'}>
				<ActionIcon {...iconMapping()} />
				<View>
					<Text className={'font-opensans-medium text-[18px] text-blue-500'}>{name}</Text>
					<Text>{descriptionMapping()}</Text>
					<View className={'flex-row'}>
						<Text className={'font-opensans-regular text-[14px]'}>{'('}</Text>
						<Text className={'font-opensans-regular text-[14px] text-blue-500'}>{timestamp}</Text>
						<Text className={'font-opensans-regular text-[14px]'}>{')'}</Text>
					</View>
				</View>
			</View>
			<Divider height={0.5} />
		</>
	)
}

const ActionIcon = ({
	iconSource,
	backgroundColor,
	iconColor,
}: {
	iconSource: ImageSourcePropType
	backgroundColor: string
	iconColor: string
}) => {
	return (
		<View
			className={'items-center justify-center rounded-[12px] p-[5px]'}
			style={{ backgroundColor: backgroundColor }}
		>
			<Image
				source={iconSource}
				className={'h-[20px] w-[20px]'}
				resizeMode={'contain'}
				tintColor={iconColor}
			/>
		</View>
	)
}
