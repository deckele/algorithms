/* * * *
* function which Adds numbers without using any arithmatic operators
*
*/

// Precalculated table for every two digit combination.
// Time complexity is O(n), where n is the length of the longer number of the two input numbers. 
// Space complexity is O(1);
function magicAdd(num1: number = 0, num2: number = 0): number {
    const DECIMAL = ".";
    const ZERO = "0";
    const EMPTY_STRING = "";
    const additionTable = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    ];
    let decimalSplit1 = num1.toString().split(DECIMAL);
    let decimalSplit2 = num2.toString().split(DECIMAL);
    decimalSplit1[1] = decimalSplit1[1] ?? EMPTY_STRING;
    decimalSplit2[1] = decimalSplit2[1] ?? EMPTY_STRING;
    const startDigits = Math.max(decimalSplit1[0].length, decimalSplit2[0].length);
    const endDigits = Math.max(decimalSplit1[1].length, decimalSplit2[1].length);
    decimalSplit1[0] = decimalSplit1[0].padStart(startDigits, ZERO);
    decimalSplit2[0] = decimalSplit2[0].padStart(startDigits, ZERO);
    decimalSplit1[1] = decimalSplit1[1].padEnd(endDigits, ZERO);
    decimalSplit2[1] = decimalSplit2[1].padEnd(endDigits, ZERO);
    const strArr1 = decimalSplit1.join(DECIMAL).split(EMPTY_STRING).reverse();
    const strArr2 = decimalSplit2.join(DECIMAL).split(EMPTY_STRING).reverse();
    let sumArr = [];
    let carryOver = false;
    for (let i = 0; i <= Math.max(strArr1.length, strArr2.length); i++) {
        const current1 = strArr1[i] || ZERO;
        if (current1 === DECIMAL) {
            sumArr.push(current1);
            continue;
        }
        const current2 = strArr2[i] || ZERO;
        let currentSum: number = additionTable[current1][current2];
        if (carryOver) {
            currentSum++;
        }
        const currentSumStr = currentSum.toString();
        sumArr.push(currentSumStr.charAt(currentSumStr.length - 1));
        carryOver = currentSumStr.length === 2;
    }
    return parseFloat(sumArr.reverse().join(EMPTY_STRING));
}