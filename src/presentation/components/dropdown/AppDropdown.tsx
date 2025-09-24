import {
	FlatList,
	LayoutChangeEvent,
	StyleProp,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { COLORS, DIMENSIONS, ICONS } from '@src/core/shared/constants'
import { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type AppDropdownProps = {
	initialValue?: string
	placeholder: string
	options: string[]
	withShadow?: boolean
	onSelect: (value: string) => void
	valueContainerStyle?: StyleProp<ViewStyle>
	itemShowNumber?: number
	dropdownGap?: number
}

export default function AppDropdown({
	initialValue,
	placeholder,
	withShadow = true,
	options,
	onSelect,
	valueContainerStyle,
	itemShowNumber = options.length <= 5 ? options.length : 5,
	dropdownGap = 5,
}: AppDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [dropdownLayout, setDropdownLayout] = useState({ width: 0, height: 0, x: 0, y: 0 })
	const [isDropdownBottom, setIsDropdownBottom] = useState(true)
	const [selectedValue, setSelectedValue] = useState(initialValue)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const insets = useSafeAreaInsets()
	const dropdownRef = useRef<View>(null)
	const rotate = useSharedValue('0deg')

	const onDropdownLayout = (e: LayoutChangeEvent) => {
		setDropdownLayout(e.nativeEvent.layout)
		checkDropdownPosition()
	}

	const getItemLayout = (data: any, index: number) => ({
		length: dropdownLayout.height,
		offset: dropdownLayout.height * index,
		index,
	})

	const checkDropdownPosition = () => {
		if (dropdownRef.current) {
			dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
				setIsDropdownBottom(
					pageY + height * (itemShowNumber + 1) < DIMENSIONS.windowHeight - insets.bottom,
				)
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

	useEffect(() => {
		const index = options.findIndex((value) => value === selectedValue)
		setSelectedIndex(index)
	}, [selectedValue])

	return (
		<View ref={dropdownRef}>
			<TouchableOpacity
				activeOpacity={0.95}
				onPress={() => {
					setIsDropdownOpen(!isDropdownOpen)
					checkDropdownPosition()
				}}
			>
				<View
					onLayout={onDropdownLayout}
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
						className={`font-opensans-medium text-[14px] ${selectedValue ? 'text-black' : 'text-gray-600'}`}
					>
						{selectedValue ? selectedValue : placeholder}
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
					className={`rounded-[10px] bg-white`}
					style={{
						position: 'absolute',
						top: isDropdownBottom ? dropdownLayout.height + dropdownGap : undefined,
						bottom: isDropdownBottom ? undefined : dropdownLayout.height + dropdownGap,
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
						nestedScrollEnabled={true}
						getItemLayout={getItemLayout}
						initialScrollIndex={
							selectedIndex > Math.floor(itemShowNumber / 2)
								? selectedIndex - Math.floor(itemShowNumber / 2)
								: 0
						}
						renderItem={({ item, index }) => (
							<DropdownItem
								item={item}
								index={index}
								isDropdownBottom={isDropdownBottom}
								selectedIndex={selectedIndex}
								optionsLength={options.length}
								onPress={() => {
									setSelectedValue(item)
									setIsDropdownOpen(false)
									onSelect(item)
								}}
							/>
						)}
					/>
				</View>
			)}
		</View>
	)
}

const DropdownItem = ({
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
}) => {
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
