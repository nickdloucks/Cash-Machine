/// <reference types="svelte" />
import {Writable} from 'svelte/store';

declare interface TillStatus {
  status: string, // till status: open, closed, or error
  change: Array<[string, (number | Writable<number>)]> | [], // 2-dimensional array with string and number types. Or an empty array
  message?: string // optional error message if input is not given in valid USD increments
}

declare interface writableSlots {
  [keys: string]: Writable<number>
}

// enum MoneyTypes{
//   1 = 'PENNY',
//   2 = 'NICKLE',
//   3 = 'DIME',
//   4 = 'QUARTER',
//   5 = 'ONE',
//   6 = 'FIVE',
//   7 = 'TEN',
//   8 = 'TWENTY',
//   9 = 'ONE HUNDRED'
// }
// interface typeAndVal {
//   [string, number]
// }
// interface Money {
//   list: [string, number];
// }