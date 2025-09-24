import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'
import { ICONS } from '@src/core/shared/constants'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import NoDataView from '@src/presentation/components/NoDataView'
import { FlatList, View } from 'react-native'
import RequestCard from '@src/presentation/components/card/RequestCard'
import Divider from '@src/presentation/components/Divider'
import ModalBottomSheet from '@src/presentation/components/bottomsheet/ModalBottomSheet'
import { useState } from 'react'
import SentRequestSearchForm from '@src/presentation/components/form/SentRequestSearchForm'
import MultiSelectDropdown from '@src/presentation/components/dropdown/MultiSelectDropdown'
import PagingTab from '@src/presentation/components/PagingTab'

export default function NewApproveRequest() {
	const [currentPage, setCurrentPage] = useState(1)
	const [isSearchSheetVisible, setIsSearchSheetVisible] = useState(false)

	const requestsList = Array.from({ length: 5 }, (_) => ({
		name: 'Hoàng',
		duration: '1 ngày',
		issueDate: '09-09-2025',
		reason: 'Lý do cá nhân',
		issueTimesInMonth: 10,
		requestTime: '10:00 09-09-2025',
		status: IssueStatus.APPROVED,
		issueTag: IssueTag.ONSITE,
	}))
	const pagination = {
		totalPage: 10,
		totalItem: 100,
	}

	return (
		<>
			<SafeAreaScreen
				title={'Đơn từ chờ phê duyệt'}
				trailingIcon={ICONS.Search}
				onPressTrailingIcon={() => setIsSearchSheetVisible(true)}
			>
				<View className={'w-[180px] self-end px-[10px] pb-[10px]'}>
					<MultiSelectDropdown
						placeholder={'Trạng thái'}
						options={[IssueStatus.WAIT_FOR_APPROVAL, IssueStatus.WAIT_FOR_CANCEL_APPROVAL]}
						withShadow={false}
						onSelect={() => {}}
						dropdownGap={0}
					/>
					<View className={'px-[10px]'}>
						<Divider marginVertical={0} />
					</View>
				</View>
				{requestsList.length > 0 ? (
					<FlatList
						data={requestsList}
						keyExtractor={(_, index) => index.toString()}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ gap: 20, paddingVertical: 10, paddingHorizontal: 20 }}
						renderItem={({ item, index }) => (
							<RequestCard
								key={index}
								name={item.name}
								issueDate={item.issueDate}
								duration={item.duration}
								reason={item.reason}
								issueTimesInMonth={item.issueTimesInMonth}
								requestTime={item.requestTime}
								status={item.status}
								issueTag={item.issueTag}
								onPressItem={() => {
									// TODO: implement onPress
								}}
							/>
						)}
					/>
				) : (
					<View className={'flex-1 items-center justify-center'}>
						<NoDataView />
					</View>
				)}

				<PagingTab
					currentPage={currentPage}
					totalPage={pagination.totalPage}
					totalItem={pagination.totalItem}
					onPressNext={() => setCurrentPage(currentPage + 1)}
					onPressPrev={() => setCurrentPage(currentPage - 1)}
					onPressFirst={() => setCurrentPage(1)}
					onPressLast={() => setCurrentPage(pagination.totalPage)}
				/>
			</SafeAreaScreen>

			<ModalBottomSheet
				isVisible={isSearchSheetVisible}
				closeBottomSheet={() => setIsSearchSheetVisible(false)}
				title={'Tìm kiếm'}
			>
				<SentRequestSearchForm type={'need-approve'} />
			</ModalBottomSheet>
		</>
	)
}
