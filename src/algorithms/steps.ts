/* * * Steps
* for a given positive int n, calculate how many different ways there are 
* to climb an n long staircase.
* You can only climb with steps of 1 or 2 stairs at a time.
*/

/* * * Recursive with hash
* space complexity O(n)
* Time complexity O(n)
*/

function steps(n: number, hash: {[key: number]: number} = {}) {
    // if we overstepped
    if (n < 0) {
        return 0;
    }
    if (n === 0) {
        return 1;
    }
    const hashedVal = hash[n];
    // if the result for n is not found in hash
    if (hashedVal === undefined) {
        const result = steps(n - 1, hash) + steps(n - 2, hash);
        hash[n] = result;
        return result;
    }
    return hashedVal;
}

/* * * Iterative solution
* space complexity O(1)
* Time complexity O(n)
*/

function iterativeSteps(n: number) {
    let result = 0;
    let prevStep = 1;
    let twoStepsBack = 0;
    for(let i = 0; i < n; i++) {
        result = prevStep  + twoStepsBack;
        // step
        twoStepsBack = prevStep;
        prevStep = result;
    }
    return result;
}
