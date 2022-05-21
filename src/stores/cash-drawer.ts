import { Writable, writable } from 'svelte/store'; // import both the type and the API
import type { writableSlots } from '../global';

export const MONEY: ReadonlyArray<[string, number]> = [
    // Money value data stored in array so the recursive function can process it in order of value.
    // The MONEY array represents the value of one instance of a given bill or coin. 
    // The values are readonly and immutable.
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1.0],
    ['FIVE', 5.0],
    ['TEN', 10.0],
    ['TWENTY', 20.0], // ADD $50 BILL SPOT
    ['ONE HUNDRED', 100.0],
];

// export let drawerSlots: writableSlots = {
//     tillPennies: writable(0.01),
//     tillNickles: writable(0.5),
//     tillDimes: writable(0.1),
//     tillQuarters: writable(0.25),
//     tillOnes: writable(1.0),
//     tillFives: writable(5.0),
//     tillTens: writable(10.0),
//     tillTwenties: writable(20.0),
//     tillHundreds: writable(100.0)
// }

// These Svelte store writables represent stateful slots in the cash drawer. They are readable and writable.
export const tillPennies = writable(0.01);
export const tillNickles = writable(0.5);
export const tillDimes = writable(0.1);
export const tillQuarters = writable(0.25);
export const tillOnes = writable(1.0);
export const tillFives = writable(5.0);
export const tillTens = writable(10.0);
export const tillTwenties = writable(20.0);
export const tillHundreds = writable(100.0);

export const drawerSlots = [tillPennies, tillNickles, tillDimes, tillQuarters, tillOnes, tillFives, tillTens, tillTwenties, tillHundreds];

export const cashInTill: Array<[string, (Writable<number> | number)]> = [ 
    // Array for keeping track of the till state. // : Array<[string,(number | Writable<number>)]> | []
    ['PENNY', tillPennies],
    ['NICKEL', tillNickles],
    ['DIME', tillDimes],
    ['QUARTER', tillQuarters],
    ['ONE', tillOnes],
    ['FIVE', tillFives],
    ['TEN', tillTens],
    ['TWENTY', tillTwenties], // ADD $50 BILL SPOT
    ['ONE HUNDRED', tillHundreds],
];

// Array representing change given to customer after a sale:
export let changePile: Array<[string, (Writable<number> | number)]> | []; 

//  to-do: factory function that generates a random till state and writes to localStorage with values:
// localStorage.setItem('cashInTill', JSON.stringify(cashInTill));