import { default as useTill } from './cash-register.mjs';

var cashInTill = [ // Array for keeping track of the till state.
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

function setSlot(slotName: string, slotValue: number): void{
    // search cashInTill global var for the slot name
    // when found, update the value of the slot.
}

function makeChange(): void{ //use as event listener for a button
    // useTill(,, cashInTill);
}

document.getElementById('#calc-change')?.addEventListener('click', makeChange);
// ^ calculate change given when user clicks the "Make Change" button