import { View } from 'react-native'
import FormComponent from '@src/presentation/components/form/FormComponent'
import AppDropdown from '@src/presentation/components/dropdown/AppDropdown'
import { IssueStatus } from '@src/core/shared/constants/enum'
import { COLORS } from '@src/core/shared/constants'
import { useState } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DatePickButton from '@src/presentation/components/buttons/DatePickButton'
import { toDateString } from '@src/core/shared/utils/date'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type OwnRequestSearchFormProps = {
	onSearchFinished: () => void
}

export default function OwnRequestSearchForm({ onSearchFinished }: OwnRequestSearchFormProps) {
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
	const [dateIsSelectingType, setDateIsSelectingType] = useState('')

	const statusOptions = Object.values(IssueStatus)

	const ownRequestSearchSchema = z.object({
		status: z.enum(statusOptions),
		fromDate: z.date(),
		toDate: z.date(),
	})

	const ownRequestSearchForm = useForm<z.infer<typeof ownRequestSearchSchema>>({
		resolver: zodResolver(ownRequestSearchSchema),
		defaultValues: {
			status: IssueStatus.ALL,
			fromDate: new Date(),
			toDate: new Date(),
		},
	})

	const formValues = ownRequestSearchForm.watch()

	// TODO: implement search own request
	const searchOwnRequest = () => {}

	return (
		<>
			<View className={'gap-[20px] px-[20px]'}>
				<Controller
					control={ownRequestSearchForm.control}
					name={'status'}
					render={({ field: { onChange } }) => (
						<FormComponent label={'Trạng thái'}>
							<AppDropdown
								valueContainerStyle={{
									backgroundColor: COLORS.blue['900'],
								}}
								initialValue={IssueStatus.ALL}
								withShadow={false}
								placeholder={'Chọn trạng thái'}
								options={statusOptions}
								onSelect={(value) => onChange(value)}
							/>
						</FormComponent>
					)}
				/>

				<View className={'flex-row gap-[15px]'}>
					<FormComponent label={'Từ ngày'}>
						<DatePickButton
							onPress={() => {
								setIsDatePickerVisible(true)
								setDateIsSelectingType('from')
							}}
							date={toDateString(formValues.fromDate)}
						/>
					</FormComponent>
					<FormComponent label={'Đến ngày'}>
						<DatePickButton
							onPress={() => {
								setIsDatePickerVisible(true)
								setDateIsSelectingType('to')
							}}
							date={toDateString(formValues.toDate)}
						/>
					</FormComponent>
				</View>

				<FilledTextButton
					label={'Tìm kiếm'}
					onPress={() => {
						ownRequestSearchForm.handleSubmit(searchOwnRequest)()
						onSearchFinished()
					}}
				/>
			</View>

			<DateTimePicker
				date={dateIsSelectingType === 'from' ? formValues.fromDate : formValues.toDate}
				isVisible={isDatePickerVisible}
				onConfirm={(date) => {
					if (dateIsSelectingType === 'from') {
						ownRequestSearchForm.setValue('fromDate', date)
					} else {
						ownRequestSearchForm.setValue('toDate', date)
					}
					setIsDatePickerVisible(false)
				}}
				onCancel={() => setIsDatePickerVisible(false)}
				maximumDate={new Date()}
			/>
		</>
	)
}
