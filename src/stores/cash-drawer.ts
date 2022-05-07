import { writable } from 'svelte/store';

export const MONEY = [
    // money value data stored in array so the recursive function can process it in order of value
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1.0],
    ['FIVE', 5.0],
    ['TEN', 10.0],
    ['TWENTY', 20.0],
    ['ONE HUNDRED', 100.0],
]; // The MONEY array represents the value of one instance of a given bill or coin

export const cashInTill = [ // Array for keeping track of the till state.
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1.0],
    ['FIVE', 5.0],
    ['TEN', 10.0],
    ['TWENTY', 20.0],
    ['ONE HUNDRED', 100.0],
];

//  todo: factory function that generates a random till state and writes to localStorage with values