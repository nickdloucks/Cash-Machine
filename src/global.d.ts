/// <reference types="svelte" />

interface TillStatus {
  status: string, // till status: open, closed, or error
  change: Array<[string, number]> | null, // 2-dimensional array with string and number types. Or null
  message?: string // optional error message if input is not given in valid USD increments
}