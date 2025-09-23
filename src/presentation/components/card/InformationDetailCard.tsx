import { Text, View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'
import Divider from '@src/presentation/components/Divider'

type InformationDetailCardProps = {
	data: { label: string; value: string | number }[]
}

export default function InformationDetailCard({ data }: InformationDetailCardProps) {
	return (
		<View
			className={'rounded-[15px] bg-white px-[15px] py-[25px]'}
			style={{
				shadowColor: COLORS.gray['100'],
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.23,
				shadowRadius: 2.62,

				elevation: 4,
			}}
		>
			{data.map((item, index) => (
				<View key={item.label}>
					<View className={'flex-row justify-between'}>
						<Text className={'font-opensans-regular text-[14px] text-gray-500'}>{item.label}</Text>
						<Text className={'max-w-[50%] text-right font-opensans-regular text-[14px]'}>
							{item.value}
						</Text>
					</View>
					{index < data.length - 1 && <Divider marginVertical={15} />}
				</View>
			))}
		</View>
	)
}
