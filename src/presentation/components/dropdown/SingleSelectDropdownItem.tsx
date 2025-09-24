import { Text, TouchableOpacity } from 'react-native'

export default function SingleSelectDropdownItem({
	item,
	index,
	isDropdownBottom,
	selectedIndex,
	optionsLength,
	onPress,
}: {
	item: string
	index: number
	isDropdownBottom: boolean
	selectedIndex: number
	optionsLength: number
	onPress: () => void
}) {
	return (
		<TouchableOpacity
			className={`p-[10px] ${index === 0 && !isDropdownBottom ? 'rounded-t-[10px]' : ''} ${index === optionsLength && isDropdownBottom ? 'rounded-b-[10px]' : ''} ${index === selectedIndex ? 'bg-blue-600' : ''}`}
			activeOpacity={0.9}
			onPress={onPress}
		>
			<Text
				className={`font-opensans-medium text-[14px] ${index === selectedIndex ? 'text-white' : ''}`}
			>
				{item}
			</Text>
		</TouchableOpacity>
	)
}
