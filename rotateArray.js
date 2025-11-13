function rotateArray(arr, n){
    return arr.slice(n+1, arr.length).concat(arr.slice(0, n+1));
}

console.log(rotateArray([1,2,3,4,5], 2));