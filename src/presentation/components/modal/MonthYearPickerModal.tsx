import { Text, View } from 'react-native'
import AppModal from '@src/presentation/components/modal/AppModal'
import { useState } from 'react'
import AppDropdown from '@src/presentation/components/dropdown/AppDropdown'
import OutlinedTextButton from '@src/presentation/components/buttons/OutlinedTextButton'
import FilledTextButton from '@src/presentation/components/buttons/FilledTextButton'
import { parseMonthFromString, parseYearFromString } from '@src/core/shared/utils/date'

type MonthPickerModalProps = {
	isVisible: boolean
	closeModal: () => void
	currentMonth: number
	currentYear: number
	minimumYear?: number
	maximumYear?: number
	onSelectMonth: (month: number, year: number) => void
}

export default function MonthYearPickerModal({
	isVisible,
	closeModal,
	currentMonth,
	currentYear,
	minimumYear = currentYear - 5,
	maximumYear = currentYear + 5,
	onSelectMonth,
}: MonthPickerModalProps) {
	const monthList = Array.from({ length: 12 }, (_, index) => 'Tháng ' + (index + 1))
	const yearList = Array.from({ length: maximumYear - minimumYear + 1 }, (_, index) =>
		(minimumYear + index).toString(),
	)

	const [selectedMonth, setSelectedMonth] = useState(currentMonth)
	const [selectedYear, setSelectedYear] = useState(currentYear)

	return (
		<AppModal isVisible={isVisible} closeModal={closeModal}>
			<View className={'w-[`75%`] items-center rounded-xl bg-white p-[20px]'}>
				<Text className={'font-opensans-bold text-[16px] text-blue-400'}>{'Chọn tháng'}</Text>
				<View className={'flex-row items-center justify-center gap-[10px] pb-[30px] pt-[10px]'}>
					<AppDropdown
						initialValue={'Tháng ' + currentMonth}
						placeholder={'Chọn tháng'}
						options={monthList}
						onSelect={(value) => setSelectedMonth(parseMonthFromString(value))}
					/>
					<Text className={'font-opensans-medium text-[14px]'}>{'/'}</Text>
					<AppDropdown
						initialValue={currentYear.toString()}
						placeholder={'Chọn năm'}
						options={yearList}
						onSelect={(value) => setSelectedYear(parseYearFromString(value))}
					/>
				</View>

				<View className={'w-full flex-row items-center justify-center gap-[20px]'}>
					<OutlinedTextButton label={'Hủy'} onPress={closeModal} buttonStyle={{ width: '40%' }} />
					<FilledTextButton
						label={'Xác nhận'}
						onPress={() => {
							onSelectMonth(selectedMonth, selectedYear)
							closeModal()
						}}
						buttonStyle={{ width: '40%' }}
					/>
				</View>
			</View>
		</AppModal>
	)
}
