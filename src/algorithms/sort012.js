function switchIndexes(index1, index2, arr) {
    arr[index1] += arr[index2];
    arr[index2] = arr[index1] - arr[index2];
    arr[index1] = arr[index2] - arr[index1];
}
function getNextIndexOfFirst(num, indexOfFirst, array) {
    if (array[indexOfFirst + 1] === num) {
        return indexOfFirst + 1
    } else {
        return undefined;
    }
}

function sort012(inputString) {
    const firstIndexes = [];
    for (let i = 0; i < inputString.length; i++) {
        const currentValue = inputString[i];    
        if (currentValue >= inputString[i - 1]) {
            if (currentValue !== 0 && firstIndexes[currentValue] === undefined) {
                firstIndexes[currentValue] = i;
            }
            continue;
        }
        if (!firstIndexes[currentValue]) {
            firstIndexes[currentValue] = i;
        }
        if (inputString[i] === zone) {
            continue;
        }
        if (inputString[i] > zone) {
            zone = inputString[i];
            firstIndexes[i] = firstIndexes[i] || inputString[i];
            continue;
        }
        if (inputString[i] < zone) {
            zone = 
        }
    }
}