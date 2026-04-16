/** Estimates reading time in minutes (200 wpm, minimum 1 min). */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/u).length
  return Math.max(1, Math.round(words / 200))
}
