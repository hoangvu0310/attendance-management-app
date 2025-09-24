import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'
import { useState } from 'react'
import PagingTab from '@src/presentation/components/PagingTab'
import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import RequestCard from '@src/presentation/components/card/RequestCard'
import NoDataView from '@src/presentation/components/NoDataView'
import Spacer from '@src/presentation/components/Spacer'
import { useRouter } from 'expo-router'
import ConfirmModal from '@src/presentation/components/modal/ConfirmModal'
import MultiSelectDropdown from '@src/presentation/components/dropdown/MultiSelectDropdown'
import OwnRequestSearchForm from '@src/presentation/components/form/OwnRequestSearchForm'
import ModalBottomSheet from '@src/presentation/components/bottomsheet/ModalBottomSheet'

export default function YourRequest() {
	const [currentPage, setCurrentPage] = useState(1)
	const [isDeleteRequestModalVisible, setIsDeleteRequestModalVisible] = useState(false)
	const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
	const router = useRouter()
	const [selectedRequest, setSelectedRequest] = useState(null)

	// Mock data
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

	const requestTypes = Object.values(IssueTag)

	return (
		<>
			<SafeAreaScreen
				title={'Đơn từ của bạn'}
				trailingIcon={ICONS.Search}
				onPressTrailingIcon={() => {
					setIsSearchModalVisible(true)
				}}
			>
				<View className={'px-[20px]'}>
					<MultiSelectDropdown
						placeholder={'Chọn loại đơn'}
						options={requestTypes}
						valueContainerStyle={{
							backgroundColor: COLORS.gray['900'],
						}}
						onSelect={() => {}}
					/>
				</View>

				<Spacer height={20} />

				{requestsList && requestsList.length > 0 ? (
					<>
						<View className={'flex-1'}>
							<FlatList
								data={requestsList}
								keyExtractor={(_, index) => index.toString()}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ gap: 20, paddingVertical: 10, paddingHorizontal: 20 }}
								// refreshing={true}
								// onRefresh={() => setCurrentPage(1)}
								renderItem={({ item, index }) => {
									return (
										<RequestCard
											key={index}
											name={undefined}
											issueDate={item.issueDate}
											duration={item.duration}
											reason={item.reason}
											issueTimesInMonth={item.issueTimesInMonth}
											requestTime={item.requestTime}
											status={item.status}
											issueTag={item.issueTag}
											onPressDelete={() => {
												setIsDeleteRequestModalVisible(true)
												// setSelectedRequest(item)
											}}
											onPressItem={() =>
												router.push({
													pathname: '/(tasks)/request-detail',
													params: { request: JSON.stringify(item) },
												})
											}
										/>
									)
								}}
							/>

							<TouchableOpacity
								activeOpacity={0.9}
								onPress={() => router.push('/(tasks)/create-request')}
								className={'absolute bottom-[15px] right-[25px] rounded-full bg-primary p-[20px]'}
								style={{
									shadowColor: COLORS.gray['100'],
									shadowOffset: {
										width: 0,
										height: 2,
									},
									shadowOpacity: 0.25,
									shadowRadius: 3.84,

									elevation: 5,
								}}
							>
								<Image
									source={ICONS.Plus}
									tintColor={COLORS.white}
									resizeMode={'contain'}
									className={'h-[20px] w-[20px]'}
								/>
							</TouchableOpacity>
						</View>

						<PagingTab
							currentPage={currentPage}
							totalPage={pagination.totalPage}
							totalItem={pagination.totalItem}
							onPressNext={() => setCurrentPage(currentPage + 1)}
							onPressPrev={() => setCurrentPage(currentPage - 1)}
							onPressFirst={() => setCurrentPage(1)}
							onPressLast={() => setCurrentPage(pagination.totalPage)}
						/>
					</>
				) : (
					<View className={'flex-1 items-center justify-center'}>
						<NoDataView />
					</View>
				)}
			</SafeAreaScreen>

			<ConfirmModal
				confirmationText={'Bạn có chắc chắn muốn xóa đơn từ này không?'}
				onConfirm={() => {
					setIsDeleteRequestModalVisible(false)
				}}
				onCancel={() => {
					setIsDeleteRequestModalVisible(false)
				}}
				isVisible={isDeleteRequestModalVisible}
			/>

			<ModalBottomSheet
				isVisible={isSearchModalVisible}
				closeBottomSheet={() => setIsSearchModalVisible(false)}
				title={'Tìm kiếm'}
			>
				<OwnRequestSearchForm onSearchFinished={() => setIsSearchModalVisible(false)} />
			</ModalBottomSheet>
		</>
	)
}
