export const toShortMonthString = (date: Date) => {
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	if (month < 10) return `0${month}/${year}`
	return `${month}/${year}`
}

export const parseMonthFromString = (month: string) => parseInt(month.split(' ')[1])

export const parseYearFromString = (year: string) => parseInt(year)

export const getFirstDateInMonth = (date: Date): Date => {
	return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const getLastDateInMonth = (date: Date): Date => {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const getDaysInMonth = (date: Date): number => {
	return getLastDateInMonth(date).getDate()
}

export const getFirstWeekDay = (date: Date) => {
	return getFirstDateInMonth(date).getDay()
}

export const isSameDate = (date1: Date, date2: Date): boolean => {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	)
}
