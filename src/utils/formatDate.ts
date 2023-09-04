const intl = new Intl.DateTimeFormat('en-GB')
export function formatDate(date: Date) {
  return intl.format(date)
}
