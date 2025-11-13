// Remove Falsy values from array (false,0,'',null,undefined).
// input: [0,1,false,2,'',3], output: [1,2,3]

function removeFalse(arr){
    return arr.filter(Boolean);
}

console.log(removeFalse([0,1,false,2,'',3, undefined, null]));