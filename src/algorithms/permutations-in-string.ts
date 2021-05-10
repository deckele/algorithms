function permutations(str: string): string[] {
  const results: string[] = [];
  findPermutationsFromIndex(str, 0, results);
  return results;
}
function findPermutationsFromIndex(str: string, left: number, out: string[]) {
  if (left === str.length) {
    out.push(str);
    return;
  }
  for (let i = left; i < str.length; i++) {
    str = swapChar(str, i, left);
    findPermutationsFromIndex(str, left + 1, out);
    str = swapChar(str, i, left);
  }
}
function swapChar(str: string, index1: number, index2: number): string {
  const strArray = [...str];
  const temp = strArray[index1];
  strArray[index1] = strArray[index2];
  strArray[index2] = temp;
  return strArray.join("");
}

function test() {
  const str = "abc";
  console.log("abc permutations: ", permutations(str));
  console.log("should equal: [ 'abc', 'acb', 'bac', 'bca', 'cba', 'cab' ]");
}
test();
