import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import FormComponent from '@src/presentation/components/form/FormComponent'
import AppDropdown from '@src/presentation/components/dropdown/AppDropdown'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import { COLORS } from '@src/core/shared/constants'
import AppTextfield from '@src/presentation/components/textfield/AppTextfield'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { useState } from 'react'
import DatePickButton from '@src/presentation/components/buttons/DatePickButton'
import { toDateString } from '@src/core/shared/utils/date'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DropdownWithSearch from '@src/presentation/components/dropdown/DropdownWithSearch'

type SentRequestSearchFormProps = {
	type: 'need-approve' | 'approved'
}

export default function SentRequestSearchForm({ type }: SentRequestSearchFormProps) {
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
	const [dateIsSelectingType, setDateIsSelectingType] = useState('')

	const statusOptions =
		type === 'need-approve'
			? Object.entries(IssueStatus)
					.filter(([key]) => key.includes('WAIT'))
					.map(([, value]) => value)
			: Object.entries(IssueStatus)
					.filter(([key]) => key.includes('APPROVED') || key.includes('DENIED'))
					.map(([, value]) => value)
	const departmentOptions = ['Phòng phần mềm 2', 'Phòng BIGDATA', 'Đơn vị test lương']

	const sentRequestSearchSchema = z.object({
		requestType: z.enum(IssueTag),
		department: z.string(),
		status: z.enum(statusOptions),
		employeeSearchParams: z.string(),
		fromDate: z.date(),
		toDate: z.date(),
	})
	const sentRequestSearchForm = useForm<z.infer<typeof sentRequestSearchSchema>>({
		resolver: zodResolver(sentRequestSearchSchema),
		defaultValues: {
			requestType: undefined,
			department: undefined,
			status: undefined,
			employeeSearchParams: '',
			fromDate: undefined,
			toDate: new Date(),
		},
	})
	const formValues = sentRequestSearchForm.watch()

	return (
		<>
			<KeyboardAvoidingView
				className={'flex-1'}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={30}
			>
				<ScrollView
					className={'flex-1'}
					nestedScrollEnabled={true}
					keyboardShouldPersistTaps={'handled'}
				>
					<View className={'gap-[15px] px-[20px]'}>
						{type === 'need-approve' && (
							<FormComponent label={'Loại đơn từ'}>
								<AppDropdown
									options={Object.values(IssueTag)}
									placeholder={'Loại đơn từ'}
									withShadow={false}
									onSelect={() => {}}
									valueContainerStyle={{ backgroundColor: COLORS.blue['900'] }}
								/>
							</FormComponent>
						)}

						<FormComponent label={'Đơn vị'}>
							<DropdownWithSearch
								options={departmentOptions}
								placeholder={'Chọn đơn vị'}
								withShadow={false}
								onSelect={() => {}}
								valueContainerStyle={{ backgroundColor: COLORS.blue['900'] }}
							/>
						</FormComponent>

						<FormComponent label={'Trạng thái'}>
							<AppDropdown
								options={statusOptions}
								placeholder={'Trạng thái'}
								withShadow={false}
								onSelect={() => {}}
								valueContainerStyle={{ backgroundColor: COLORS.blue['900'] }}
							/>
						</FormComponent>

						<FormComponent label={'Họ tên/Mã nhân viên'}>
							<AppTextfield placeholder={'Nhập họ tên nhân viên/ mã nhân viên'} />
						</FormComponent>

						<View className={'flex-row gap-[15px] pb-[15px]'}>
							<FormComponent label={'Từ ngày'} containerStyle={{ flex: 1 }}>
								<DatePickButton
									onPress={() => {
										setIsDatePickerVisible(true)
										setDateIsSelectingType('from')
									}}
									date={formValues.fromDate ? toDateString(formValues.fromDate) : undefined}
								/>
							</FormComponent>
							<FormComponent label={'Đến ngày'} containerStyle={{ flex: 1 }}>
								<DatePickButton
									onPress={() => {
										setIsDatePickerVisible(true)
										setDateIsSelectingType('to')
									}}
									date={toDateString(formValues.toDate)}
								/>
							</FormComponent>
						</View>

						<FilledTextButton label={'Tìm kiếm'} onPress={() => {}} />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<DateTimePicker
				date={dateIsSelectingType === 'from' ? formValues.fromDate : formValues.toDate}
				isVisible={isDatePickerVisible}
				onConfirm={(date) => {
					if (dateIsSelectingType === 'from') {
						sentRequestSearchForm.setValue('fromDate', date)
					} else {
						sentRequestSearchForm.setValue('toDate', date)
					}
					setIsDatePickerVisible(false)
				}}
				onCancel={() => setIsDatePickerVisible(false)}
				maximumDate={formValues.toDate ? formValues.toDate : new Date()}
			/>
		</>
	)
}
