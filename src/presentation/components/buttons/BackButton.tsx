import { ICONS } from '@src/core/shared/constants'
import { useRouter } from 'expo-router'
import IconButton from '@src/presentation/components/buttons/IconButton'

export default function BackButton() {
	const router = useRouter()
	return <IconButton iconSource={ICONS.Back} onPressIcon={() => router.back()} />
}
