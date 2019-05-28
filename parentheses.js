/* * * *
* Write a function which receives an integer, and outputs an array containing all possible valid parentheses permutations as strings.
* Examples:
* For the input of 2: ["()()", "(())"]. 
* For the input of 3: [ '((()))', '(()())', '(())()', '()(())', '()()()' ].
*/
const OPEN = "(";
const CLOSE = ")";
function calcParentheses(pairs, {opened, closed, str} = {opened: 0, closed: 0, str: ""}) {
    if (opened + closed === pairs * 2) {
        return str ? [str] : [];
    }
    let openedBranch = [];
    let closedBranch = [];
    if (opened < pairs) {
        openedBranch = calcParentheses(pairs, {opened: opened + 1, closed, str: str + OPEN});
    }
    if (closed < pairs && opened - closed > 0) {
        closedBranch = calcParentheses(pairs, {closed: closed + 1, opened, str: str + CLOSE});
    }
    return [ ...openedBranch, ...closedBranch ];
}

console.log(calcParentheses(process.argv[2]));
