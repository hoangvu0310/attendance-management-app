import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, ICONS } from '@src/core/shared/constants'

type TaskMenuItemProps = {
	title: string
	icon: ImageSourcePropType
	onPressItem: () => void
}

export default function TaskMenuItem({ title, icon, onPressItem }: TaskMenuItemProps) {
	return (
		<TouchableOpacity activeOpacity={0.96} onPress={onPressItem}>
			<View
				className={'flex-row items-center justify-between rounded-[15px] bg-white p-[15px]'}
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
				<View className={'flex-row items-center gap-[15px]'}>
					<View className={'rounded-full bg-primary p-[10px]'}>
						<Image
							source={icon}
							resizeMode={'contain'}
							className={'h-[24px] w-[24px]'}
							tintColor={COLORS.white}
						/>
					</View>
					<Text className={'font-opensans-medium text-[16px]'}>{title}</Text>
				</View>
				<Image source={ICONS.RightArrow} resizeMode={'contain'} className={'h-[24px] w-[24px]'} />
			</View>
		</TouchableOpacity>
	)
}
