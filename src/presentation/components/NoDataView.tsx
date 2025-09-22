import { Image, Text, View } from 'react-native'
import { IMAGES } from '@src/core/shared/constants'

export default function NoDataView() {
	return (
		<View className={'items-center justify-center p-[20px]'}>
			<Image source={IMAGES.NoData} resizeMode={'contain'} className={'h-[150px] w-[150px]'} />
			<Text className={'font-opensans-regular text-gray-600'}>{'Không có dữ liệu'}</Text>
		</View>
	)
}
