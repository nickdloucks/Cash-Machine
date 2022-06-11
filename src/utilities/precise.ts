export default function precise(decimal: number, decimalPlaces: number = 2): number {
    let factor = 10 ** decimalPlaces; // optionally override the factor by which to round your input

    return Math.round(factor * decimal) / factor; // All money values should be given to the nearest hundredth
    // This function helps since Javascript is not as prcise with floating point numbers as other lanaguages like Python.
    // Multiply input by 100 (default), get rid of any remaining value right of the decimal point, then divide by 100 to get the input back to the 100ths precision/ format
    // similar effect to .toFixed(2) but returns a number rather than a string
}