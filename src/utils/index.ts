export function logPerformance(label: string, func: () => void) {
  console.time(`  ${label}`)
  func()
  console.timeEnd(`  ${label}`)
}
