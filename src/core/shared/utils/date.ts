// date -> ex: 09/2025
export const toShortMonthString = (date: Date) => {
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	if (month < 10) return `0${month}/${year}`
	return `${month}/${year}`
}

// date -> ex: 09/09/2025
export const toDateString = (date: Date) => {
	return `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}/${
		date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
	}/${date.getFullYear()}`
}

export const parseDateFromString = (date: string) => {
	const [day, month, year] = date.split('/')
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

// ex: 09/2025 -> 9
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
