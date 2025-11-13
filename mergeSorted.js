function mergeSort(arr, arr2){
    return arr.concat(arr2).sort();
}

const mergeSort2 = (arr, arr2) => arr.concat(arr2).sort()

console.log(mergeSort([1,3],[2,4]));
console.log(mergeSort2([1,3],[2,4]));