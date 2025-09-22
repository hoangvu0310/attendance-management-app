import { FlatList } from 'react-native'
import { ICONS } from '@src/core/shared/constants'
import RequestCard from '@src/presentation/components/card/RequestCard'
import PagingTab from '@src/presentation/components/PagingTab'
import { useState } from 'react'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'

export default function ApprovedRequest() {
	const [currentPage, setCurrentPage] = useState(1)

	// Mock data
	const requestsList = Array.from({ length: 20 }, (_, index) => ({
		name: 'Hoàng',
		duration: '1 ngày',
		issueDate: '09-09-2025',
		reason: 'Lý do cá nhân',
		issueTimesInMonth: 10,
		requestTime: '10:00 09-09-2025',
		status: IssueStatus.APPROVED,
		issueTag: IssueTag.DISMISS,
	}))

	const pagination = {
		totalPage: 10,
		totalItem: 100,
	}

	const onPressSearch = () => {}

	return (
		<SafeAreaScreen
			title={'Đơn từ đã duyệt'}
			trailingIcon={ICONS.Search}
			onPressTrailingIcon={onPressSearch}
		>
			<FlatList
				data={requestsList}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: 20, paddingVertical: 5, paddingHorizontal: 20 }}
				// refreshing={true}
				// onRefresh={() => setCurrentPage(1)}
				renderItem={({ item, index }) => {
					return (
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
						/>
					)
				}}
			/>

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
	)
}
