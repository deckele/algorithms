/* * * *
 * Write a function which receives an integer, and outputs an array containing all possible valid parentheses permutations as strings.
 * Examples:
 * For the input of 2: ["()()", "(())"].
 * For the input of 3: [ '((()))', '(()())', '(())()', '()(())', '()()()' ].
 */
function calcParentheses(
  pairs,
  { opened, closed, str } = { opened: 0, closed: 0, str: "" }
) {
  const OPEN = "(";
  const CLOSE = ")";
  if (opened + closed === pairs * 2) {
    return str ? [str] : [];
  }
  let openedBranch = [];
  let closedBranch = [];
  if (opened < pairs) {
    openedBranch = calcParentheses(pairs, {
      opened: opened + 1,
      closed,
      str: str + OPEN,
    });
  }
  if (closed < pairs && opened - closed > 0) {
    closedBranch = calcParentheses(pairs, {
      closed: closed + 1,
      opened,
      str: str + CLOSE,
    });
  }
  return [...openedBranch, ...closedBranch];
}

// Method 2:
/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const result = [];
  if (n === 0) result.push("");
  else
    for (let i = 0; i < n; i++)
      for (const left of generateParenthesis(i))
        for (const right of generateParenthesis(n - 1 - i))
          result.push(`(${left})${right}`);
  return result;
}

console.log(calcParentheses(process.argv[2]));
