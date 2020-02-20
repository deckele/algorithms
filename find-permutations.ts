/* * * * *
* Find permutations of s within b:
* s = abbc
* b = babcabbacaabcbabcacbb
*/

// Time complexity O(b*s). Space complexity O(s). 
declare var process: any;
function findPermutations(keyStr: string = process.argv[2], targetStr: string = process.argv[3]): string[] {
    if (targetStr.length < keyStr.length) {
        return [];
    }
    const permutations: string[] = [];
    const hashCounter = {};
    // setup hash
    for (const char of keyStr) {
        if (!hashCounter[char]) {
            hashCounter[char] = 0;
        }
        hashCounter[char]++;
    }
    // iterate through target string.
    outer: for (let i = 0; i < targetStr.length - keyStr.length + 1; i++) {
        let permutation = "";
        const hashCopy = { ...hashCounter };
        for (let j = 0; j < keyStr.length; j++) {
            const currentChar = targetStr[i + j];
            if (!currentChar 
                || !hashCopy[currentChar] 
                || hashCopy[currentChar].length === 0 ) {
                    continue outer;
            }
            permutation += currentChar;
            hashCopy[currentChar]--;
        }
        permutations.push(permutation);
    }
    return permutations;
}
console.log(findPermutations());