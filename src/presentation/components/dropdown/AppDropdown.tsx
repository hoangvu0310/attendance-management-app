import { FlatList, Image, LayoutChangeEvent, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, DIMENSIONS, ICONS } from '@src/core/shared/constants'
import { useEffect, useState } from 'react'

type AppDropdownProps = {
	initialValue?: string
	placeholder: string
	options: string[]
	onSelect: (value: string) => void
	valueContainerBackgroundColor?: string
	itemShowNumber?: number
}

export default function AppDropdown({
	initialValue,
	placeholder,
	options,
	onSelect,
	valueContainerBackgroundColor = COLORS.white,
	itemShowNumber = 5,
}: AppDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [dropdownLayout, setDropdownLayout] = useState({ width: 0, height: 0, x: 0, y: 0 })
	const [isDropdownBottom, setIsDropdownBottom] = useState(true)
	const [selectedValue, setSelectedValue] = useState(initialValue)
	const [selectedIndex, setSelectedIndex] = useState(0)

	const onDropdownLayout = (e: LayoutChangeEvent) => {
		setDropdownLayout(e.nativeEvent.layout)
	}

	const getItemLayout = (data: any, index: number) => ({
		length: dropdownLayout.height,
		offset: dropdownLayout.height * index,
		index,
	})

	useEffect(() => {
		const index = options.findIndex((value) => value === selectedValue)
		setSelectedIndex(index)
	}, [selectedValue])

	useEffect(() => {
		// if is in modal, can't get layout => default to bottom
		if (dropdownLayout.x === 0 && dropdownLayout.y === 0) return
		setIsDropdownBottom(dropdownLayout.y + dropdownLayout.height > DIMENSIONS.windowHeight / 2)
	}, [dropdownLayout])

	return (
		<View>
			<TouchableOpacity
				onLayout={onDropdownLayout}
				activeOpacity={0.95}
				onPress={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<View
					className={'relative flex-row items-center gap-[25px] rounded-[10px] p-[10px]'}
					style={{
						backgroundColor: valueContainerBackgroundColor,
						shadowColor: COLORS.gray['100'],
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.2,
						shadowRadius: 1.41,

						elevation: 2,
					}}
				>
					<Text
						className={`font-opensans-medium text-[14px] ${selectedValue ? 'text-black' : 'text-gray-600'}`}
					>
						{selectedValue ? selectedValue : placeholder}
					</Text>
					<Image
						source={
							isDropdownBottom
								? isDropdownOpen
									? ICONS.Up
									: ICONS.Down
								: isDropdownOpen
									? ICONS.Down
									: ICONS.Up
						}
						className={'h-[12px] w-[12px]'}
						resizeMode={'contain'}
						tintColor={COLORS.blue['500']}
					/>
				</View>
			</TouchableOpacity>

			{isDropdownOpen && (
				<View
					className={'rounded-[10px] bg-white'}
					style={{
						position: 'absolute',
						top: isDropdownBottom ? dropdownLayout.height + 5 : undefined,
						bottom: isDropdownBottom ? undefined : dropdownLayout.height + 5,
						zIndex: 100,
						width: dropdownLayout.width,
						height: dropdownLayout.height * itemShowNumber,
						shadowColor: COLORS.gray['100'],
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.2,
						shadowRadius: 1.41,

						elevation: 2,
					}}
				>
					<FlatList
						data={options}
						keyExtractor={(item) => item}
						showsVerticalScrollIndicator={false}
						getItemLayout={getItemLayout}
						initialScrollIndex={
							selectedIndex > Math.floor(itemShowNumber / 2)
								? selectedIndex - Math.floor(itemShowNumber / 2)
								: 0
						}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								className={`rounded-[10px] p-[10px] ${index === selectedIndex ? 'bg-blue-600' : ''}`}
								activeOpacity={0.9}
								onPress={() => {
									setSelectedValue(item)
									setIsDropdownOpen(false)
									onSelect(item)
								}}
							>
								<Text
									className={`font-opensans-medium text-[14px] ${index === selectedIndex ? 'text-white' : ''}`}
								>
									{item}
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	)
}
