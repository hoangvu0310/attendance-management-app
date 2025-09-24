import {
	FlatList,
	Image,
	LayoutChangeEvent,
	StyleProp,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { COLORS, DIMENSIONS, ICONS } from '@src/core/shared/constants'
import { useEffect, useRef, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type MultiSelectDropdownProps = {
	initialValue?: string[]
	placeholder: string
	withShadow?: boolean
	options: string[]
	onSelect: (value: string | string[]) => void
	valueContainerStyle?: StyleProp<ViewStyle>
	dropdownHeight?: number
	dropdownGap?: number
}

export default function MultiSelectDropdown({
	initialValue,
	placeholder,
	withShadow = true,
	options,
	onSelect,
	valueContainerStyle,
	dropdownHeight = 200,
	dropdownGap = 5,
}: MultiSelectDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [dropdownLayout, setDropdownLayout] = useState({ width: 0, height: 0, x: 0, y: 0 })
	const [isDropdownBottom, setIsDropdownBottom] = useState(true)
	const [selectedValue, setSelectedValue] = useState<string[]>(initialValue || [])
	const [selectedIndexes, setSelectedIndexes] = useState<number[]>([-1])
	const dropdownRef = useRef<View>(null)
	const rotate = useSharedValue('0deg')

	const onDropdownLayout = (e: LayoutChangeEvent) => {
		setDropdownLayout(e.nativeEvent.layout)
		checkDropdownPosition()
	}

	const checkDropdownPosition = () => {
		if (dropdownRef.current) {
			dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
				setIsDropdownBottom(pageY + height < DIMENSIONS.windowHeight)
			})
		}
	}

	const animateIndicatorStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotateZ: rotate.value,
				},
			],
		}
	})

	useEffect(() => {
		if (isDropdownOpen) {
			rotate.value = withTiming('180deg', { duration: 400 })
		} else {
			rotate.value = withTiming('0deg', { duration: 400 })
		}
	}, [isDropdownOpen])

	return (
		<View ref={dropdownRef} onLayout={onDropdownLayout}>
			<TouchableOpacity
				activeOpacity={0.95}
				onPress={() => {
					setIsDropdownOpen(!isDropdownOpen)
				}}
			>
				<View
					className={'flex-row items-center justify-between gap-[20px] rounded-[10px] p-[10px]'}
					style={[
						{
							backgroundColor: COLORS.white,
							...(withShadow && {
								shadowColor: COLORS.gray['100'],
								shadowOffset: {
									width: 0,
									height: 1,
								},
								shadowOpacity: 0.2,
								shadowRadius: 1.41,

								elevation: 2,
							}),
						},
						valueContainerStyle,
					]}
				>
					<Text
						className={`flex-shrink font-opensans-medium text-[14px] ${selectedValue.length > 0 ? 'text-black' : 'text-gray-600'}`}
					>
						{selectedValue.length > 0 ? selectedValue.join(', ') : placeholder}
					</Text>
					<Animated.Image
						source={isDropdownBottom ? ICONS.Down : ICONS.Up}
						className={'h-[12px] w-[12px]'}
						resizeMode={'contain'}
						tintColor={COLORS.blue['500']}
						style={animateIndicatorStyle}
					/>
				</View>
			</TouchableOpacity>

			{isDropdownOpen && (
				<View
					className={'rounded-[10px] bg-white'}
					style={{
						position: 'absolute',
						top: isDropdownBottom ? dropdownLayout.height + dropdownGap : undefined,
						bottom: isDropdownBottom ? undefined : dropdownLayout.height + dropdownGap,
						zIndex: 100,
						width: dropdownLayout.width,
						height:
							options.length < Math.ceil(dropdownHeight / dropdownLayout.height)
								? dropdownLayout.height * options.length
								: dropdownHeight,
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
						renderItem={({ item, index }) => (
							<TouchableOpacity
								className={`flex-row justify-between rounded-[10px] p-[10px]`}
								activeOpacity={0.9}
								onPress={() => {
									onSelect(item)
									if (selectedIndexes.includes(index)) {
										setSelectedIndexes(
											selectedIndexes.filter((selectedIndex) => selectedIndex !== index),
										)
										setSelectedValue(selectedValue.filter((value) => value !== item))
									} else {
										setSelectedValue([...selectedValue, item])
										setSelectedIndexes([...selectedIndexes, index])
									}
								}}
							>
								<Text className={`font-opensans-medium text-[14px]`}>{item}</Text>
								{selectedIndexes.includes(index) && (
									<Image
										source={ICONS.Tick}
										tintColor={COLORS.blue['500']}
										resizeMode={'contain'}
										className={'h-[16px] w-[16px]'}
									/>
								)}
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	)
}
