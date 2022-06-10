/**
 * A cash-till function for processing transactions with cash. It calculates how much money
 * (and what type) will be given to the customer if change is due. This program assumes that
 * <cid> param will provide ["$TYPE", 0.0] for any empty slots in the till, and slots will be
 * sorted in ascending order by its unit value. NB: This is NOT a pure function and will mutate the <cid> argument. This is why a buffer copy of the changeInTill was created.
 * @param {number} price : cost of goods to customer
 * @param {number} cash : cash given by customer to pay for goods
 * @param {2-D array} cid : "cash-in-drawer"; specified ammounts for each type of bill/coin
 * @returns {object} tillState : the state of the drawer;
 *      i.e. whether it is open for more business, and the ammount/type of money
 *      given as change. NOTE: The change given will only include units where the total value for the unit
 *      given to the customer is > 0. For example, ["$TYPE", 0.0] will not appear in the return value.
 */

import { MONEY } from './stores/cash-drawer';
import type { MoneyInstance, TillStatus } from './global';

// TODO: change the places where cid is mutated: it needs to be more deliberate with types (like Writable<number>) so it's auto-updating the store
// maybe pass a copy of the CID array, mutate the copy, then update state in store using the copy
//HANDLE EDGE CASE IN WHICH NOT ENOUGH MONEY IS GIVENT BY THE CUSTOMER??
 // ADD $50 BILL SPOT

export default function checkCashRegister(price: number, cash: number, cid: Array<MoneyInstance>): TillStatus {
  price = precise(price); // Ensure money params are w/ in desired precision
  cash = precise(cash); // See hoisted function <precise()> below the <MONEY> constant

  let stillDue_$ = precise(cash - price); // Init. variable: amount of money the customer is still owed
  let changePile: Array<MoneyInstance> = []; // itemized breakdown of change to be given to the customer
  // ========= STANDARD DATA NEEDED ====

  // console.log('hello from main program...')
  // changes to drawerBuffer work
  // console.log(...cid)
  function precise(decimal: number): number {
    return Math.floor(100 * decimal) / 100; // All money values should be given to the nearest hundredth
    // This function helps since Javascript is not as prcise with decimal numbers as other lanaguages like Python.
  }

  //// Till COUNTING SUBROUTINE:
  function tillCount(arr2D: Array<MoneyInstance>) {
    let counter: number = 0;
    for (let i = 0; i < arr2D.length; i++) {
      counter += arr2D[i][1] as number;
    }
    counter = precise(counter);
    return counter;
  }
  let totalTill = tillCount(cid); // represents the total money value in the till


  //==== MAIN BODY OF ALGORITHM ============
  if (totalTill < stillDue_$) { // Not enough money left in the till to make change for this cash amount.
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  } else if (totalTill === stillDue_$) {
    // customer is owed the exact ammount of change in the till
    // give customer all the change and close out the till
    // let drawerTotal = cid.slice();
    cid.forEach((slot: MoneyInstance)=>{
      // add a copy of entire slot to ChangePile; then set original cid[slot value] to zero
      // BE CAREFUL NOT TO SET BOTH TO ZERO
      let slotCopy: MoneyInstance = [...slot]; // copy slot, passing items * by value * NOT by reference
      if(slotCopy[1] > 0){ // only add the copy to the change pile if the slot was not already empty
          changePile.push(slotCopy);
      }
      slot[1] = 0; // values need to be set to 0 so the writable<number> stores for each slot will reflect an empty drawer after the transaction
    });
    console.log('All slots should be empty', 'drawerTotal:', ...cid);
    return { status: 'CLOSED', change: changePile };
  } else { // when totalTill > stillDue_$
    ////////////////////////////////////////////////////////////////////////////////////
    function recurseCount(owed_$: number = precise(stillDue_$), index_$: number): void {
      if (owed_$ === 0 || index_$ < 0) {  // Stop recursion if no more money is owed,
        return; // or there are no more types/units of money that could be given out for the remainder.
      }
      console.log('RECURSE:', MONEY[index_$][0], '$', stillDue_$)

      let slotTotal: number = cid[index_$][1] as number; // alias for total value of the money in the current bill/coin slot
      let unitVal: number = MONEY[index_$][1] as number; // alias for unit value of current bill/coin

      if (slotTotal == 0 || owed_$ < unitVal) {
        // no $ in current slot, or the current denomination/unit size is too big to give out
        recurseCount(owed_$, index_$ - 1); // move on to next-biggest money slot
        return;
      }

      let type_$ = MONEY[index_$][0]; // alias for name of current bill/coin (not needed if current slot is being skipped using subroutine directly above)

      // 1 EXACT UNIT-POP SUBROUTINE:
      // don't remove if empty
      /*if (owed_$ == unitVal && slotTotal >= unitVal) { // the ammount stillowed$ is equal to the unit value of the current bill/coin
        changePile.push([type_$, owed_$]); // add the $ name and value to the change pile to be given to customer
        (cid[index_$][1] as number) -= owed_$; // remove from till
        return;
      } else*/
       if (owed_$ >= unitVal && slotTotal >= unitVal) {// don't remove if empty
        // ITERATIVE UNIT-POP SUBROUTINE:

        let remainder = owed_$ % unitVal; // change still due that cannot be fulfilled from the current slot
        let maxFromSlot = owed_$ - precise(remainder); // max possible value of $ to be given from this slot (example: how much change in $1 bills if 1.00 is the current unitVal)

        let unitCount = 0;
        while ((unitCount < slotTotal / unitVal) && (unitCount < maxFromSlot / unitVal)) {
          unitCount += 1; // Count how many instances of the current bill you can give out
        }

        let giveFromSlot = unitCount * unitVal;

        changePile.push([type_$, giveFromSlot]); // add the change to the pile which will be given to the customer
        (cid[index_$][1] as number) -= giveFromSlot; // remove $ from till
        remainder += maxFromSlot - giveFromSlot; // if there wasn't enough in the slot to give out the maximum possible,
        // then add the difference to the remainder and recurse on the remainder

        stillDue_$ = remainder; // BUG SQUASHED! recursing on the remainder w/o first mutating stillDue_$ inadvertently decoupled the process from 
        // what was actually still owed to the customer, thus the program would never think it had given out enough change.
        // setting stillDue_$ equal to <remainder> fixes that.
        stillDue_$ = precise(stillDue_$); // keep the decimal numbers precise
        console.log('still due:', stillDue_$)
        recurseCount(stillDue_$, index_$ - 1);
        return;
      }
      return;
    }
    recurseCount(stillDue_$, cid.length - 1);
    ///////////////////////////////////////
  }
  if (precise(stillDue_$) > 0) { //old version: (stillDue_$ > 0.0001)
    // At this point, exact change cannot be given:
    // any bills or coins remaining in the till will be bigger than the amount due to the customer.
    console.log('latter insufficient')
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  } else {
    // At this point, the exact amount of change is given to the customer and the till is ready for the next transaction
    return { status: 'OPEN', change: changePile };
  }
}

// checkCashRegister(19.5, 20, [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100],
// ]);
