export const toShortMonthString = (date: Date) => {
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	if (month < 10) return `0${month}/${year}`
	return `${month}/${year}`
}

export const parseMonthFromString = (month: string) => parseInt(month.split(' ')[1])

export const parseYearFromString = (year: string) => parseInt(year)
