export function optionalText(value?: string): string | undefined {
  const normalizedValue = value?.trim()

  return normalizedValue || undefined
}
