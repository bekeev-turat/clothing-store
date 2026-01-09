export const currencyFormat = (value: number) => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'KGS',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)
}
