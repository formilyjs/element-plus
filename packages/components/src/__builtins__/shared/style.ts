export function getStyleNumber(value: string | number) {
  const num = Number(value)
  if (isNaN(num)) {
    return value
  } else {
    return `${value}px`
  }
}
