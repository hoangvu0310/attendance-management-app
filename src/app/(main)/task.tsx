import { Text, View } from 'react-native'
import { ICONS } from '@src/core/shared/constants'
import TaskMenuItem from '@src/presentation/components/TaskMenuItem'
import { useRouter } from 'expo-router'
import LinearBackground from '@src/presentation/components/LinearBackground'
import MainTabContentView from '@src/presentation/components/MainTabContentView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spacer from '@src/presentation/components/Spacer'

export default function Task() {
	const router = useRouter()
	const inset = useSafeAreaInsets()

	return (
		<LinearBackground>
			<View className={'gap-[10px] px-[20px] pb-[10px]'}>
				<Spacer height={inset.top} />
				<Text className={'text-start font-opensans-bold text-[28px] text-white'}>{'Tác vụ'}</Text>
			</View>
			<Spacer height={10} />
			<MainTabContentView>
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
			</MainTabContentView>
		</LinearBackground>
	)
}
