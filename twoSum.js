// input: [4, 5, 1, 0, 2, 6, 7, 8], sum = 10; Output: 2, 8

function twoSum(arr, n) {
    let pair = []
    for (let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
            if (arr[i]+arr[j]===10){
                pair.push([arr[i],arr[j]]);
            }
        }
    }
    return pair;
}