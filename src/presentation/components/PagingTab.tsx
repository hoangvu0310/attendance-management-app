import { Text, View } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'
import IconButton from '@src/presentation/components/buttons/IconButton'

type PagingTabProps = {
	currentPage: number
	totalPage: number
	totalItem: number
	onPressNext: () => void
	onPressPrev: () => void
	onPressFirst: () => void
	onPressLast: () => void
}

export default function PagingTab({
	currentPage,
	totalPage,
	totalItem,
	onPressNext,
	onPressPrev,
	onPressFirst,
	onPressLast,
}: PagingTabProps) {
	const isFirstPage = currentPage === 1
	const isLastPage = currentPage === totalPage

	return (
		<View
			className={'flex-row items-center justify-between bg-white px-[20px] py-[30px]'}
			style={{
				shadowColor: COLORS.gray['200'],
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
		>
			<View className={'flex-row items-center'}>
				<Text className={'font-opensans-medium text-[14px]'}>{'Số bản ghi: '}</Text>
				<Text className={'font-opensans-medium text-[14px] text-blue-400'}>{totalItem}</Text>
			</View>
			<View className={'flex-row items-center gap-[5px]'}>
				<IconButton
					iconSource={ICONS.First}
					onPressIcon={onPressFirst}
					color={isFirstPage ? COLORS.gray['400'] : COLORS.blue['500']}
					disabled={isFirstPage}
				/>
				<IconButton
					iconSource={ICONS.Previous}
					onPressIcon={onPressPrev}
					color={isFirstPage ? COLORS.gray['400'] : COLORS.blue['500']}
					disabled={isFirstPage}
				/>
				<Text>{'Trang'}</Text>
				<View className={'rounded-[5px] bg-gray-900 px-[10px] py-[5px] text-center'}>
					<Text className={'font-opensans-medium text-[14px]'}>{currentPage}</Text>
				</View>
				<Text>{'của ' + totalPage}</Text>
				<IconButton
					iconSource={ICONS.Next}
					onPressIcon={onPressNext}
					color={isLastPage ? COLORS.gray['400'] : COLORS.blue['500']}
					disabled={isLastPage}
				/>
				<IconButton
					iconSource={ICONS.Last}
					onPressIcon={onPressLast}
					color={isLastPage ? COLORS.gray['400'] : COLORS.blue['500']}
					disabled={isLastPage}
				/>
			</View>
		</View>
	)
}
