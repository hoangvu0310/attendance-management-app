import { View } from 'react-native'

type SpacerProps = {
	width?: number | `${number}%`
	height?: number | `${number}%`
}

export default function Spacer({ width, height }: SpacerProps) {
	return <View style={{ width: width, height: height }} />
}
