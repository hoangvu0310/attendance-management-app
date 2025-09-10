import { View } from 'react-native'
import { COLORS } from '@src/core/shared/constants'

type DividerProps = {
	height?: number
	color?: string
	marginVertical?: number
}

export default function Divider({
	height = 1,
	color = COLORS.gray['900'],
	marginVertical = 10,
}: DividerProps) {
	return (
		<View
			className={'w-full'}
			style={{ height: height, backgroundColor: color, marginVertical: marginVertical }}
		/>
	)
}
