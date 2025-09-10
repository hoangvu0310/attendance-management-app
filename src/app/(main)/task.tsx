import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, ICONS } from '@src/core/shared/constants'
import TaskMenuItem from '@src/presentation/components/TaskMenuItem'
import { useRouter } from 'expo-router'

export default function Task() {
	const router = useRouter()

	return (
		<View className={'flex-1 items-center bg-white'}>
			<LinearGradient
				className={'absolute top-0 h-1/4 w-full'}
				colors={[COLORS.blue['500'], COLORS.blue['700'], COLORS.blue['900']]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			/>
			<View className={'w-full flex-1 items-center justify-end gap-[20px]'}>
				<View className={'w-full items-start px-[20px]'}>
					<Text className={'text-start font-opensans-bold text-[28px] text-white'}>{'Tác vụ'}</Text>
				</View>
				<View className={'h-4/5 w-full gap-[20px] rounded-t-[30px] bg-white px-[20px] pt-[20px]'}>
					<TaskMenuItem title={'Lịch sử chấm công'} icon={ICONS.Timer} onPressItem={() => {}} />
					<TaskMenuItem title={'Đơn từ của bạn'} icon={ICONS.Document} onPressItem={() => {}} />
					<TaskMenuItem
						title={'Đơn từ chờ phê duyệt'}
						icon={ICONS.DocumentCheck}
						onPressItem={() => {}}
					/>
					<TaskMenuItem
						title={'Đơn từ đã duyệt'}
						icon={ICONS.DocumentCheck}
						onPressItem={() => router.push('/(tasks)/approved-request')}
					/>
				</View>
			</View>
		</View>
	)
}
