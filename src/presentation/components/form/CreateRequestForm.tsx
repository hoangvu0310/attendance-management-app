import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { useState } from 'react'
import FormComponent from '@src/presentation/components/form/FormComponent'
import AppDropdown from '@src/presentation/components/dropdown/AppDropdown'
import { decapitalize } from '@src/core/shared/utils/string'
import { COLORS } from '@src/core/shared/constants'
import CheckButton from '@src/presentation/components/buttons/CheckButton'
import RadioButton from '@src/presentation/components/buttons/RadioButton'
import DatePickButton from '@src/presentation/components/buttons/DatePickButton'
import { daysGap, toDateString } from '@src/core/shared/utils/date'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DismissPeriodInDay, IssueTag } from '@src/core/shared/constants/enum'
import AppTextfield from '@src/presentation/components/textfield/AppTextfield'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import ConfirmModal from '@src/presentation/components/modal/ConfirmModal'
import { useRouter } from 'expo-router'

type CreateRequestFormProps = {
	type?: IssueTag
}

export default function CreateRequestForm({ type }: CreateRequestFormProps) {
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
	const [dateIsSelectingType, setDateIsSelectingType] = useState<'from' | 'to' | undefined>(
		undefined,
	)
	const [checkButtonState, setCheckButtonState] = useState({ late: false, early: false })
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
	const [confirmModalType, setConfirmModalType] = useState<'cancel' | 'send' | undefined>(undefined)
	const router = useRouter()

	const timeInDayOptions = Object.values(DismissPeriodInDay)

	const createRequestSchema = z.object({
		requestType: z.enum(IssueTag),
		timeInDay: z.enum(timeInDayOptions),
		fromDate: z.date(),
		toDate: z.date(),
		duration: z.string(),
		reason: z.string(),
		requestHandler: z.string(),
	})

	const createRequestForm = useForm<z.infer<typeof createRequestSchema>>({
		resolver: zodResolver(createRequestSchema),
		defaultValues: {
			requestType: type || undefined,
			timeInDay: undefined,
			fromDate: new Date(),
			toDate: undefined,
			duration: '',
			reason: '',
			requestHandler: undefined,
		},
	})
	const formValues = createRequestForm.watch()

	const isLateOrEarly =
		formValues.requestType === IssueTag.LATE_AND_LEAVE_EARLY ||
		formValues.requestType === IssueTag.LATE ||
		formValues.requestType === IssueTag.LEAVE_EARLY
	const hasRequestType = formValues.requestType !== undefined
	const isModalTypeCancel = confirmModalType === 'cancel'
	const canSendRequest = hasRequestType
		? isLateOrEarly
			? formValues.fromDate &&
				formValues.duration &&
				formValues.reason &&
				formValues.requestHandler &&
				(checkButtonState.late || checkButtonState.early)
			: formValues.timeInDay &&
				formValues.fromDate &&
				formValues.toDate &&
				formValues.reason &&
				formValues.requestHandler
		: false

	const handlers = ['Nguyễn Mạnh Duy', 'Nguyễn Kim Anh']
	const requestTypes = Object.values(IssueTag).filter(
		(type) => type !== IssueTag.ALL && type !== IssueTag.LEAVE_EARLY && type !== IssueTag.LATE,
	)

	const toggleCheckButton = (key: 'late' | 'early') => {
		setCheckButtonState((prevState) => {
			const nextState = {
				...prevState,
				[key]: !prevState[key],
			}

			if (nextState.late && nextState.early) {
				createRequestForm.setValue('requestType', IssueTag.LATE_AND_LEAVE_EARLY)
			} else if (nextState.late) {
				createRequestForm.setValue('requestType', IssueTag.LATE)
			} else if (nextState.early) {
				createRequestForm.setValue('requestType', IssueTag.LEAVE_EARLY)
			} else {
				createRequestForm.setValue('requestType', IssueTag.LATE_AND_LEAVE_EARLY)
			}

			return nextState
		})
	}

	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className={'flex-1'}
			>
				<ScrollView
					nestedScrollEnabled={true}
					showsVerticalScrollIndicator={false}
					className={'h-full'}
					keyboardShouldPersistTaps={'handled'}
				>
					<View className={'flex-1 gap-[15px] px-[20px]'}>
						{hasRequestType && (
							<Text className={'font-opensans-regular text-[13px]'}>
								{'Số lần xin phép ' +
									decapitalize(formValues.requestType) +
									' trong tháng: ' +
									1 +
									' ngày'}
							</Text>
						)}
						<FormComponent label={'Loại đơn'} required={true}>
							<AppDropdown
								placeholder={'Chọn loại đơn'}
								initialValue={type}
								options={requestTypes}
								withShadow={false}
								onSelect={(value) => {
									createRequestForm.setValue('requestType', value as IssueTag)
								}}
								valueContainerStyle={{ backgroundColor: COLORS.blue['900'] }}
							/>
						</FormComponent>
						{isLateOrEarly ? (
							<View className={'flex-row items-center justify-around'}>
								<CheckButton
									label={IssueTag.LATE}
									initialValue={checkButtonState.late}
									onCheck={() => toggleCheckButton('late')}
									onUncheck={() => toggleCheckButton('late')}
								/>
								<CheckButton
									label={IssueTag.LEAVE_EARLY}
									initialValue={checkButtonState.early}
									onCheck={() => toggleCheckButton('early')}
									onUncheck={() => toggleCheckButton('early')}
								/>
							</View>
						) : (
							hasRequestType && (
								<View className={'flex-row justify-around'}>
									{timeInDayOptions.map((option) => (
										<RadioButton
											key={option}
											label={option}
											selected={formValues.timeInDay === option}
											onPress={() => createRequestForm.setValue('timeInDay', option)}
										/>
									))}
								</View>
							)
						)}
						<FormComponent
							label={isLateOrEarly ? 'Ngày' : 'Từ ngày'}
							required={true}
							containerStyle={{ width: '100%' }}
						>
							<DatePickButton
								onPress={() => {
									setIsDatePickerVisible(true)
									setDateIsSelectingType('from')
								}}
								date={toDateString(formValues.fromDate)}
							/>
						</FormComponent>
						{!isLateOrEarly && (
							<FormComponent label={'Đến ngày'} required={true} containerStyle={{ width: '100%' }}>
								<DatePickButton
									onPress={() => {
										setIsDatePickerVisible(true)
										setDateIsSelectingType('to')
									}}
									date={formValues.toDate ? toDateString(formValues.toDate) : undefined}
								/>
							</FormComponent>
						)}

						{hasRequestType &&
							(isLateOrEarly ? (
								<>
									<FormComponent label={'Thời gian'}>
										<Controller
											control={createRequestForm.control}
											name={'duration'}
											render={({ field: { value, onChange } }) => (
												<AppTextfield
													keyboardType={'numeric'}
													value={value}
													onChangeText={(text) => {
														const num = parseInt(text)
														if (num > 180) {
															onChange('180')
														} else {
															onChange(text)
														}
													}}
													trailingComponent={
														<Text className={'font-opensans-medium text-[14px]'}>{'Phút'}</Text>
													}
												/>
											)}
										/>
									</FormComponent>
								</>
							) : (
								<>
									<FormComponent label={'Số ngày'} containerStyle={{ width: '100%' }}>
										<View className={'rounded-[10px] bg-blue-900 p-[10px]'}>
											<Text>
												{(formValues.toDate
													? daysGap(formValues.fromDate, formValues.toDate) +
														1 -
														(formValues.timeInDay === DismissPeriodInDay.MORNING ||
														formValues.timeInDay === DismissPeriodInDay.AFTERNOON
															? 0.5
															: 0)
													: '0') + ' ngày'}
											</Text>
										</View>
									</FormComponent>
								</>
							))}

						{hasRequestType && (
							<>
								<FormComponent label={'Ghi chú'} required={true}>
									<Controller
										control={createRequestForm.control}
										name={'reason'}
										render={({ field: { value, onChange } }) => (
											<AppTextfield
												placeholder={'Nhập Lý do/ Tên KH, đơn vị, địa điểm'}
												value={value}
												onChangeText={(text) => onChange(text)}
											/>
										)}
									/>
								</FormComponent>

								<FormComponent label={'Người xử lý'} required={true}>
									<AppDropdown
										placeholder={'Chọn người xử lý'}
										withShadow={false}
										options={handlers}
										onSelect={(handler) => {
											createRequestForm.setValue('requestHandler', handler)
										}}
										valueContainerStyle={{ backgroundColor: COLORS.blue['900'] }}
									/>
								</FormComponent>
							</>
						)}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<View
				className={'w-full flex-row gap-[20px] px-[20px]'}
				style={{
					opacity: canSendRequest ? 1 : 0.6,
				}}
			>
				<FilledTextButton
					label={'Hủy'}
					onPress={() => {
						setConfirmModalType('cancel')
						setIsConfirmModalVisible(true)
					}}
					buttonStyle={{ flex: 1, backgroundColor: COLORS.blue['900'] }}
					textStyle={{ color: COLORS.black }}
				/>
				<FilledTextButton
					label={'Gửi'}
					onPress={() => {
						setConfirmModalType('send')
						setIsConfirmModalVisible(true)
					}}
					buttonStyle={{ flex: 1 }}
				/>
			</View>

			<DateTimePicker
				date={
					dateIsSelectingType === 'from'
						? formValues.fromDate
						: formValues.toDate || formValues.fromDate
				}
				isVisible={isDatePickerVisible}
				onConfirm={(date) => {
					if (dateIsSelectingType === 'from') {
						createRequestForm.setValue('fromDate', date)
					} else {
						createRequestForm.setValue('toDate', date)
					}
					setIsDatePickerVisible(false)
				}}
				onCancel={() => setIsDatePickerVisible(false)}
				minimumDate={formValues.fromDate}
			/>

			<ConfirmModal
				onConfirm={() => {
					if (isModalTypeCancel) {
						// TODO: implement save request
					} else {
						// TODO: implement send request
					}
				}}
				onCancel={() => {
					if (isModalTypeCancel) {
						router.back()
					} else {
						setIsConfirmModalVisible(false)
					}
				}}
				closeModal={() => setIsConfirmModalVisible(false)}
				isVisible={isConfirmModalVisible}
				cancelText={'Hủy'}
				confirmText={'Đồng ý'}
				confirmationText={
					isModalTypeCancel
						? 'Bạn có muốn lưu nháp đơn từ này không?'
						: 'Bạn có muốn thêm mới đơn từ này không?'
				}
			/>
		</>
	)
}
